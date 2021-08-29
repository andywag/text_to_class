
from parse_files import create_order
from python.general_struct import GeneralClassifierStruct, create_random_data, create_eval_data
from python.classifier_trainer import ClassifierTrainer

classifier_description = GeneralClassifierStruct([10, 256], 0)

def train():

    Order = create_order()
    input_data = create_random_data(Order, 2000000, 2)

    chipotle_trainer = ClassifierTrainer(classifier_description=classifier_description, tr_batch_size=128)
    chipotle_trainer.train(input_data, input_data)


def infer():
    Order = create_order()
    eval_data = create_random_data(Order, 500, 16)
    eval_data = create_eval_data(["Big Mac", "Large Fries", "Quarter Pounder", "cheeseburger",
                                  "Large Diet Coke", "Medium Dr Pepper", "Chicken Sandwich","Filet of Fish","Shamrock"])
    chipotle_trainer = ClassifierTrainer(classifier_description=classifier_description, ckpt="test_trainer/checkpoint-3300")
    p = chipotle_trainer.infer(eval_data, eval_data)
    probs = chipotle_trainer.get_probs(p)
    infer_results = Order.from_probs_array(probs, 0)

    pass

#train()
infer()