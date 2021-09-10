
from text_to_class.general.general_struct import create_random_data
from text_to_class.classifier.classifier_trainer import ClassifierTrainer, BERT4


def train(classifier_description, data_type, model=BERT4):

    trainer = ClassifierTrainer(classifier_description=classifier_description,
                                model=BERT4,
                                batch_size=128,
                                steps_per_save=500)
    input_data = create_random_data(data_type, 600000, 16, tokenizer=trainer.tokenizer, bin_label_length=11)
    trainer.train(input_data, input_data)


def infer(classifier_description, checkpoint, data_type, model=BERT4):

    trainer = ClassifierTrainer(classifier_description=classifier_description,
                                         ckpt=checkpoint)

    eval_data = create_random_data(data_type, 500, 16, tokenizer=trainer.tokenizer, bin_label_length=11)

    p = trainer.infer(eval_data, eval_data)
    probs = trainer.get_probs(p)
    infer_results = data_type.from_probs_array(probs, 0)
    d = [str(x) for x in infer_results]
    print(d)
    pass



#TODO Add an argparser and command line option for running
#train()
#infer()