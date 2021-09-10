import text_to_class.chipotle.chipotle_pb2 as pb
from text_to_class.general.general_struct import GeneralClassifierStruct
from text_to_class.general.proto_structure import ProtoStructure


class ChipotleProtoStructure(ProtoStructure):
    def __init__(self):
        classifier_description = GeneralClassifierStruct([4, 8, 6, 4, 4], 11)
        super().__init__(classifier_description, pb.Order)


if __name__ == "__main__":
    proto_structure = ChipotleProtoStructure()
    #proto_structure.train(1000000)
    #proto_results = proto_structure.infer_text(["steak burrito"],"bert4/checkpoint-7500")
    proto_results = proto_structure.infer_random("../../../../checkpoints/chipotle/bert4/checkpoint-7500")
    pass

pass

