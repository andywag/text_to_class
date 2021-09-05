# This files contains your custom rasa_actions which can be used to run
# custom Python code.
#
# See this guide on how to implement these action:
# https://rasa.com/docs/rasa/custom-actions

from rasa_sdk import Action
from rasa_sdk.executor import CollectingDispatcher
import sys
import json
import traceback
import base64

sys.path.append("..")

from python.general.proto_structure import ProtoInferenceEngine
from python.chipotle.chipotle_derived import ChipotleProtoStructure
import python.chipotle.chipotle_pb2 as pb

from google.protobuf.json_format import MessageToJson, MessageToDict, Parse, ParseDict


chipotle_proto = ChipotleProtoStructure()
proto_inference_engine = ProtoInferenceEngine(chipotle_proto, "chipotle/bert4/checkpoint-7500")
dummy_response = pb.Response()

def send_response(dispatcher, response):
    #response_string = response.SerializeToString()
    #encoded = base64.b64encode(response_string)
    #decoded = encoded.decode('ascii')
    #recoded = encoded.encode('ascii')

    print("Response", response, MessageToJson(response))

    dispatcher.utter_message(text="", json_message=MessageToJson(response))
    #dispatcher.utter_message(json_message={"response": decoded})


def send_action_response(dispatcher, action):
    response = pb.Response()
    response.action = action
    send_response(dispatcher, response)



class SimpleAction(Action):
    action_name = "action_proto"
    def name(self):
        return type(self).action_name

    def run(self, dispatcher: CollectingDispatcher, tracker, domain):
        send_action_response(dispatcher, type(self).action_cmd)
        return []


class ActionView(SimpleAction):
    action_name = "action_view"
    action_cmd = dummy_response.Action.VIEW


class ActionClear(SimpleAction):
    action_name = "action_clear"
    action_cmd = dummy_response.Action.CLEAR


class ActionAffirm(SimpleAction):
    action_name = "action_affirm"
    action_cmd = dummy_response.Action.AFFIRM


class ActionDeny(SimpleAction):
    action_name = "action_deny"
    action_cmd = dummy_response.Action.DENY


class ActionOrder(Action):
    def __init__(self):
        pass

    def name(self):
        return "action_order"

    def run(self, dispatcher: CollectingDispatcher, tracker, domain):
        # Run ML on input data
        print(f"Running Evaluation {tracker.latest_message['text']}")
        order = proto_inference_engine.eval([tracker.latest_message['text']])
        response = pb.Response()
        response.action = dummy_response.Action.ORDER
        response.order.CopyFrom(order[0])
        send_response(dispatcher, response)
        #print("Response", response[0])
        #response_string = response[0].SerializeToString()
        #dispatcher.utter_message(json_message={"response": response_string.decode("utf-64")})

        return []



