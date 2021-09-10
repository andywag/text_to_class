
class State:
    def __init__(self):
        pass

    def handle_action(self, action):
        pass


class Action:
    def __init__(self):
        pass


class Response:
    def __init__(self):
        pass


class TextResponse(Response):
    def __init__(self, text):
        self.text = text


class ChoiceResponse(Response):
    def __init__(self, text, choices):
        self.text = text
        self.choices = choices


class SharedState:

    def __init__(self, creator):
        self.creator = creator
        self.state_store = dict()

    def get_state(self, id):
        if id not in self.state_store:
            state = self.creator()
            self.state_store[id] = state
        return self.state_store[id]
