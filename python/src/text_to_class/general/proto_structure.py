
from text_to_class.classifier.classifier_trainer import ClassifierTrainer, BERT4
from text_to_class.general.samples_from_proto import create_random_samples
from text_to_class.classifier.classifier_dataset import GeneralDataset
from text_to_class.general.probs_to_proto import create_structure, create_structure_new
from text_to_class.classifier.classifier_description import GeneralClassifierStruct


class ProtoStructure:
    def __init__(self, classifier_description: GeneralClassifierStruct, proto_type):
        self.classifier_description = classifier_description
        self.proto_type = proto_type

    def train_random(self, train_length=50000, model=BERT4):
        trainer = ClassifierTrainer(classifier_description=self.classifier_description,
                                    model=BERT4,
                                    batch_size=128,
                                    steps_per_save=500)
        input_data = create_random_samples(self.classifier_description, self.proto_type.DESCRIPTOR, train_length,
                                           tokenizer=trainer.tokenizer)
        trainer.train(input_data)

    def infer_random(self, checkpoint: str):
        trainer = ClassifierTrainer(classifier_description=self.classifier_description,
                                         ckpt=checkpoint)

        input_data = create_random_samples(self.classifier_description, self.proto_type.DESCRIPTOR, 500,
                                           tokenizer=trainer.tokenizer)

        p = trainer.infer(input_data)

        predictions = trainer.get_predictions(p, input_data)
        structure = create_structure_new(predictions, self.proto_type, input_data)
        accuracy = ClassifierTrainer.accuracy(predictions, input_data.labels)
        print("Accuracy", accuracy)

        return structure

    def infer_text(self, text, checkpoint):
        trainer = ClassifierTrainer(classifier_description=self.classifier_description,
                                         ckpt=checkpoint)
        tokenized_data = trainer.tokenizer.batch_encode_plus(text, truncation=True, padding='max_length',
                                                                    max_length=40)
        input_data = GeneralDataset(tokenized_data, None, tokenized_data)
        p = trainer.infer(input_data)
        probabilities_new = trainer.get_predictions(p, input_data)
        structure_new = create_structure_new(probabilities_new, self.proto_type, input_data)
        return structure_new

class ProtoInferenceEngine:
    # Engine to handle inference based on a trained model
    def __init__(self, proto_structure: ProtoStructure, checkpoint: str, model: str=BERT4):
        self.proto_structure = proto_structure
        self.trainer = ClassifierTrainer(classifier_description=proto_structure.classifier_description,
                                         ckpt=checkpoint)

    def eval(self, text):
        tokenized_data = self.trainer.tokenizer.batch_encode_plus(text, truncation=True, padding='max_length',
                                                                    max_length=40)
        input_data = GeneralDataset(tokenized_data, None, tokenized_data)
        p = self.trainer.infer(input_data)
        probabilities = self.trainer.get_probabilities(p)
        infer_results = create_structure(probabilities, self.proto_structure.proto_type, input_data)
        return infer_results