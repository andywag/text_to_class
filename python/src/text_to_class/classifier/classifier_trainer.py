
from transformers import Trainer, TrainingArguments
from transformers import BertTokenizer, AlbertTokenizer
import numpy as np
from scipy.special import softmax
from transformers.trainer_utils import PredictionOutput

from text_to_class.classifier.model import BertForMultiSequenceClassification, AlbertForMultiSequenceClassification
from text_to_class.classifier.model_test import BertCompress

from text_to_class.classifier.classifier_description import GeneralClassifierStruct

from typing import List, Tuple
from text_to_class.common_structures import PredictionResult, PredictionItem

ALBERT = "albert"
BERT = "bert"
BERT4 = "bert4"
DIS = "dis"



class ClassifierTrainer:
    def __init__(self, classifier_description: GeneralClassifierStruct, ckpt=None, training_args=None, tr_batch_size=160,
                 model=BERT, batch_size=168, steps_per_save = 500, compress: bool = False):
        self.classifier_description = classifier_description

        if model == BERT or model == BERT4:
            if model == BERT4:
                ck = "google/bert_uncased_L-4_H-512_A-8"
            else:
                ck = "bert-base-uncased"

            if ckpt is None:
                ckpt = ck

            if not compress:
                self.model = BertForMultiSequenceClassification.from_pretrained(ckpt,
                                                           labels=classifier_description)
            else:
                self.model = BertCompress.from_pretrained(ckpt,
                                                          labels=classifier_description)

            self.tokenizer = BertTokenizer.from_pretrained(ck)
        elif model == ALBERT:
            if ckpt is None:
                ckpt = "albert-base-v2"
            self.model = AlbertForMultiSequenceClassification.from_pretrained(ckpt,
                                                           labels=classifier_description)
            self.tokenizer = AlbertTokenizer.from_pretrained("albert-base-v2")

        if training_args is None:
            self.training_args = TrainingArguments(model)
            self.training_args.per_device_train_batch_size = batch_size
            self.training_args.per_device_eval_batch_size = 256

            self.training_args.logging_steps = 20
            self.training_args.num_train_epochs = 1
            self.training_args.do_eval = True
            self.training_args.do_predict = True
            self.training_args.save_steps = steps_per_save

            #self.training_args.num_train_epochs = 5
            #self.training_args.learning_rate = 1e-6

    def train(self, input_data, eval_data=None):
        trainer = Trainer(model=self.model, args=self.training_args, train_dataset=input_data)
        trainer.train()

    def infer(self, input_data):
        self.training_args.do_train = False
        trainer = Trainer(model=self.model, args=self.training_args, eval_dataset=input_data)
        result = trainer.predict(input_data, input_data)
        return result

    def get_probabilities(self, p: PredictionOutput) -> Tuple[np.ndarray, np.ndarray]:
        """Convert the output of model to a set of probabilities."""
        total_probabilities = []
        total_indices = []

        def sigmoid(x):
            return 1 / (1 + np.exp(-x))

        for x in range(len(self.classifier_description.specs)):
            spec = self.classifier_description.specs[x]
            predictions = p.predictions[x]
            if not spec.binary:
                total_probabilities.append(softmax(predictions, axis=-1))
                total_indices.append(np.argmax(predictions, axis=-1))
            else:
                probabilities = sigmoid(predictions)
                total_probabilities.append(probabilities)
                total_indices.append(0)

        if self.classifier_description.per_token_spec:
            for x in range(self.classifier_description.max_length):
                predictions = p.predictions[x + len(self.classifier_description.specs)]
                total_probabilities.append(softmax(predictions, axis=-1))
                total_indices.append(np.argmax(predictions, axis=-1))

        return total_probabilities, total_indices

    def get_predictions(self, p: PredictionOutput, input_data) -> List[PredictionResult]:
        """Convert the output of model to a set of probabilities.
           :return: List of tuple containing (probabilities, indices)
        """
        results = []

        def sigmoid(x):
            return 1 / (1 + np.exp(-x))

        for x in range(len(self.classifier_description.specs)):
            spec = self.classifier_description.specs[x]
            predictions = p.predictions[x]
            if not spec.binary:
                results.append((softmax(predictions, axis=-1), np.argmax(predictions, axis=-1)))
            else:
                probabilities = sigmoid(predictions)
                indices = np.zeros(probabilities.shape, dtype=np.uint32)
                found = probabilities >= .5
                indices[found] = 1
                for y in range(predictions.shape[1]):
                    results.append( (probabilities[:, y].reshape((len(probabilities), 1)), indices[:, y]) )

        if self.classifier_description.per_token_spec:
            for x in range(self.classifier_description.max_length):
                predictions = p.predictions[x + len(self.classifier_description.specs)]
                results.append((softmax(predictions, axis=-1), np.argmax(predictions, axis=-1)))

        new_results = []
        for x in range(len(p.label_ids)):
            indices = []
            probabilities = []
            for result in results:
                probabilities.append(result[0][x, :])
                if result[0].shape[1] > 1:
                    indices.append(PredictionItem(result[1][x], result[0][x, result[1][x]]))
                else:
                    indices.append(PredictionItem(result[1][x], result[0][x]))

            prediction_result = PredictionResult(probabilities, indices, input_data.text[x])
            new_results.append(prediction_result)

        return new_results

    @staticmethod
    def accuracy(predictions: List[PredictionResult], labels: np.ndarray) -> Tuple[float, List[float]]:
        total_elements = 0
        correct_elements = 0
        total_per_column = [0]*labels.shape[1]
        correct_per_column = [0]*labels.shape[1]

        for x in range(labels.shape[0]):
            for y in range(labels.shape[1]):
                if labels[x, y] != -100:
                    total_elements += 1
                    total_per_column[y] += 1
                    if labels[x, y] == predictions[x].indices[y].index:
                        correct_elements += 1
                        correct_per_column[y] += 1

        def accuracy_divide(x, y):
            if y == 0:
                return 1.0
            else:
                return x/y

        accuracy_per_column = [accuracy_divide(x, y) for x, y in zip(correct_per_column, total_per_column)]
        return correct_elements/total_elements, accuracy_per_column

    def display_results(self, eval_data, total_probs, total_indices, result_file):
        if result_file is not None:
            log = open(result_file, 'w', encoding='utf-8')

        for x in range(len(eval_data.text)):
            line = f'"{x} {eval_data.text[x]}\n"'
            for y in range(len(self.classifier_description.specs)):
                spec = self.classifier_description.specs[y]
                if not spec.binary:
                    ind = total_indices[y][x]
                    if total_probs[y][x, ind] > .8:
                        print_ind = ind
                        if ind in spec.inv_tag_mapping:
                            print_ind = spec.inv_tag_mapping[ind]
                        if total_probs[y][x, ind] > .8:
                            if not spec.one_based or ind != 0:
                                prob = "{:.2f}".format(total_probs[y][x, ind])
                                line += f"{print_ind}({prob}),"
                else:
                    for z in range((total_probs[y].shape[1])):
                        if total_probs[y][x, z] > .5:
                            print_ind = z
                            if z in spec.inv_tag_mapping:
                                print_ind = spec.inv_tag_mapping[z]
                            prob = "{:.2f}".format(total_probs[y][x, z])
                            line += f"{print_ind}({prob}),"
            print(line)
            if result_file is not None:
                log.write(line + "\n")

        if result_file is not None:
            log.close()