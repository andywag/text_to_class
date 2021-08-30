# This files contains your custom rasa_actions which can be used to run
# custom Python code.
#
# See this guide on how to implement these action:
# https://rasa.com/docs/rasa/custom-actions

from rasa_sdk import Action
from rasa_sdk.executor import CollectingDispatcher
import sys
sys.path.append(".")
sys.path.append("chipotle")

from chipotle.chipotle_server import InferenceEngine
from cart.cart_state import Cart, Order, Update, YesAction, NoAction
from state_machine import TextResponse, ChoiceResponse, SharedState


cart_store = SharedState(Cart)


def get_state(id):
    return cart_store.get_state(id)


def state_to_response(cart, response, dispatcher):
    def qu(x):
        return '"' + x + '"'

    if response is None:
        print("No Response from State Machine", cart.current_state)
        dispatcher.utter_message(f"No Response from Internal State Machine {cart.current_state}")
    elif isinstance(response, TextResponse):
        dispatcher.utter_message(text=response.text)
    elif isinstance(response, ChoiceResponse):
        buttons = [{"title": str(x),
                    "payload": "/button_response{" + qu("index") + ':' + qu(str(i)) + "}"} for i, x in
                   enumerate(response.choices)]
        print("Response", response.text, buttons)
        dispatcher.utter_message(text=response.text, buttons=buttons)

def internal_exception(dispatcher):
    print("Internal Exception")
    cart = SharedState(Cart)
    dispatcher.utter_message("Internal Error, Cart Reset")

class ActionView(Action):
    def name(self):
        return "action_view"

    def run(self, dispatcher: CollectingDispatcher, tracker, domain):
        try:
            cart = get_state(tracker.sender_id)
            [state_to_response(cart, x, dispatcher) for x in cart.contents_response()]
        except:
            internal_exception(dispatcher)

        return []


class ActionClear(Action):
    def name(self):
        return "action_clear"

    def run(self, dispatcher: CollectingDispatcher, tracker, domain):
        try:
            cart = get_state(tracker.sender_id)
            cart.items = []
        except:
            internal_exception(dispatcher)

        return []


class ActionAffirm(Action):
    def name(self):
        return "action_affirm"

    def run(self, dispatcher: CollectingDispatcher, tracker, domain):
        try:
            cart = get_state(tracker.sender_id)
            result = cart.action(YesAction())
            [state_to_response(cart, x, dispatcher) for x in result]
        except:
            internal_exception(dispatcher)

        return []


class ActionDeny(Action):
    def name(self):
        return "action_deny"

    def run(self, dispatcher: CollectingDispatcher, tracker, domain):
        try:
            cart = get_state(tracker.sender_id)
            result = cart.action(NoAction())
            [state_to_response(cart, x, dispatcher) for x in result]
        except:
            internal_exception(dispatcher)

        return []


class ActionButtonResponse(Action):
    def name(self):
        return "action_button_response"

    def run(self, dispatcher: CollectingDispatcher, tracker, domain):
        try:
            index = tracker.latest_message['entities'][0]['value']
            cart = get_state(tracker.sender_id)
            print("Handle Response", cart.current_state, index)

            result = cart.action(Update(index))
            [state_to_response(cart, x, dispatcher) for x in result]
        except:
            internal_exception(dispatcher)

        return []


class ActionOrder(Action):
    def __init__(self):
        checkpoint_folder = None#os.environ.get("CHECKPOINT_LOCATION")
        if checkpoint_folder is None:
            checkpoint_folder = "../chipotle/"
        self.engine = InferenceEngine(f"{checkpoint_folder}/bert4/checkpoint-4500")

    def name(self):
        return "action_order"

    def run(self, dispatcher: CollectingDispatcher, tracker, domain):
        try:
            # Run ML on input data
            response = self.engine.eval([tracker.latest_message['text']])
            print(f"Found Object {response}")
            # Append the Order to the Cart
            cart = get_state(tracker.sender_id)
            result = cart.action(Order(response[0]))
            if result is not None:
                [state_to_response(cart, x, dispatcher) for x in result]
        except:
            internal_exception(dispatcher)

        return []


