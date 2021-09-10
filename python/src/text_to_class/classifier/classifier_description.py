
class ClassifierDescription:
    """ Specification for the classifier
        :param specs : List of classifier widths
        :param per_token_spec : Adds a per token classifier
    """
    def __init__(self, specs, per_token_spec: bool =False):
        self.specs = specs
        self.per_token_spec = per_token_spec
        self.text_field_titles = ["Text"]

    def get_text(self, eval_data, row, col):
        return eval_data.text[row]



