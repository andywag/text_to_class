
from chipotle_struct import Order
from text_to_class.src.text_to_class.general.struct_trainer import train, infer
from chipotle_struct import classifier_description


def train_chipotle():
    train(classifier_description, Order)
    #trainer = ClassifierTrainer(classifier_description=classifier_description,
    #                            model=BERT4,
    #                            batch_size=128,
    #                            steps_per_save=500)
    #input_data = create_random_data(Order, 600000, 16, tokenizer=trainer.tokenizer,
    #                                bin_label_length=classifier_description.binary)
    #trainer.train(input_data, input_data)


def infer_chipotle():
    infer(classifier_description, "bert4/checkpoint-4500", Order)

    #chipotle_trainer = ClassifierTrainer(classifier_description=classifier_description,
    #                                     ckpt="bert4/checkpoint-4500")

    #eval_data = create_random_data(Order, 500, 16, tokenizer=chipotle_trainer.tokenizer,
    #                               bin_label_length=classifier_description.binary)

    #p = chipotle_trainer.infer(eval_data, eval_data)
    #probs = chipotle_trainer.get_probs(p)
    #infer_results = Order.from_probs_array(probs, 0)
    #d = [str(x) for x in infer_results]
    #print(d)
    #pass

#import argparse
#parser = argparse.ArgumentParser(description='Run training or inference on chipotle data')

#if __name__=="__main__":
#    main()

#TODO Add an argparser and command line option for running
#train_chipotle()
infer_chipotle()