import json
from text_to_class.general.general_factory import MultiChoice, SingleChoice
from text_to_class.general.general_struct import GenericEnum
import aenum

def parse_file(file = 'mcs.json'):
    with open('mcd.json', 'r') as fp:
        data = json.load(fp)
        out_data = dict()
        for d in data:
            name = d['ITEM']
            category = d['CATEGORY']
            if category in out_data:
                out_data[category].append(name)
            else:
                out_data[category] = [name]

        return out_data


def create_classes(out_data):
    def constructor(self, item):
        self.item = item

    def create_class(key, value, index):
        enum = type(key+"Enum", (GenericEnum,), {})
        for i, v in enumerate(value):
            aenum.extend_enum(enum, v, (i, v))

        gen = type(key, (SingleChoice,), {
            "__init__": constructor
        })
        gen.location = index
        gen.max_classes = 2
        gen.generator = enum
        return gen


    generated_classes = []
    for i, (key, value) in enumerate(out_data.items()):
        generate_class = create_class(key, value, i)
        generated_classes.append(generate_class)

    top = type('McTop',(MultiChoice,), {
        "__init__": constructor
    })
    top.classes = generated_classes
    return top


def create_order():
    out_data = parse_file()
    top = create_classes(out_data)
    return top