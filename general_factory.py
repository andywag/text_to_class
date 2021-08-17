from general_struct import GenericEnum
import random
import numpy as np


class SingleChoice:
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


class MultiChoice:
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


class BinaryList:
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
        result = [f"{x[0], x[1]}" if x[1] > .8 else "" for x in zip(cls.items, self.values)]

        return ",".join(result)


class Combination:
    def __init__(self):
        pass

    def __repr__(self):
        cls = type(self)
        text = ""
        for i, x in enumerate(self.values):
            text += str(x) + ","
        return text

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
