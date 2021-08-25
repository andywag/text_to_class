from general_struct import GenericEnum
import random
import numpy as np
from general_struct import FuzzyResult

class BaseObject:

    def missing_values(self):
        return []

    def update_value(self, value_index, index):
        pass


class SingleChoice(BaseObject):
    def __init__(self, item: GenericEnum):
        self.item = item

    def __repr__(self):
        return str(self.item)

    def to_label_text(self, row, label, index):
        label[row, index] = type(self).location
        label[row, index+1] = int(self.item)
        for x in range(index+2, type(self).max_classes):
            label[row, x] = -100
        return str(self.item)

    @classmethod
    def from_probs(cls, probs, index, row):
        return cls(cls.generator.from_probs(probs, index+1, row))

    @classmethod
    def random_samples(cls, number: int):
        side_type = cls.generator.random_samples(number)
        return [cls(x) for x in side_type]


class MultiChoice(BaseObject):
    def __init__(self, item):
        self.item = item

    @classmethod
    def from_probs_array(cls, probs, index):
        return [cls.from_probs(probs, index, x) for x in range(len(probs[0][index]))]

    @classmethod
    def from_probs(cls, probs, index, row):
        classes = cls.classes
        class_index = probs[1][index][row]
        results = classes[class_index].from_probs(probs, index, row)
        return results

    def to_label_text(self, row, label, index):
        return self.item.to_label_text(row, label, index)

    @classmethod
    def random_samples(cls, number: int):
        data = []
        for i, x in enumerate(cls.classes):
            number_samples = int(number/len(cls.classes))
            if hasattr(cls, "generate_ratio"):
                number_samples = int(cls.generate_ratio[i]*number)
            data += x.random_samples(number_samples)
        random.shuffle(data)
        return data


class BinaryList(BaseObject):
    def __init__(self, values):
        self.values = values

    def to_label_text(self, row, label, index):
        text = []
        for i, o in enumerate(self.values):
            if o == 1:
                label[row, index + i] = 1
                text += [type(self).items[i]]
        return text


    @classmethod
    def random_samples(cls, number):
        indices = np.random.randint(0, 2, size=(number, len(cls.items)), dtype=np.int64)
        options = [cls(indices[x, :].flatten()) for x in range(number)]
        return options


    @classmethod
    def from_probs(cls, probs, index, row):
        bins = probs[0][index][row]
        return cls(bins)

    def __repr__(self):
        cls = type(self)

        result = [f"{x[0], x[1]}" if x[1] > .8 else None for x in zip(cls.items, self.values)]
        result = filter(lambda x: x is not None, result)

        return ", ".join(result)

    def __str__(self):
        cls = type(self)
        result = [str(x[0]) if x[1] > .8 else None for x in zip(cls.items, self.values)]
        result = filter(lambda x: x is not None, result)
        return ", ".join(result)

class MissingItem:
    def __init__(self, index, typ, parent):
        self.index = index
        self.typ = typ
        self.parent = parent

    def title(self):
        return f"What {str(self.typ)} would you like?"

    def options(self):
        return list(self.typ)

    def update(self, update_value):
        self.parent.update_value(self.index, int(update_value))


class Combination(BaseObject):
    def __init__(self):
        pass

    def __repr__(self):
        cls = type(self)
        text = ""
        for i, x in enumerate(self.values):
            text += str(x) + ","
        return text

    def update_value(self, value_index, index):
        classes = list(type(self).classes[value_index])
        item = classes[index]
        #self.values[value_index] = FuzzyResult(item, 1.0)
        self.values[value_index].result = item
        self.values[value_index].probability = 1.0

        #cls = type(self)
        #result = cls(*self.values)
        #print("Update Value", self.values, result)
        #return result

    def missing_values(self):
        missing = []
        for i, v in enumerate(self.values):
            if isinstance(v, FuzzyResult):
                if isinstance(v.probability, list) or v.probability < .9:
                    missing_item = MissingItem(i, type(self).classes[i], self)
                    missing.append(missing_item)
        return missing

    @classmethod
    def from_probs(cls, probs, index, row):
        items = [x.from_probs(probs, index + i + 1, row) for i, x in enumerate(cls.classes)]
        return cls(*items)

    def to_label_text(self, row, label, index):
        cls = type(self)
        label[row, index] = 0
        text = []
        for i, x in enumerate(cls.classes):
            text += self.values[i].to_label_text(row, label, index+i+1)

        random.shuffle(text)
        return ", ".join(text)


    @classmethod
    def random_samples(cls, number: int):
        items = [x.random_samples(number) for x in cls.classes]
        new_items = []
        for x in range(number):
            new_list = []
            for y in range(len(items)):
                new_list.append(items[y][x])
            new_item = cls(*new_list)
            new_items.append(new_item)
        return new_items
