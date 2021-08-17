
from chipotle_struct import Meal, Order
from general_struct import GeneralClassifierStruct, create_random_data, create_eval_data
from classifier_trainer import ClassifierTrainer
import numpy as np
from classifier_dataset import GeneralDataset
from transformers import BertConfig, BertTokenizer, BertTokenizerFast

classifier_description = GeneralClassifierStruct([3, 8, 5, 5, 5], 11)

def train():

    input_data = create_random_data(Order, 600000, 16)

    chipotle_trainer = ClassifierTrainer(classifier_description=classifier_description)
    chipotle_trainer.train(input_data, input_data)


def infer():
    #eval_data = create_random_data(Order, 500, 16)
    eval_data = create_eval_data(["Steak Burrito with Brown, Guacamole and Fajitas", "pepsi", "chips"])
    chipotle_trainer = ClassifierTrainer(classifier_description=classifier_description,
                                         ckpt="test_trainer/checkpoint-950")
    p = chipotle_trainer.infer(eval_data, eval_data)
    probs = chipotle_trainer.get_probs(p)
    infer_results = Order.from_probs_array(probs, 0)
    d = [str(x) for x in infer_results]
    print(d)
    pass


#train()
infer()