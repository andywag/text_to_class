
import torch.utils.data


class GeneralDataset(torch.utils.data.Dataset):
    def __init__(self, input_data, labels, text, option_text = None):
        self.input_data = input_data
        self.labels = labels
        self.text = text
        self.option_text = option_text

    def __len__(self):
        return len(self.input_data.data['input_ids'])

    def __getitem__(self, idx):
        item = dict()
        item['input_ids'] = torch.tensor(self.input_data.data['input_ids'][idx])
        item['attention_mask'] = torch.tensor(self.input_data.data['attention_mask'][idx])
        if self.labels is not None:
            item['labels'] = torch.tensor(self.labels[idx])
        return item

    def __add__(self, other):
        self.input_data.data['input_ids'] += other.input_data.data['input_ids']
        self.input_data.data['token_type_ids'] += other.input_data.data['token_type_ids']
        self.input_data.data['attention_mask'] += other.input_data.data['attention_mask']

        self.labels += other.labels
        self.text += other.text
        if self.option_text is not None:
            self.option_text += other.option_text
        return self