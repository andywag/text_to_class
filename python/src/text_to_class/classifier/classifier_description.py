
from typing import List
from text_to_class.classifier.classifier_types import ClassifierMultiStruct, ClassifierBinaryStruct


class ClassifierDescription:
    """ Specification for the classifier
        :param specs : List of classifier widths
        :param per_token_spec : Adds a per token classifier
    """
    def __init__(self, specs, per_token_spec: bool = False, max_length: int = 40):
        self.specs = specs
        self.per_token_spec = per_token_spec
        self.max_length = max_length

        self.text_field_titles = ["Text"]

    def get_text(self, eval_data, row, col):
        return eval_data.text[row]

    def dimension_multi_binary(self):
        return len(self.specs)

    def total_dims(self):
        return len(self.specs) + self.max_length

class GeneralClassifierStruct(ClassifierDescription):
    """ Classifier structure for Trainer/Inference Block
        :param multi : List of classes per classifier
        :param binary : Number of binary classifiers
        :param per_token_spec : Extra per token classifier
    """
    def __init__(self, multi: List[int], binary: int, per_token_spec: bool = False, max_length=40):
        self.multi = multi
        self.binary = binary
        self.per_token_spec = per_token_spec
        self.max_length = max_length

        self.specs = list()
        for m in multi:
            self.specs.append(ClassifierMultiStruct(m))
        if binary > 0:
            self.specs.append(ClassifierBinaryStruct(self.binary))

    def dimension_multi_binary(self):
        return len(self.multi) + self.binary

    def total_dims(self):
        return len(self.multi) + self.binary + self.max_length

