import numpy as np
from text_to_class.classifier.classifier_dataset import GeneralDataset
import random

from text_to_class.classifier.classifier_description import GeneralClassifierStruct
from typing import List


def name_to_string(item):
    return item.lower().replace("_", " ")


def create_random_text_enum(node, labels: List[int], index: int, row: int, required: bool = False) -> (str, int):
    """Creates random text based on the enumeration """
    minimum_value = 0
    if required:
        minimum_value = 1

    label_type = np.random.randint(minimum_value, 2, dtype=np.uint64)
    label_index = np.random.randint(minimum_value, len(node.values), dtype=np.uint64)
    label_index = int(label_type*label_index)
    if label_index != 0:
        labels[row, index] = label_index
        return name_to_string(node.values[label_index].name), index
    else:
        labels[row, index] = 0
        return None, None


#
def create_random_text_option(node, labels: List[int], index: int, row: int) -> (str, int):
    """ Handle Text Creation for an option node
    Create a set of random options based on a uniform distribution"""
    label_index = np.random.randint(0, len(node.fields))
    labels[row, index] = label_index
    text = create_random_text_field(node.fields[label_index], labels, index+1, row)
    return text


def create_random_text_binary(node, labels: List[int], index: int, row: int) -> (str, int):
    # Create a set of random options based on a uniform distribution
    label_index = indices = np.random.randint(0, 2, dtype=np.uint64)
    labels[row, index] = label_index
    if label_index == 0:
        return None, None
    else:
        return name_to_string(node), index


def create_random_text_field(field, labels: List[int], index: int, row: int, required: bool = False) -> (str, int):
    # Handle random creation of a field
    if field.cpp_type == field.CPPTYPE_MESSAGE:
        return create_random_text_type(field.message_type, labels, index, row)
    elif field.message_type is not None:
        return create_random_text_type(field.message_type, labels, index, row)
    elif field.cpp_type == field.CPPTYPE_ENUM is not None:
        return create_random_text_enum(field.enum_type, labels, index, row, required)
    elif field.cpp_type == field.CPPTYPE_FLOAT:
        return create_random_text_binary(field.name, labels, index, row)


def create_random_text_type(node, labels: List[int], index: int, row: int) -> (str, List[int]):

    if node.oneofs is not None and len(node.oneofs) > 0:  # Handle Option Node Separately
        return create_random_text_option(node.oneofs[0], labels, index, row)
    elif len(node.fields) > 0:  # Loop through the fields and combine the text
        text = []
        for i, field in enumerate(node.fields):
            required = len(node.fields) <= 1
            text.append(create_random_text_field(field, labels, index + i, row, required))
        random.shuffle(text)
        full_text = list(filter(lambda x: x[0] is not None, text))
        real_text = [x[0] for x in full_text]
        token_labels = [x[1] for x in full_text]
        result = ",".join(real_text), token_labels
        return result
    else:
        pass


def create_random_root(node, labels: List[int], index: int, row: int) -> (str, List[int]):
    return create_random_text_option(node.oneofs[0], labels, index, row)


def create_random_samples(classifier_description: GeneralClassifierStruct, proto_top, number: int, tokenizer):
    """ Create Random data based on google proto-buffer
    """
    labels = np.zeros((number, classifier_description.total_dims()), dtype=np.int64)
    full_text = [create_random_root(proto_top, labels, 0, x) for x in range(number)]
    text = [x[0] for x in full_text]
    tokenized_data = tokenizer.batch_encode_plus(text, truncation=True, padding='max_length', max_length=40)

    if classifier_description.per_token_spec:
        token_labels = [x[1] for x in full_text]
        idx = 0
        for x in range(len(text)):
            data = tokenized_data.data['input_ids'][x]
            idx = 0
            for y in range(40):
                if data[y] == 101:
                    labels[x][classifier_description.dimension_multi_binary()+y] = -100
                elif data[y] == 102:
                    labels[x][classifier_description.dimension_multi_binary()+y] = -100
                    idx = 1000
                elif data[y] == 1010:
                    labels[x][classifier_description.dimension_multi_binary()+y] = -100
                    idx += 1
                else:
                    if len(token_labels[x]) < idx:
                        pass
                    #try:
                    if len(token_labels[x]) > idx:
                        labels[x][classifier_description.dimension_multi_binary() + y] = token_labels[x][idx]
                    else:
                        labels[x][classifier_description.dimension_multi_binary() + y] = -100

                    #except:
                    #    pass
    input_data = GeneralDataset(tokenized_data, labels, text)
    return input_data


