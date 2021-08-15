from classifier_description import ClassifierSpecTags, ClassifierBinary, ClassifierDescription, ClassifierBinaryList
import random
from transformers import BertConfig, BertTokenizer, BertTokenizerFast
from classifier_dataset import GeneralDataset
import time

class Classifier:
    def __init__(self, name):
        self.name = name

class Simple:
    def __init__(self, name):
        self.name = name


class Choice:
    def __init__(self, name, items):
        self.name = name
        self.items = items
        self.classifier = self.create_classifier()

    @staticmethod
    def simple(name, items):
        return Choice(name, [x for x in items])

    def create_classifier(self):
        return ClassifierSpecTags([x for x in self.items], name=self.name)

    def create_random_input(self):
        ind = random.randint(0, len(self.items)-1)
        return [ind], [self.classifier.inv_tag_mapping[ind]]


class BinaryList:
    def __init__(self, items):
        self.items = items
        self.classifier = self.create_classifier()

    @staticmethod
    def simple(items):
        return BinaryList([x for x in items])

    def create_classifier(self):
        return ClassifierBinaryList(self.items)

    def create_random_input(self):
        text = []
        labels = [0]*(len(self.items))
        for x in range(len(self.items)):
            enabled = random.randint(0, 1)
            if enabled == 1:
                text.append(self.items[x])
                labels[x] = 1
        return labels, text


class Main:
    def __init__(self, class_items):
        self.class_items = class_items
        self.classifier_description = self.create_spec()

    def create_spec(self):
        return ClassifierDescription([x.create_classifier() for x in self.class_items])

    @staticmethod
    def tokenize(text, tokenizer, max_length):
        tokenized_data = tokenizer.batch_encode_plus(text, truncation=True, padding='max_length', max_length=max_length)
        return tokenized_data

    def create_eval_file(self, queries, max_length=32):
        tokenizer = BertTokenizerFast.from_pretrained("bert-base-uncased")
        tokenized_data = tokenizer.batch_encode_plus(queries, truncation=True, padding='max_length', max_length=max_length)
        return GeneralDataset(tokenized_data, None, queries)


    def create_random_input_file(self, data_length, max_length = 32):
        input_labels = []
        input_text = []
        for x in range(data_length):
            tic = time.time()
            if x % 100 == 0:
                print("Created", x)
            specs = self.class_items
            text = []
            labels = []
            for spec in specs:
                s_label, s_text = spec.create_random_input()
                text += s_text
                labels += s_label
            random.shuffle(text)
            input_text.append(", ".join(text))
            input_labels.append(labels)

        tokenizer = BertTokenizerFast.from_pretrained("bert-base-uncased")

        input_tokens = self.tokenize(input_text, tokenizer, max_length)


        return GeneralDataset(input_tokens, input_labels, input_text)


class Group:
    def __init__(self, classifiers):
        self.classifiers = classifiers


    def create_classifier(self):
        return ClassifierSpecTags([x for x in self.items], name=self.name)