import * as $protobuf from "protobufjs";
/** Properties of a Lemonade. */
export interface ILemonade {

    /** Lemonade drink */
    drink?: (Lemonade.LemonadeType|null);
}

/** Represents a Lemonade. */
export class Lemonade implements ILemonade {

    /**
     * Constructs a new Lemonade.
     * @param [properties] Properties to set
     */
    constructor(properties?: ILemonade);

    /** Lemonade drink. */
    public drink: Lemonade.LemonadeType;

    /**
     * Creates a new Lemonade instance using the specified properties.
     * @param [properties] Properties to set
     * @returns Lemonade instance
     */
    public static create(properties?: ILemonade): Lemonade;

    /**
     * Encodes the specified Lemonade message. Does not implicitly {@link Lemonade.verify|verify} messages.
     * @param message Lemonade message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: ILemonade, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified Lemonade message, length delimited. Does not implicitly {@link Lemonade.verify|verify} messages.
     * @param message Lemonade message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: ILemonade, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a Lemonade message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns Lemonade
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): Lemonade;

    /**
     * Decodes a Lemonade message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns Lemonade
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): Lemonade;

    /**
     * Verifies a Lemonade message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a Lemonade message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns Lemonade
     */
    public static fromObject(object: { [k: string]: any }): Lemonade;

    /**
     * Creates a plain object from a Lemonade message. Also converts values to other types if specified.
     * @param message Lemonade
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: Lemonade, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this Lemonade to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };
}

export namespace Lemonade {

    /** LemonadeType enum. */
    enum LemonadeType {
        UNKNOWN = 0,
        LEMONADE = 1,
        HIBISCUS_LEMONADE = 2
    }
}

/** Properties of a Fresca. */
export interface IFresca {

    /** Fresca drink */
    drink?: (Fresca.FrescaType|null);
}

/** Represents a Fresca. */
export class Fresca implements IFresca {

    /**
     * Constructs a new Fresca.
     * @param [properties] Properties to set
     */
    constructor(properties?: IFresca);

    /** Fresca drink. */
    public drink: Fresca.FrescaType;

    /**
     * Creates a new Fresca instance using the specified properties.
     * @param [properties] Properties to set
     * @returns Fresca instance
     */
    public static create(properties?: IFresca): Fresca;

    /**
     * Encodes the specified Fresca message. Does not implicitly {@link Fresca.verify|verify} messages.
     * @param message Fresca message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: IFresca, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified Fresca message, length delimited. Does not implicitly {@link Fresca.verify|verify} messages.
     * @param message Fresca message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: IFresca, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a Fresca message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns Fresca
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): Fresca;

    /**
     * Decodes a Fresca message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns Fresca
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): Fresca;

    /**
     * Verifies a Fresca message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a Fresca message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns Fresca
     */
    public static fromObject(object: { [k: string]: any }): Fresca;

    /**
     * Creates a plain object from a Fresca message. Also converts values to other types if specified.
     * @param message Fresca
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: Fresca, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this Fresca to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };
}

export namespace Fresca {

    /** FrescaType enum. */
    enum FrescaType {
        UNKNOWN = 0,
        MANDARIN_AGUA_FRESCA = 1,
        BERRY_AGUA_FRESCA = 2
    }
}

/** Properties of a Coke. */
export interface ICoke {

    /** Coke drink */
    drink?: (Coke.CokeType|null);
}

/** Represents a Coke. */
export class Coke implements ICoke {

    /**
     * Constructs a new Coke.
     * @param [properties] Properties to set
     */
    constructor(properties?: ICoke);

    /** Coke drink. */
    public drink: Coke.CokeType;

    /**
     * Creates a new Coke instance using the specified properties.
     * @param [properties] Properties to set
     * @returns Coke instance
     */
    public static create(properties?: ICoke): Coke;

    /**
     * Encodes the specified Coke message. Does not implicitly {@link Coke.verify|verify} messages.
     * @param message Coke message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: ICoke, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified Coke message, length delimited. Does not implicitly {@link Coke.verify|verify} messages.
     * @param message Coke message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: ICoke, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a Coke message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns Coke
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): Coke;

    /**
     * Decodes a Coke message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns Coke
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): Coke;

    /**
     * Verifies a Coke message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a Coke message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns Coke
     */
    public static fromObject(object: { [k: string]: any }): Coke;

    /**
     * Creates a plain object from a Coke message. Also converts values to other types if specified.
     * @param message Coke
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: Coke, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this Coke to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };
}

export namespace Coke {

    /** CokeType enum. */
    enum CokeType {
        UNKNOWN = 0,
        COKE = 1,
        DIET_COKE = 2,
        MEXICAN_COKE = 3
    }
}

/** Properties of a Sprite. */
export interface ISprite {

    /** Sprite drink */
    drink?: (Sprite.SpriteType|null);
}

/** Represents a Sprite. */
export class Sprite implements ISprite {

    /**
     * Constructs a new Sprite.
     * @param [properties] Properties to set
     */
    constructor(properties?: ISprite);

    /** Sprite drink. */
    public drink: Sprite.SpriteType;

    /**
     * Creates a new Sprite instance using the specified properties.
     * @param [properties] Properties to set
     * @returns Sprite instance
     */
    public static create(properties?: ISprite): Sprite;

    /**
     * Encodes the specified Sprite message. Does not implicitly {@link Sprite.verify|verify} messages.
     * @param message Sprite message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: ISprite, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified Sprite message, length delimited. Does not implicitly {@link Sprite.verify|verify} messages.
     * @param message Sprite message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: ISprite, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a Sprite message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns Sprite
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): Sprite;

    /**
     * Decodes a Sprite message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns Sprite
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): Sprite;

    /**
     * Verifies a Sprite message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a Sprite message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns Sprite
     */
    public static fromObject(object: { [k: string]: any }): Sprite;

    /**
     * Creates a plain object from a Sprite message. Also converts values to other types if specified.
     * @param message Sprite
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: Sprite, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this Sprite to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };
}

export namespace Sprite {

    /** SpriteType enum. */
    enum SpriteType {
        UNKNOWN = 0,
        SPRITE = 1,
        MEXICAN_SPRITE = 2
    }
}

/** Properties of a Soda. */
export interface ISoda {

    /** Soda drink */
    drink?: (Soda.SodaType|null);
}

/** Represents a Soda. */
export class Soda implements ISoda {

    /**
     * Constructs a new Soda.
     * @param [properties] Properties to set
     */
    constructor(properties?: ISoda);

    /** Soda drink. */
    public drink: Soda.SodaType;

    /**
     * Creates a new Soda instance using the specified properties.
     * @param [properties] Properties to set
     * @returns Soda instance
     */
    public static create(properties?: ISoda): Soda;

    /**
     * Encodes the specified Soda message. Does not implicitly {@link Soda.verify|verify} messages.
     * @param message Soda message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: ISoda, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified Soda message, length delimited. Does not implicitly {@link Soda.verify|verify} messages.
     * @param message Soda message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: ISoda, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a Soda message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns Soda
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): Soda;

    /**
     * Decodes a Soda message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns Soda
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): Soda;

    /**
     * Verifies a Soda message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a Soda message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns Soda
     */
    public static fromObject(object: { [k: string]: any }): Soda;

    /**
     * Creates a plain object from a Soda message. Also converts values to other types if specified.
     * @param message Soda
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: Soda, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this Soda to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };
}

export namespace Soda {

    /** SodaType enum. */
    enum SodaType {
        UNKNOWN = 0,
        MEDIUM_SODA = 1,
        LARGE_SODA = 2
    }
}

/** Properties of a Drink. */
export interface IDrink {

    /** Drink soda */
    soda?: (ISoda|null);

    /** Drink lemonade */
    lemonade?: (ILemonade|null);

    /** Drink fresca */
    fresca?: (IFresca|null);

    /** Drink coke */
    coke?: (ICoke|null);

    /** Drink sprite */
    sprite?: (ISprite|null);
}

/** Represents a Drink. */
export class Drink implements IDrink {

    /**
     * Constructs a new Drink.
     * @param [properties] Properties to set
     */
    constructor(properties?: IDrink);

    /** Drink soda. */
    public soda?: (ISoda|null);

    /** Drink lemonade. */
    public lemonade?: (ILemonade|null);

    /** Drink fresca. */
    public fresca?: (IFresca|null);

    /** Drink coke. */
    public coke?: (ICoke|null);

    /** Drink sprite. */
    public sprite?: (ISprite|null);

    /** Drink drink. */
    public drink?: ("soda"|"lemonade"|"fresca"|"coke"|"sprite");

    /**
     * Creates a new Drink instance using the specified properties.
     * @param [properties] Properties to set
     * @returns Drink instance
     */
    public static create(properties?: IDrink): Drink;

    /**
     * Encodes the specified Drink message. Does not implicitly {@link Drink.verify|verify} messages.
     * @param message Drink message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: IDrink, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified Drink message, length delimited. Does not implicitly {@link Drink.verify|verify} messages.
     * @param message Drink message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: IDrink, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a Drink message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns Drink
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): Drink;

    /**
     * Decodes a Drink message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns Drink
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): Drink;

    /**
     * Verifies a Drink message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a Drink message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns Drink
     */
    public static fromObject(object: { [k: string]: any }): Drink;

    /**
     * Creates a plain object from a Drink message. Also converts values to other types if specified.
     * @param message Drink
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: Drink, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this Drink to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };
}

/** Properties of a Side. */
export interface ISide {

    /** Side side */
    side?: (Side.SideType|null);
}

/** Represents a Side. */
export class Side implements ISide {

    /**
     * Constructs a new Side.
     * @param [properties] Properties to set
     */
    constructor(properties?: ISide);

    /** Side side. */
    public side: Side.SideType;

    /**
     * Creates a new Side instance using the specified properties.
     * @param [properties] Properties to set
     * @returns Side instance
     */
    public static create(properties?: ISide): Side;

    /**
     * Encodes the specified Side message. Does not implicitly {@link Side.verify|verify} messages.
     * @param message Side message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: ISide, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified Side message, length delimited. Does not implicitly {@link Side.verify|verify} messages.
     * @param message Side message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: ISide, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a Side message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns Side
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): Side;

    /**
     * Decodes a Side message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns Side
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): Side;

    /**
     * Verifies a Side message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a Side message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns Side
     */
    public static fromObject(object: { [k: string]: any }): Side;

    /**
     * Creates a plain object from a Side message. Also converts values to other types if specified.
     * @param message Side
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: Side, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this Side to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };
}

export namespace Side {

    /** SideType enum. */
    enum SideType {
        UNKNOWN = 0,
        CHIPS = 1,
        CHIPS_AND_GUACAMOLE = 2,
        CHIPS_AND_SALSA = 3,
        GUACAMOLE = 4,
        TORTILLA = 5
    }
}

/** Properties of a Meal. */
export interface IMeal {

    /** Meal mealType */
    mealType?: (Meal.MealType|null);

    /** Meal meatType */
    meatType?: (Meal.MeatType|null);

    /** Meal riceType */
    riceType?: (Meal.RiceType|null);

    /** Meal beanType */
    beanType?: (Meal.BeanType|null);

    /** Meal Cheese */
    Cheese?: (number|null);

    /** Meal QuesoBlanco */
    QuesoBlanco?: (number|null);

    /** Meal CornSalsa */
    CornSalsa?: (number|null);

    /** Meal MildSalsa */
    MildSalsa?: (number|null);

    /** Meal MediumGreenSalsa */
    MediumGreenSalsa?: (number|null);

    /** Meal HotRedSalsa */
    HotRedSalsa?: (number|null);

    /** Meal SourCream */
    SourCream?: (number|null);

    /** Meal Guacamole */
    Guacamole?: (number|null);

    /** Meal Fajitas */
    Fajitas?: (number|null);

    /** Meal Lettuce */
    Lettuce?: (number|null);

    /** Meal DoubleWrap */
    DoubleWrap?: (number|null);
}

/** Represents a Meal. */
export class Meal implements IMeal {

    /**
     * Constructs a new Meal.
     * @param [properties] Properties to set
     */
    constructor(properties?: IMeal);

    /** Meal mealType. */
    public mealType: Meal.MealType;

    /** Meal meatType. */
    public meatType: Meal.MeatType;

    /** Meal riceType. */
    public riceType: Meal.RiceType;

    /** Meal beanType. */
    public beanType: Meal.BeanType;

    /** Meal Cheese. */
    public Cheese: number;

    /** Meal QuesoBlanco. */
    public QuesoBlanco: number;

    /** Meal CornSalsa. */
    public CornSalsa: number;

    /** Meal MildSalsa. */
    public MildSalsa: number;

    /** Meal MediumGreenSalsa. */
    public MediumGreenSalsa: number;

    /** Meal HotRedSalsa. */
    public HotRedSalsa: number;

    /** Meal SourCream. */
    public SourCream: number;

    /** Meal Guacamole. */
    public Guacamole: number;

    /** Meal Fajitas. */
    public Fajitas: number;

    /** Meal Lettuce. */
    public Lettuce: number;

    /** Meal DoubleWrap. */
    public DoubleWrap: number;

    /**
     * Creates a new Meal instance using the specified properties.
     * @param [properties] Properties to set
     * @returns Meal instance
     */
    public static create(properties?: IMeal): Meal;

    /**
     * Encodes the specified Meal message. Does not implicitly {@link Meal.verify|verify} messages.
     * @param message Meal message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: IMeal, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified Meal message, length delimited. Does not implicitly {@link Meal.verify|verify} messages.
     * @param message Meal message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: IMeal, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a Meal message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns Meal
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): Meal;

    /**
     * Decodes a Meal message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns Meal
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): Meal;

    /**
     * Verifies a Meal message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a Meal message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns Meal
     */
    public static fromObject(object: { [k: string]: any }): Meal;

    /**
     * Creates a plain object from a Meal message. Also converts values to other types if specified.
     * @param message Meal
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: Meal, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this Meal to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };
}

export namespace Meal {

    /** MealType enum. */
    enum MealType {
        UNKNOWN_MEAL = 0,
        BURRITO = 1,
        SOFT_TACOS = 2,
        CRISPY_TACOS = 3,
        SALAD = 4,
        BOWL = 5
    }

    /** MeatType enum. */
    enum MeatType {
        UNKNOWN_MEAT = 0,
        CHICKEN = 1,
        STEAK = 2,
        BARBACOA = 3,
        CARNITAS = 4,
        VEGGIE = 5
    }

    /** RiceType enum. */
    enum RiceType {
        UNKNOWN_RICE = 0,
        NO_RICE = 1,
        WHITE_RICE = 2,
        BROWN_RICE = 3
    }

    /** BeanType enum. */
    enum BeanType {
        UNKNOWN_BEANS = 0,
        NO_BEANS = 1,
        PINTO_BEANS = 2,
        BLACK_BEANS = 3
    }
}

/** Properties of an Order. */
export interface IOrder {

    /** Order meal */
    meal?: (IMeal|null);

    /** Order side */
    side?: (ISide|null);

    /** Order drink */
    drink?: (IDrink|null);
}

/** Represents an Order. */
export class Order implements IOrder {

    /**
     * Constructs a new Order.
     * @param [properties] Properties to set
     */
    constructor(properties?: IOrder);

    /** Order meal. */
    public meal?: (IMeal|null);

    /** Order side. */
    public side?: (ISide|null);

    /** Order drink. */
    public drink?: (IDrink|null);

    /** Order order. */
    public order?: ("meal"|"side"|"drink");

    /**
     * Creates a new Order instance using the specified properties.
     * @param [properties] Properties to set
     * @returns Order instance
     */
    public static create(properties?: IOrder): Order;

    /**
     * Encodes the specified Order message. Does not implicitly {@link Order.verify|verify} messages.
     * @param message Order message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: IOrder, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified Order message, length delimited. Does not implicitly {@link Order.verify|verify} messages.
     * @param message Order message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: IOrder, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes an Order message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns Order
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): Order;

    /**
     * Decodes an Order message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns Order
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): Order;

    /**
     * Verifies an Order message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates an Order message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns Order
     */
    public static fromObject(object: { [k: string]: any }): Order;

    /**
     * Creates a plain object from an Order message. Also converts values to other types if specified.
     * @param message Order
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: Order, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this Order to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };
}

/** Properties of a Response. */
export interface IResponse {

    /** Response order */
    order?: (IOrder|null);

    /** Response action */
    action?: (Response.Action|null);

    /** Response probabilities */
    probabilities?: (number[]|null);
}

/** Represents a Response. */
export class Response implements IResponse {

    /**
     * Constructs a new Response.
     * @param [properties] Properties to set
     */
    constructor(properties?: IResponse);

    /** Response order. */
    public order?: (IOrder|null);

    /** Response action. */
    public action: Response.Action;

    /** Response probabilities. */
    public probabilities: number[];

    /**
     * Creates a new Response instance using the specified properties.
     * @param [properties] Properties to set
     * @returns Response instance
     */
    public static create(properties?: IResponse): Response;

    /**
     * Encodes the specified Response message. Does not implicitly {@link Response.verify|verify} messages.
     * @param message Response message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: IResponse, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified Response message, length delimited. Does not implicitly {@link Response.verify|verify} messages.
     * @param message Response message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: IResponse, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a Response message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns Response
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): Response;

    /**
     * Decodes a Response message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns Response
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): Response;

    /**
     * Verifies a Response message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a Response message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns Response
     */
    public static fromObject(object: { [k: string]: any }): Response;

    /**
     * Creates a plain object from a Response message. Also converts values to other types if specified.
     * @param message Response
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: Response, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this Response to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };
}

export namespace Response {

    /** Action enum. */
    enum Action {
        UNKNOWN = 0,
        VIEW = 1,
        CLEAR = 2,
        AFFIRM = 3,
        DENY = 4,
        ORDER = 5,
        REMOVE = 6
    }
}
