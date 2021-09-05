from python.general.general_struct import GenericEnum, GeneralClassifierStruct
import numpy as np
from python.classifier_dataset import GeneralDataset
import random

def name_to_string(item):
    return item.lower().replace("_", " ")


def create_random_text_enum(node, labels, index, row) -> str:
    # Creates random text based on the enumeration
    label_type = np.random.randint(0, 2, dtype=np.uint64)
    label_index = np.random.randint(0, len(node.values), dtype=np.uint64)
    label_index = int(label_type*label_index)
    if label_index != 0:
        labels[row, index] = label_index
        return name_to_string(node.values[label_index].name)
    else:
        labels[row, index] = 0
        return None


# Handle Text Creation for an option node
def create_random_text_option(node, labels, index, row) -> str:
    # Create a set of random options based on a uniform distribution
    label_index = np.random.randint(0, len(node.fields))
    labels[row, index] = label_index
    text = create_random_text_field(node.fields[label_index], labels, index+1, row)
    return text


def create_random_text_binary(node, labels, index, row) -> str:
    # Create a set of random options based on a uniform distribution
    label_index = indices = np.random.randint(0, 2, dtype=np.uint64)
    labels[row, index] = label_index
    if label_index == 0:
        return None
    else:
        return name_to_string(node)


def create_random_text_field(field, labels, index, row) -> str:
    # Handle random creation of a field
    if field.cpp_type == field.CPPTYPE_MESSAGE:
        return create_random_text_type(field.message_type, labels, index, row)
    elif field.message_type is not None:
        return create_random_text_type(field.message_type, labels, index, row)
    elif field.cpp_type == field.CPPTYPE_ENUM is not None:
        return create_random_text_enum(field.enum_type, labels, index, row)
    elif field.cpp_type == field.CPPTYPE_FLOAT:
        return create_random_text_binary(field.name, labels, index, row)


def create_random_text_type(node, labels, index, row) -> str:

    if node.oneofs is not None and len(node.oneofs) > 0:  # Handle Option Node Separately
        return create_random_text_option(node.oneofs[0], labels, index, row)
    elif len(node.fields) > 0:  # Loop through the fields and combine the text
        text = []
        for i, field in enumerate(node.fields):
            text.append(create_random_text_field(field, labels, index + i, row))
        random.shuffle(text)
        text = filter(lambda x : x is not None, text)
        return ",".join(text)
    else:
        pass


def create_random_samples(classifier_description, proto_top, number, tokenizer):
    # Create Random data based on google proto-buffer
    labels = np.zeros((number, classifier_description.total_dims()), dtype=np.int64)
    text = [create_random_text_type(proto_top, labels, 0, x) for x in range(number)]
    tokenized_data = tokenizer.batch_encode_plus(text, truncation=True, padding='max_length', max_length=40)
    input_data = GeneralDataset(tokenized_data, labels, text)
    return input_data


