import python.chipotle.chipotle_pb2 as pb
from python.general.general_struct import GenericEnum, GeneralClassifierStruct
from python.general.proto_structure import ProtoStructure
from python.general.samples_from_proto import create_random_samples
from google.protobuf.json_format import MessageToJson, MessageToDict, Parse, ParseDict


class ChipotleProtoStructure(ProtoStructure):
    def __init__(self):
        classifier_description = GeneralClassifierStruct([4, 8, 6, 4, 4], 11)
        super().__init__(classifier_description, pb.Order)


if __name__ == "__main__":
    proto_structure = ChipotleProtoStructure()
    proto_structure.train(1000000)
    #proto_results = proto_structure.infer_text(["steak burrito"],"bert4/checkpoint-7500")
    #proto_results = proto_structure.infer_random("bert4/checkpoint-7500")



pass

