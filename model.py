
import math
import os
import warnings
from dataclasses import dataclass
from typing import Optional, Tuple

import torch
import torch.utils.checkpoint
from packaging import version
from torch import nn
from torch.nn import BCEWithLogitsLoss, CrossEntropyLoss, MSELoss
from transformers.models.bert import BertPreTrainedModel, BertModel
from transformers.modeling_outputs import SequenceClassifierOutput
from dataclasses import dataclass



class BertForMultiSequenceClassification(BertPreTrainedModel):
    def __init__(self, config, labels):
        super().__init__(config)
        self.classifier_description = labels
        self.config = config

        self.bert = BertModel(config)
        self.dropout = nn.Dropout(config.hidden_dropout_prob)
        self.classifier = nn.ModuleList()
        for spec in self.classifier_description.specs:
            self.classifier.append(nn.Linear(config.hidden_size, spec.num_labels()))

        self.init_weights()

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
        if labels is None:
            inference = True

        pooled_output = outputs[1]

        pooled_output = self.dropout(pooled_output)

        total_logits = []
        loss = None

        label_location = 0
        for x, spec in enumerate(self.classifier_description.specs):
            logits = self.classifier[x](pooled_output)
            if spec.binary:
                bce_loss_fct = BCEWithLogitsLoss()
                if not inference:
                    use_labels = labels[:, label_location:spec.num_labels() + label_location]
                    current_loss = bce_loss_fct(logits, use_labels.float())

                label_location += spec.num_labels()
            else:
                loss_fct = CrossEntropyLoss()
                if not inference:
                    current_loss = loss_fct(logits.view(-1, spec.num_labels()), labels[:, label_location].view(-1))
                label_location += 1

            if not inference:
                if loss is None:
                    loss = current_loss
                else: loss += current_loss
            total_logits.append(logits)



        single_output = SequenceClassifierOutput(
            loss=loss,
            logits=total_logits,
            hidden_states=outputs.hidden_states,
            attentions=outputs.attentions,
        )
        return single_output
