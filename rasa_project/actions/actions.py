# This files contains your custom actions which can be used to run
# custom Python code.
#
# See this guide on how to implement these action:
# https://rasa.com/docs/rasa/custom-actions

from rasa_sdk import Action, Tracker
from rasa_sdk.executor import CollectingDispatcher
import sys
import transformers
sys.path.append("../chipotle")
sys.path.append("..")

from chipotle_server import InferenceEngine


class CommonState:
    def __init__(self):
        pass

common = CommonState()


def handle_data(dispatcher, tracker):
    response = common.response
    missing = response.missing_values()
    common.missing = missing
    print("Missing", missing)

    text_response = f"Ok, so you want a {str(response)}"
    dispatcher.utter_message(text=text_response)

    if len(missing) > 0:
        text_response = f"What {missing[0][1]} would you like?"
        def qu(x):
            return '"' + x + '"'

        buttons = [{"title": str(x),
                    "payload": "/button_response{" + qu("index") + ':' + qu(str(i)) + "}"} for i, x in
                   enumerate(list(missing[0][1]))]
        dispatcher.utter_message(text_response, buttons=buttons)
    else:
        dispatcher.utter_message(text="Is that correct?")


class ActionButtonResponse(Action):
    def name(self):
        return "action_button_response"

    def run(self, dispatcher: CollectingDispatcher, tracker, domain):
        print("Handle Button Response", type(common.response), common.response)
        print("Missing", common.missing)
        index = tracker.latest_message['entities'][0]['value']
        print("Latest", tracker.latest_message)
        print("Index", index)
        print("Value Index", common.missing[0][0])
        common.response = common.response.update_value(int(common.missing[0][0]), int(index))
        print("Response", common.response)
        handle_data(dispatcher, tracker)

class ActionOrder(Action):
    def __init__(self):
        self.engine = InferenceEngine("../chipotle/bert4/checkpoint-4000")

    def name(self):
        return "action_order"

    def run(self, dispatcher: CollectingDispatcher, tracker, domain):
        print("Here", tracker.latest_message['text'])
        response = self.engine.eval([tracker.latest_message['text']])
        common.response = response[0]
        handle_data(dispatcher, tracker)


        return []



