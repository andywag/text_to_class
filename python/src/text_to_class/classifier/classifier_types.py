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


class ClassifierMultiStruct(ClassifierSpecInt):
    """ Multi  Classifier Based on a set of Tags"""
    def __init__(self, size):
        super().__init__(binary=False)
        self.size = size

    def num_labels(self):
        return self.size


class ClassifierBinaryStruct(ClassifierSpecInt):
    """ Binary Classifier Based on a set of Tags"""
    def __init__(self, size):
        super().__init__(binary=True)
        self.size = size

    def num_labels(self):
        return self.size
