
from aenum import Enum
import numpy as np

from text_to_class.classifier.classifier_description import ClassifierDescription
from text_to_class.classifier.classifier_types import ClassifierMultiStruct, ClassifierBinaryStruct
from text_to_class.classifier.classifier_dataset import GeneralDataset
from typing import List

class GenericEnum(Enum):

    def __int__(self):
        return self.value[0]

    def __str__(self):
        return self.value[1]

    def to_label_text(self, row, label, index):
        label[row, index] = int(self)
        return [str(self)]

    @staticmethod
    def label():
        return ""

    @classmethod
    def random_samples(cls, number):
        data = list(cls)
        indices = np.random.randint(0, len(cls), number)
        return [data[x] for x in indices]

    @classmethod
    def from_probs(cls, probs, index, row):
        data = list(cls)
        location = probs[1][index][row]
        if probs[0][index][row, location] > .8:
            return FuzzyResult(data[location], probs[0][index][row, location])
        else:
            indices = np.argsort(-probs[0][index][row,:len(data)])[:3]
            use_data = [data[x] for x in indices]
            prob = [probs[0][index][row,x] for x in indices]
            return FuzzyResult(use_data, prob)


class GeneralClassifierStruct(ClassifierDescription):
    """ Classifier structure for Trainer/Inference Block
        :param multi : List of classes per classifier
        :param binary : Number of binary classifiers
        :param per_token_spec : Extra per token classifier
    """
    def __init__(self, multi: List[int], binary: int, per_token_spec: bool = False):
        self.multi = multi
        self.binary = binary
        self.per_token_spec = per_token_spec

        self.specs = list()
        for m in multi:
            self.specs.append(ClassifierMultiStruct(m))
        if binary > 0:
            self.specs.append(ClassifierBinaryStruct(self.binary))

    def total_dims(self):
        return len(self.multi) + self.binary


class FuzzyResult:
    def __init__(self, result, probability):
        self.result = result
        self.probability = probability

    def __repr__(self):
        r = self.result
        p = self.probability
        if isinstance(self.result, list):
            r = self.result[0]; p = self.probability[0]
        return f"{r}({'{:.2f}'.format(p)})"

    def __str__(self):
        if isinstance(self.result, list):
            return ""#str(self.result[0])
        else:
            if self.probability > .8:
                return str(self.result)
            else:
                return ""



def create_eval_data(data, tokenizer):
    tokenized_data = tokenizer.batch_encode_plus(data, truncation=True, padding='max_length', max_length=40)
    input_data = GeneralDataset(tokenized_data, None, data)
    return input_data


def create_random_data(cls, sim_length, label_length, tokenizer, bin_label_length=0):
    data = cls.random_samples(sim_length)
    labels = -100*np.ones((sim_length, label_length), dtype=np.int64)
    labels[:,label_length-bin_label_length:] = np.zeros((sim_length, bin_label_length), dtype=np.int64)
    sdata = [x.to_label_text(i, labels, 0) for i, x in enumerate(data)]
    tokenized_data = tokenizer.batch_encode_plus(sdata, truncation=True, padding='max_length', max_length=40)
    input_data = GeneralDataset(tokenized_data, labels, sdata)
    return input_data
