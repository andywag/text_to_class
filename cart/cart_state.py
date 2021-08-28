
from state_machine import State, Action, TextResponse, ChoiceResponse


class Order(Action):
    def __init__(self, item):
        self.item = item


class Update(Action):
    def __init__(self, item):
        self.item = item


class YesAction(Action):
    def __init__(self):
        pass

class NoAction(Action):
    def __init__(self):
        pass


def handle_update(cart, missing_values, action):
    if len(missing_values) == 0:
        cart.current_state = ConfirmState(cart)
        return [ChoiceResponse(f"Add {str(cart.current)} to Cart?", ["Yes","No"])]
    else:
        missing_value = missing_values[0]
        cart.current_state = UpdateState(cart, missing_value)
        return [TextResponse(f"Ok, so you want a {str(cart.current)}"),
                ChoiceResponse(str(missing_value.title()), missing_value.options())]


class WaitingState(State):
    def __init__(self, cart):
        self.cart = cart

    def handle_action(self, action):
        if isinstance(action, Order):
            # List of missing items
            missing_values = action.item.missing_values()
            self.cart.current = action.item
            return handle_update(self.cart, missing_values, action)
        else:
            pass


class ConfirmState(State):
    def __init__(self, cart):
        self.cart = cart

    def handle_action(self, action):
        def yes_action():
            self.cart.items.append(self.cart.current)
            self.cart.current = None
            self.cart.current_state = WaitingState(self.cart)
            return [TextResponse(f"Added {str(self.cart.items[-1])} to Cart")]

        def no_action():
            self.cart.current = None
            self.cart.current_state = WaitingState(self.cart)
            return [TextResponse(f"Dropped Item")]

        if isinstance(action, YesAction):
            yes_action()
        elif isinstance(action, NoAction):
            no_action()
        elif isinstance(action, Update):
            if int(action.item) == 0:
                return yes_action()
            else:
                return no_action()
        else:
            pass


class UpdateState(State):
    def __init__(self, cart, missing_value):
        self.cart = cart
        self.missing_value = missing_value

    def handle_action(self, action):
        if isinstance(action, Update):
            self.missing_value.update(action.item)
            missing_values = self.cart.current.missing_values()
            return handle_update(self.cart, missing_values, action)
        elif isinstance(action, Order):
            missing_values = action.item.missing_values()
            self.cart.current = action.item
            result = handle_update(self.cart, missing_values, action)
            return [TextResponse("Clearing Previous Order")] + result
        else:
            pass


class Cart:
    def __init__(self, items=[]):
        self.items = items
        self.current = None
        self.current_state = WaitingState(self)

    def contents_response(self):
        response = [f"{i+1}) {str(x)}" for i, x in enumerate(self.items)]
        response = TextResponse("\n".join(response))
        return [response]

    def action(self, update):
        return self.current_state.handle_action(update)






