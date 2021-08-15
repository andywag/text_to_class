
from general_struct import GenericEnum, BinaryList
import numpy as np
import random

class MealType(GenericEnum):
    BURRITO = 0, "Burrito"
    SOFT_TACOS = 1, "Soft Tacos"
    CRISPY_TACOS = 2, "Crispy Tacos"
    SALAD = 3, "Salad"
    BOWL = 4, "Bowl"


class MeatType(GenericEnum):
    CHICKEN = 0, "Chicken"
    STEAK = 1, "Steak"
    BARBACOA = 2, "Barbacoa"
    CARNITAS = 3, "Carnitas"
    VEGGIE = 4, "Veggie"


class RiceType(GenericEnum):
    NONE = 0, "No Rice"
    WHITE = 1, "White Rice"
    BROWN = 2, "Brown Rice"


class BeanType(GenericEnum):
    NONE = 0, "No Beans"
    PINTO = 1, "Pinto Beans"
    BLACK = 2, "Black Beans"

class SideType(GenericEnum):
    CHIPS = 0, 'chips'
    CHIPS_GUAC = 1, 'chips and quacamole'
    CHIPS_SALSA = 2, "chips and salsa"
    GUAC = 3, "guacamole"
    TORTILLA = 4, "tortilla"

class DrinkType(GenericEnum):
    SODA = 0, 'soda'
    LEMONADE = 1, 'lemonade'
    HIB_LEMONADE = 2, 'hibiscus lemonade'
    MAND_FRESCA = 3, 'mandarin agua fresca'
    BERRY_FRESCA = 4, 'berry agua fresca'
    MEX_COKE = 5, 'mexican coke'
    MEX_SPRITE = 6, 'mexican sprite'


class Options(BinaryList):
    def __init__(self, values=[0]*11):
        super().__init__(values)

    @classmethod
    def items(cls):
        return ['Cheese', 'Queso Blanco', 'Corn Salsa', 'Mild Salsa', 'Medium Green Salsa', 'Hot Red Salsa',
                'Sour Cream', 'Guacamole', 'Fajitas', 'Lettuce', 'Double Wrap']

    @classmethod
    def from_probs(cls, probs, index, row):
        bins = probs[0][index][row]
        return Options(bins)

    def __repr__(self):
        #result = [f"{x[0]('{:.2f}'.format(x[1]))}" for x in zip(Options.items(), self.values)]
        result = [f"{x[0], x[1]}" if x[1] > .8 else "" for x in zip(Options.items(), self.values)]

        return ",".join(result)


class SingleChoice:
    def __init__(self, location: int, item: GenericEnum, max_classes, item_class):
        self.location = location
        self.item = item
        self.max_classes = max_classes
        self.item_class = item_class

    def to_label_text(self, row, label, index):
        label[row, index] = self.location
        label[row, index+1] = int(self.item)
        for x in range(index+2, self.max_classes):
            label[row, x] = -100
        return str(self.item)

    @classmethod
    def from_probs(cls, probs, index, row):
        return cls(SideType.from_probs(probs, index+1, row))

    @staticmethod
    def random_samples(number: int):
        side_type = SideType.random_samples(number)
        return [Side(x) for x in side_type]


class Side:
    def __init__(self, side :GenericEnum = SideType.CHIPS):
        self.side = side

    def to_label_text(self, row, label, index):
        label[row, index] = 1
        label[row, index+1] = int(self.side)
        for x in range(index+2, 5):
            label[row, x] = -100
        return str(self.side)

    @classmethod
    def from_probs(cls, probs, index, row):
        return cls(SideType.from_probs(probs, index+1, row))

    @staticmethod
    def random_samples(number: int):
        side_type = SideType.random_samples(number)
        return [Side(x) for x in side_type]

class Drink:
    def __init__(self, drink :GenericEnum = DrinkType.SODA):
        self.drink = drink

    @classmethod
    def from_probs(cls, probs, index, row):
        return cls(DrinkType.from_probs(probs, index+1, row))

    def to_label_text(self, row, label, index):
        label[row, index] = 2
        label[row, index+1] = int(self.drink)
        for x in range(index+2, 5):
            label[row, x] = -100
        return str(self.drink)

    @staticmethod
    def random_samples(number: int):
        drink_type = DrinkType.random_samples(number)
        return [Drink(x) for x in drink_type]

class Meal:
    def __init__(self,
                 meal: GenericEnum = MealType.BURRITO,
                 meat: GenericEnum = MeatType.CHICKEN,
                 rice: GenericEnum = RiceType.NONE,
                 beans: GenericEnum = BeanType.NONE,
                 options: Options = Options()
                 ):
        self.meal = meal
        self.meat = meat
        self.rice = rice
        self.beans = beans
        self.options = options

    @classmethod
    def from_probs(cls, probs, index, row):
        meal_type = MealType.from_probs(probs, index + 1, row)
        meat_type = MeatType.from_probs(probs, index + 2, row)
        rice_type = RiceType.from_probs(probs, index + 3, row)
        bean_type = BeanType.from_probs(probs, index + 4, row)
        options = Options.from_probs(probs, index +5, row)
        return cls(meal_type, meat_type, rice_type, bean_type, options)

    def to_label_text(self, row, label, index):
        label[row, index] = 0
        label[row, index + 1] = int(self.meal)
        label[row, index + 2] = int(self.meat)
        label[row, index + 3] = int(self.rice)
        label[row, index + 4] = int(self.beans)
        text = [str(self.meal), str(self.meat), str(self.rice), str(self.beans)]
        items = Options.items()
        for i, o in enumerate(self.options.values):
            if o == 1:
                label[row, i + 5] = 1
                text += [items[i]]
        random.shuffle(text)
        return ", ".join(text)


    @staticmethod
    def random_samples(number: int):
        meal_types = MealType.random_samples(number)
        meat_types = MeatType.random_samples(number)
        rice_types = RiceType.random_samples(number)
        bean_types = BeanType.random_samples(number)
        option_labels = Options.random_samples(number)
        return [Meal(*x) for x in zip(meal_types, meat_types, rice_types, bean_types, option_labels)]


class Order:
    def __init__(self, item):
        self.item = item

    @classmethod
    def from_probs_array(cls, probs, index):
        return [cls.from_probs(probs, index, x) for x in range(len(probs[0][index]))]

    @classmethod
    def from_probs(cls, probs, index, row):
        classes = [Meal, Side, Drink]
        class_index = probs[1][index][row]
        results = classes[class_index].from_probs(probs, index, row)
        return results

    def to_label_text(self, row, label, index):
        return self.item.to_label_text(row, label, index)

    @staticmethod
    def random_samples(number: int):
        meal_data = Meal.random_samples(int(15*number/16))
        drink_data = Drink.random_samples(int(number/32))
        side_data = Side.random_samples(int(number/32))
        data = meal_data + drink_data + side_data
        random.shuffle(data)
        return data


