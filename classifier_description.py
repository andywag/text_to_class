

# Interface for Generic Classifier
class ClassifierSpecInt:
    def __init__(self, binary=False, one_based=True, name=None):
        # Mapping from tab to label and reverse mapping
        self.tag_mapping = dict()
        self.inv_tag_mapping = dict()
        # Binary Classifier Mode
        self.binary = binary
        self.one_based = one_based
        self.name = name

    def display(self):
        if hasattr(self, 'name') and self.name is not None:
            return self.name
        return "Not Defined"

    def num_labels(self):
        length = len(self.tag_mapping)
        if self.one_based:
            length += 1
        return length

    # Conversion from input data to label
    def create_label(self, data):
        pass

    def output_result(self, result, prob):
        return True

class ClassifierArray(ClassifierSpecInt):
    def __init__(self, classifier, number):
        self.classifier = classifier
        self.number = number

    def create_label(self, data):
        pass


# Generic Classifier Derived from DataSet
class ClassifierSpecTagsDerived(ClassifierSpecInt):
    def __init__(self, one_based=True):
        super().__init__(binary=False, one_based=one_based)
        if self.one_based:
            self.tag_mapping['None'] = 0
            self.inv_tag_mapping[0] = None

    def create_label(self, data):
        if data is not None:
            if data in self.tag_mapping:
                return [self.tag_mapping[data]]
            else:
                location = len(self.tag_mapping.keys())
                self.tag_mapping[data] = location
                self.inv_tag_mapping[location] = data
                return [location]


# Binary Classifier Based on a set of Tags
class ClassifierSpecTags(ClassifierSpecInt):
    def __init__(self, tags, one_based=False, name=None):
        super().__init__(binary=False, one_based=one_based,name=name)
        for x, tag in enumerate(tags):
            self.inv_tag_mapping[x] = tag
            self.tag_mapping[tag] = x

    def create_label(self, data):
        if data is not None and data in self.tag_mapping:
            return [self.tag_mapping[data]]


# Classifier Binary List
# Group of binary classifiers
class ClassifierBinaryList(ClassifierSpecInt):
    def __init__(self, names):
        super().__init__(binary=True)
        self.names = names
        for i, name in enumerate(self.names):
            self.tag_mapping[name] = i
            self.inv_tag_mapping[i] = name

    def num_labels(self):
        return len(self.names)

    def create_label(self, data):
        label = [0]*len(self.names)
        for d in data:
            if d in self.tag_mapping:
                label[self.tag_mapping[d]] = 1
        return label


# Binary Classifier Based on a set of Tags
class ClassifierBinary(ClassifierSpecInt):
    def __init__(self, name):
        super().__init__(binary=True)
        self.name = name

    def create_label(self, data):
        if data is None:
            return [-1]
        elif data:
            return [1]
        else:
            return [0]


class ClassifierDescription:
    def __init__(self, specs):
        self.specs = specs
        self.text_field_titles = ["Text"]

    def get_text(self, eval_data, row, col):
        return eval_data.text[row]





