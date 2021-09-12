
from collections import namedtuple
import numpy as np
from dataclasses import dataclass
from typing import List

@dataclass
class PredictionItem:
    index: int
    probability: float

@dataclass
class PredictionResult:
    probabilities: List[np.ndarray]
    indices: List[PredictionItem]
    text: str
