from text_to_class.classifier.classifier_description import GeneralClassifierStruct
from text_to_class.classifier.classifier_trainer import ClassifierTrainer, BERT4
import json
import pickle
from transformers import BertTokenizer
import torch
import numpy as np

class DoubleDataSet(torch.utils.data.Dataset):
    def __init__(self, input_data, text):
        self.input_data = input_data
        self.text = text
        self.index = 0

    def __len__(self):
        return 2*len(self.input_data.data['input_ids'])

    def __getitem__(self, idx):
        item = dict()
        idx = self.index
        if idx % 2 == 0:
            idx = int(idx/2)
            item['input_ids'] = torch.tensor(self.input_data.data['input_ids'][idx])
            item['attention_mask'] = torch.tensor(self.input_data.data['attention_mask'][idx])
        else:
            idx = int(idx/2)
            data_length = int(np.sum(self.input_data.data['attention_mask'][idx])/2)
            new_mask = [0]*len(self.input_data.data['input_ids'][idx])
            new_mask[:data_length] = [1]*data_length
            item['input_ids'] = torch.tensor(self.input_data.data['input_ids'][idx])
            item['attention_mask'] = torch.tensor(new_mask)
        self.index += 1
        return item

classifier_description = GeneralClassifierStruct([32]*8, 0, False)
trainer = ClassifierTrainer(classifier_description, model=BERT4, compress=True)

#with open('meta_Video_Games.json') as fp:
#    data = json.loads("[" + fp.read().replace("}\n{", "},\n{") + "]")

#text = [x['title'] for x in data]

#tokenized_data = trainer.tokenizer.batch_encode_plus(text, truncation=True, padding='max_length', max_length=40)
#with open('data.pkl','wb') as fp:
#    pickle.dump(tokenized_data, fp)
with open('data.pkl','rb') as fp:
    data = pickle.load(fp)

input_data = DoubleDataSet(data, data)
trainer.train(input_data)

pass
#proto_structure.train_random(1000)

