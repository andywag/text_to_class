import numpy as np
from typing import List
from text_to_class.common_structures import PredictionResult


def create_base_choice_new(result: PredictionResult, proto_top, column: int):
    """ Convert the probability structure into a google protobuffer object """
    index = result.indices[column].index
    found_item = proto_top.DESCRIPTOR.fields[index]
    found_probability = result.probabilities[column][index]
    next_proto = getattr(proto_top, found_item.name)
    create_random_text_field_new(result, next_proto, column + 1)


def create_random_text_field_new(result: PredictionResult, proto_top, column:int):
    # Handle random creation of a field
    base = proto_top.DESCRIPTOR
    if base.oneofs is not None and len(base.oneofs) > 0:
        index = result.indices[column].index
        next_proto = getattr(proto_top, base.fields[index].name)
        create_random_text_field_new(result, next_proto, column+1)
    elif len(base.fields) > 0:  # Container Class
        for i, field in enumerate(base.fields):
            if field.cpp_type == field.CPPTYPE_ENUM:
                index = result.indices[column+i].index
                found_probability = result.probabilities[column+i][index]
                if found_probability < .8:
                    index = -1
                setattr(proto_top, field.name, index)
            elif field.cpp_type == field.CPPTYPE_FLOAT:
                probability = result.probabilities[column+i][0]
                setattr(proto_top, field.name, probability)


def create_base_choice(probabilities, indices, proto_top, row, column):
    """ Convert the probability structure into a google protobuffer object """
    index = indices[column][row]
    found_item = proto_top.DESCRIPTOR.fields[index]
    found_probability = probabilities[column][row, index]
    next_proto = getattr(proto_top, found_item.name)
    create_random_text_field(probabilities, indices, next_proto, row, column + 1)


def create_random_text_field(probabilities, indices, proto_top, row, column):
    # Handle random creation of a field
    base = proto_top.DESCRIPTOR
    if base.oneofs is not None and len(base.oneofs) > 0:
        index = indices[column][row]
        next_proto = getattr(proto_top, base.fields[index].name)
        create_random_text_field(probabilities, indices, next_proto, row, column+1)
    elif len(base.fields) > 0:  # Container Class
        float_count = 0
        for i, field in enumerate(base.fields):
            if field.cpp_type == field.CPPTYPE_ENUM:
                index = indices[column+i][row]
                found_probability = probabilities[column+i][row, index]
                if found_probability < .8:
                    index = -1
                setattr(proto_top, field.name, index)
            elif field.cpp_type == field.CPPTYPE_FLOAT:
                #index = indices[column+i][row]
                probability = probabilities[-1][row, float_count]
                float_count += 1
                setattr(proto_top, field.name, probability)


def create_structure(probabilities, indices, proto_top, input_data):
    """Create Random data based on google proto-buffer
    Split out probabilities """
    results = []

    for x in range(len(probabilities[0][0])):
        output = proto_top()
        create_base_choice(probabilities, indices, output, x, 0)
        results.append(output)
    return results


def create_structure_new(results:List[PredictionResult], proto_top, input_data):
    """Create Random data based on google proto-buffer
    Split out probabilities """
    new_results = []

    for result in results:
        output = proto_top()
        create_base_choice_new(result, output, 0)
        new_results.append(output)

    return new_results


