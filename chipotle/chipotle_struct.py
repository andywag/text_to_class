
from general_struct import GenericEnum
from general_factory import SingleChoice, MultiChoice, BinaryList, Combination


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


Options.items = ['Cheese', 'Queso Blanco', 'Corn Salsa', 'Mild Salsa', 'Medium Green Salsa', 'Hot Red Salsa',
                'Sour Cream', 'Guacamole', 'Fajitas', 'Lettuce', 'Double Wrap']


class Side(SingleChoice):
    def __init__(self, item: GenericEnum):
        super().__init__(item)


Side.generator = SideType
Side.location = 1
Side.max_classes = 5


class Drink(SingleChoice):
    def __init__(self, item: GenericEnum):
        super().__init__(item)


Drink.generator = DrinkType
Drink.location = 2
Drink.max_classes = 5


class Meal(Combination):
    def __init__(self,
                 meal: GenericEnum = MealType.BURRITO,
                 meat: GenericEnum = MeatType.CHICKEN,
                 rice: GenericEnum = RiceType.NONE,
                 beans: GenericEnum = BeanType.NONE,
                 options: Options = Options()
                 ):
        super().__init__()
        self.meal = meal
        self.meat = meat
        self.rice = rice
        self.beans = beans
        self.options = options
        self.values = [self.meal, self.meat, self.rice, self.beans, self.options]


Meal.classes = [MealType, MeatType, RiceType, BeanType, Options]


class Order(MultiChoice):
    def __init__(self, item):
        self.item = item


Order.classes = [Meal, Side, Drink]
Order.generate_ratio = [14/16, 1/16, 1/16]



