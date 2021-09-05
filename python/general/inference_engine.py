
from python.classifier_trainer import ClassifierTrainer, BERT4
from python.general.general_struct import create_eval_data



class InferenceEngine:
    # Engine to handle inference based on a trained model
    def __init__(self, classifier_description, checkpoint, model=BERT4):

        self.trainer = ClassifierTrainer(classifier_description=classifier_description,
                                                  ckpt=checkpoint,
                                                  model=model)

    def eval(self, text, desired_object):
        eval_data = create_eval_data(text, tokenizer=self.trainer.tokenizer)
        p = self.trainer.infer(eval_data, eval_data)
        probs = self.trainer.get_probs(p)
        infer_results = desired_object.from_probs_array(probs, 0)
        return infer_results






