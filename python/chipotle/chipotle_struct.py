
from python.general.general_struct import GenericEnum, GeneralClassifierStruct
from python.general.general_factory import SingleChoice, MultiChoice, BinaryList, Combination, Wrapper

classifier_description = GeneralClassifierStruct([3, 8, 5, 5, 5], 11)


class MealType(GenericEnum):
    BURRITO = 0, "Burrito"
    SOFT_TACOS = 1, "Soft Tacos"
    CRISPY_TACOS = 2, "Crispy Tacos"
    SALAD = 3, "Salad"
    BOWL = 4, "Bowl"

    @staticmethod
    def label():
        return "Meal"


class MeatType(GenericEnum):
    CHICKEN = 0, "Chicken"
    STEAK = 1, "Steak"
    BARBACOA = 2, "Barbacoa"
    CARNITAS = 3, "Carnitas"
    VEGGIE = 4, "Veggie"

    @staticmethod
    def label():
        return "Meat"


class RiceType(GenericEnum):
    NONE = 0, "No Rice"
    WHITE = 1, "White Rice"
    BROWN = 2, "Brown Rice"

    @staticmethod
    def label():
        return "Rice"


class BeanType(GenericEnum):
    NONE = 0, "No Beans"
    PINTO = 1, "Pinto Beans"
    BLACK = 2, "Black Beans"

    @staticmethod
    def label():
        return "Beans"


class SideType(GenericEnum):
    CHIPS = 0, 'chips'
    CHIPS_GUAC = 1, 'chips and quacamole'
    CHIPS_SALSA = 2, "chips and salsa"
    GUAC = 3, "guacamole"
    TORTILLA = 4, "tortilla"


class LemonadeType(GenericEnum):
    NORMAL = 0, 'lemonade'
    HIBISCUS = 1, 'hibiscus lemonade'


class FrescaType(GenericEnum):
    MANDARIN = 0, 'mandarin agua fresca'
    BERRY = 1, 'berry agua fresca'


class CokeType(GenericEnum):
    NORMAL = 0, "coke"
    DIET = 1, 'diet coke'
    MEXICAN = 2, 'mexican coke'


class SodaType(GenericEnum):
    MEDIUM = 0, "medium soda"
    LARGE = 1, 'large soda'


class Soda(Combination):
    location = 0
    classes = [SodaType]

    def __init__(self, soda_type: GenericEnum = SodaType.MEDIUM):
        super().__init__()
        self.typ = soda_type
        self.values = [self.typ]


class Lemonade(Combination):
    classes = [LemonadeType]
    location = 1

    def __init__(self, typ: GenericEnum = LemonadeType.NORMAL):
        super().__init__()
        self.typ = typ
        self.values = [self.typ]


class Fresca(Combination):
    classes = [FrescaType]
    location = 2

    def __init__(self, typ: GenericEnum = FrescaType.MANDARIN):
        super().__init__()
        self.typ = typ

        self.values = [self.typ]


class Coke(Combination):
    classes = [CokeType]
    location = 3

    def __init__(self, soda_type: GenericEnum = CokeType.NORMAL):
        super().__init__()
        self.typ = soda_type
        self.values = [self.typ]


class Sprite(Combination):
    classes = [CokeType]
    location = 4

    def __init__(self, soda_type: GenericEnum = CokeType.NORMAL):
        super().__init__()
        self.typ = soda_type
        self.values = [self.typ]


class Options(BinaryList):
    def __init__(self, values=[0]*11):
        super().__init__(values)


Options.items = ['Cheese', 'Queso Blanco', 'Corn Salsa', 'Mild Salsa', 'Medium Green Salsa', 'Hot Red Salsa',
                'Sour Cream', 'Guacamole', 'Fajitas', 'Lettuce', 'Double Wrap']


class Side(SingleChoice):
    generator = SideType
    location = 1
    max_classes = 5

    def __init__(self, item: GenericEnum):
        super().__init__(item)


class Meal(Combination):
    classes = [MealType, MeatType, RiceType, BeanType, Options]
    location = 0

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

    def __repr__(self):
        def create_options(options):
            text = ""
            for i, x in enumerate(options):
                if i == len(options)-1:
                    text += " and "
                elif i > 0:
                    text += ", "
                text += str(x)
            return text

        total_options = [str(self.rice), str(self.beans)] + [str(x) for x in self.options.selected_items()]
        print(total_options, self.options.values)
        return f"{self.meat} {self.meal} with {create_options(total_options)}"


class Drink(MultiChoice):
    classes = [Soda, Lemonade, Fresca, Coke, Sprite]

    def __init__(self, item):
        self.item = item


class DrinkWrapper(Wrapper):
    group = Drink
    location = 2

    def __init__(self, item):
        self.item = item


class Order(MultiChoice):
    classes = [Meal, Side, DrinkWrapper]
    generate_ratio = [14/16, 1/16, 1/16]

    def __init__(self, item):
        self.item = item







