
from torch import nn
from torch.nn import BCEWithLogitsLoss, CrossEntropyLoss, MSELoss
from transformers import BertPreTrainedModel, BertModel
from transformers.modeling_outputs import SequenceClassifierOutput
from transformers import AlbertPreTrainedModel, AlbertModel

from text_to_class.classifier.classifier_description import ClassifierDescription

class BertCompress(BertPreTrainedModel):
    def __init__(self, config, labels: ClassifierDescription):
        super().__init__(config)
        self.classifier_description = labels
        self.config = config

        self.bert = BertModel(config)
        self.dropout = nn.Dropout(config.hidden_dropout_prob)
        self.classifier = nn.ModuleList()

        for spec in self.classifier_description.specs:
            layer = nn.Linear(config.hidden_size, spec.num_labels())
            self.classifier.append(layer)

        if self.classifier_description.per_token_spec:
            self.token_classifier = nn.Linear(config.hidden_size,
                                              self.classifier_description.dimension_multi_binary() + 1)
        self.init_weights()
        self.ratio = torch.ones(size=(8, 32)).cuda()
        self.soft_max = torch.nn.Softmax()

    def forward(
        self,
        input_ids=None,
        attention_mask=None,
        token_type_ids=None,
        position_ids=None,
        head_mask=None,
        inputs_embeds=None,
        labels=None,
        output_attentions=None,
        output_hidden_states=None,
        return_dict=None,
    ):
        r"""
        labels (:obj:`torch.LongTensor` of shape :obj:`(batch_size,)`, `optional`):
            Labels for computing the sequence classification/regression loss. Indices should be in :obj:`[0, ...,
            config.num_labels - 1]`. If :obj:`config.num_labels == 1` a regression loss is computed (Mean-Square loss),
            If :obj:`config.num_labels > 1` a classification loss is computed (Cross-Entropy).
        """
        return_dict = return_dict if return_dict is not None else self.config.use_return_dict

        outputs = self.bert(
            input_ids,
            attention_mask=attention_mask,
            token_type_ids=token_type_ids,
            position_ids=position_ids,
            head_mask=head_mask,
            inputs_embeds=inputs_embeds,
            output_attentions=output_attentions,
            output_hidden_states=output_hidden_states,
            return_dict=return_dict,
        )
        inference = False

        pooled_output = outputs[1]

        total_logits = []
        loss = None

        label_location = 0
        for x, spec in enumerate(self.classifier_description.specs):
            logits = self.classifier[x](pooled_output)
            probs = self.soft_max(logits)
            first_label = torch.argmax(probs, -1)
            smr = self.soft_max(self.ratio[x])

            rlogits = probs/smr
            label = torch.argmax(rlogits, -1)
            self.ratio[x] += torch.bincount(label, minlength=32)

            label_create = torch.argmax(logits[::2, :], -1)
            if x % 2 == 0:
                label[1::2] = label_create
            else:
                label[1::2] = -100

            loss_fct = CrossEntropyLoss()
            if not inference:
                use_labels = label
                use_logits = logits.view(-1, spec.num_labels())
                current_loss = loss_fct(use_logits, use_labels)
            label_location += 1

            if not inference:
                if loss is None:
                    loss = current_loss
                else:
                    loss += current_loss
            total_logits.append(logits)



        single_output = SequenceClassifierOutput(
            loss=loss,
            logits=total_logits,
            hidden_states=outputs.hidden_states,
            attentions=outputs.attentions,
        )
        return single_output

