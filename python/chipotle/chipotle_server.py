
from classifier_trainer import ClassifierTrainer, BERT4
from general_struct import GeneralClassifierStruct, create_eval_data
from chipotle_struct import Order



class InferenceEngine:
    def __init__(self, ckpt):
        classifier_description = GeneralClassifierStruct([3, 8, 5, 5, 5], 11)
        self.chipotle_trainer = ClassifierTrainer(classifier_description=classifier_description,
                                                  ckpt=ckpt,
                                                  model=BERT4)

    def eval(self, text):
        eval_data = create_eval_data(text, tokenizer=self.chipotle_trainer.tokenizer)
        p = self.chipotle_trainer.infer(eval_data, eval_data)
        probs = self.chipotle_trainer.get_probs(p)
        infer_results = Order.from_probs_array(probs, 0)
        return infer_results




