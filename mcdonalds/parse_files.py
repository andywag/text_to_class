import json
from general_factory import MultiChoice


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
    for key, value in out_data:
        # creating class dynamically
        Geeks = type("Geeks", (object,), {
        # constructor
            "__init__": constructor,

            # data members
            "string_attribute": "Geeks 4 geeks !",
            "int_attribute": 1706256,

            # member functions
            "func_arg": displayMethod,
            "class_func": classMethod
        })

out_data = parse_file()
pass