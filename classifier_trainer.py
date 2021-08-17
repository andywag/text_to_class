
from model import BertForMultiSequenceClassification
from transformers import Trainer, TrainingArguments
from transformers import BertConfig, BertTokenizer
import numpy as np
from scipy.special import softmax

class ClassifierTrainer:
    def __init__(self, classifier_description, ckpt=None, training_args=None, tr_batch_size = 160):
        self.classifier_description = classifier_description
        if ckpt is None:
            ckpt = "bert-base-uncased"
        self.model = BertForMultiSequenceClassification.from_pretrained(ckpt,
                                                           labels=classifier_description)

        self.tokenizer = BertTokenizer.from_pretrained("bert-base-uncased")

        if training_args is None:
            self.training_args = TrainingArguments("test_trainer")
            self.training_args.per_device_train_batch_size = 192-32
            self.training_args.per_device_eval_batch_size = 256

            self.training_args.logging_steps = 20
            self.training_args.num_train_epochs = 1
            self.training_args.do_eval = True
            self.training_args.do_predict = True
            self.training_args.save_steps = 50

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