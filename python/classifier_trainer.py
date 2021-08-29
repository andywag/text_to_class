
from model import BertForMultiSequenceClassification, AlbertForMultiSequenceClassification, DistilBertForMultiSequenceClassification
from transformers import Trainer, TrainingArguments
from transformers import BertTokenizer, AlbertTokenizer, DistilBertTokenizerFast
import numpy as np
from scipy.special import softmax

ALBERT = "albert"
BERT = "bert"
BERT4 = "bert4"
DIS = "dis"

class ClassifierTrainer:
    def __init__(self, classifier_description, ckpt=None, training_args=None, tr_batch_size=160,
                 model=BERT, batch_size=168, steps_per_save = 500):
        self.classifier_description = classifier_description

        if model == BERT or model == BERT4:
            if model == BERT4:
                ck = "google/bert_uncased_L-4_H-512_A-8"
            else:
                ck = "bert-base-uncased"

            if ckpt is None:
                ckpt = ck

            self.model = BertForMultiSequenceClassification.from_pretrained(ckpt,
                                                           labels=classifier_description)
            self.tokenizer = BertTokenizer.from_pretrained(ck)
        elif model == ALBERT:
            if ckpt is None:
                ckpt = "albert-base-v2"
            self.model = AlbertForMultiSequenceClassification.from_pretrained(ckpt,
                                                           labels=classifier_description)
            self.tokenizer = AlbertTokenizer.from_pretrained("albert-base-v2")
        else:
            if ckpt is None:
                ckpt = "distilbert-base-uncased"
            self.model = DistilBertForMultiSequenceClassification.from_pretrained(ckpt,
                                                           labels=classifier_description)
            self.tokenizer = DistilBertTokenizerFast.from_pretrained("albert-base-v2")

        if training_args is None:
            self.training_args = TrainingArguments(model)
            self.training_args.per_device_train_batch_size = batch_size
            self.training_args.per_device_eval_batch_size = 256

            self.training_args.logging_steps = 20
            self.training_args.num_train_epochs = 1
            self.training_args.do_eval = True
            self.training_args.do_predict = True
            self.training_args.save_steps = steps_per_save

    def train(self, input_data, eval_data):
        trainer = Trainer(model=self.model, args=self.training_args,
                          train_dataset=input_data, eval_dataset=eval_data)
        trainer.train()

    def infer(self, input_data, eval_data):
        self.training_args.do_train = False
        trainer = Trainer(model=self.model, args=self.training_args,
                          train_dataset=input_data, eval_dataset=eval_data)
        result = trainer.predict(eval_data)
        return result

    def get_probs(self, p):
        total_probs = []
        total_indices = []

        def sigmoid(x):
            return 1 / (1 + np.exp(-x))

        for x in range(len(self.classifier_description.specs)):
            spec = self.classifier_description.specs[x]
            predictions = p.predictions[x]
            if not spec.binary:
                total_probs.append(softmax(predictions, axis=-1))
                total_indices.append(np.argmax(predictions, axis=-1))
            else:
                probs = sigmoid(predictions)
                total_probs.append(probs)
                total_indices.append(0)

        return total_probs, total_indices


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