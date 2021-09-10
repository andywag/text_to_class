def create_base_choice(probabilities, indices, proto_top, row, column):
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


def create_structure(probabilities, proto_top, input_data):
    # Create Random data based on google proto-buffer
    # Split out probabilities
    results = []

    for x in range(len(probabilities[0][0])):
        output = proto_top()
        create_base_choice(probabilities[0], probabilities[1], output, x, 0)
        results.append(output)
    return results



