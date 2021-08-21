
from aenum import Enum, MultiValue
from classifier_description import ClassifierSpecInt, ClassifierDescription
import numpy as np
from classifier_dataset import GeneralDataset
from transformers import BertConfig, BertTokenizer, BertTokenizerFast



class GenericEnum(Enum):
    #_init_ = 'value fullname'
    #_settings_ = MultiValue

    def __int__(self):
        return self.value[0]

    def __str__(self):
        return self.value[1]

    def to_label_text(self, row, label, index):
        label[row, index] = int(self)
        return [str(self)]


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


class BinaryList:
    def __init__(self, values):
        self.values = values

    @classmethod
    def random_samples(cls, number):
        indices = np.random.randint(0, 2, size=(number, len(cls.items())), dtype=np.int64)
        options = [cls(indices[x, :].flatten()) for x in range(number)]
        return options

    def to_label_text(self, row, label, index):
        label[row, index] = int(self)
        return [str(self)]


# Binary Classifier Based on a set of Tags
class ClassifierMultiStruct(ClassifierSpecInt):
    def __init__(self, size):
        super().__init__(binary=False)
        self.size = size

    def num_labels(self):
        return self.size


class ClassifierBinaryStruct(ClassifierSpecInt):
    def __init__(self, size):
        super().__init__(binary=True)
        self.size = size

    def num_labels(self):
        return self.size


class GeneralClassifierStruct(ClassifierDescription):
    def __init__(self, multi, binary):
        self.multi = multi
        self.binary = binary

        self.specs = list()
        for m in multi:
            self.specs.append(ClassifierMultiStruct(m))
        if binary > 0:
            self.specs.append(ClassifierBinaryStruct(self.binary))


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





def create_eval_data(data, tokenizer):
    tokenized_data = tokenizer.batch_encode_plus(data, truncation=True, padding='max_length', max_length=40)
    input_data = GeneralDataset(tokenized_data, None, data)
    return input_data

def create_random_data(cls, sim_length, label_length, tokenizer):
    data = cls.random_samples(sim_length)
    labels = np.zeros((sim_length, label_length), dtype=np.int64)
    sdata = [x.to_label_text(i, labels, 0) for i, x in enumerate(data)]
    tokenized_data = tokenizer.batch_encode_plus(sdata, truncation=True, padding='max_length', max_length=40)
    input_data = GeneralDataset(tokenized_data, labels, sdata)
    return input_data
