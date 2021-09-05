/*eslint-disable block-scoped-var, id-length, no-control-regex, no-magic-numbers, no-prototype-builtins, no-redeclare, no-shadow, no-var, sort-vars*/
"use strict";

var $protobuf = require("protobufjs/minimal");

// Common aliases
var $Reader = $protobuf.Reader, $Writer = $protobuf.Writer, $util = $protobuf.util;

// Exported root namespace
var $root = $protobuf.roots["default"] || ($protobuf.roots["default"] = {});

$root.Lemonade = (function() {

    /**
     * Properties of a Lemonade.
     * @exports ILemonade
     * @interface ILemonade
     * @property {Lemonade.LemonadeType|null} [drink] Lemonade drink
     */

    /**
     * Constructs a new Lemonade.
     * @exports Lemonade
     * @classdesc Represents a Lemonade.
     * @implements ILemonade
     * @constructor
     * @param {ILemonade=} [properties] Properties to set
     */
    function Lemonade(properties) {
        if (properties)
            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * Lemonade drink.
     * @member {Lemonade.LemonadeType} drink
     * @memberof Lemonade
     * @instance
     */
    Lemonade.prototype.drink = 0;

    /**
     * Creates a new Lemonade instance using the specified properties.
     * @function create
     * @memberof Lemonade
     * @static
     * @param {ILemonade=} [properties] Properties to set
     * @returns {Lemonade} Lemonade instance
     */
    Lemonade.create = function create(properties) {
        return new Lemonade(properties);
    };

    /**
     * Encodes the specified Lemonade message. Does not implicitly {@link Lemonade.verify|verify} messages.
     * @function encode
     * @memberof Lemonade
     * @static
     * @param {ILemonade} message Lemonade message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    Lemonade.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.drink != null && Object.hasOwnProperty.call(message, "drink"))
            writer.uint32(/* id 1, wireType 0 =*/8).int32(message.drink);
        return writer;
    };

    /**
     * Encodes the specified Lemonade message, length delimited. Does not implicitly {@link Lemonade.verify|verify} messages.
     * @function encodeDelimited
     * @memberof Lemonade
     * @static
     * @param {ILemonade} message Lemonade message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    Lemonade.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a Lemonade message from the specified reader or buffer.
     * @function decode
     * @memberof Lemonade
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {Lemonade} Lemonade
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    Lemonade.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.Lemonade();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
            case 1:
                message.drink = reader.int32();
                break;
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        return message;
    };

    /**
     * Decodes a Lemonade message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof Lemonade
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {Lemonade} Lemonade
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    Lemonade.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a Lemonade message.
     * @function verify
     * @memberof Lemonade
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    Lemonade.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (message.drink != null && message.hasOwnProperty("drink"))
            switch (message.drink) {
            default:
                return "drink: enum value expected";
            case 0:
            case 1:
            case 2:
                break;
            }
        return null;
    };

    /**
     * Creates a Lemonade message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof Lemonade
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {Lemonade} Lemonade
     */
    Lemonade.fromObject = function fromObject(object) {
        if (object instanceof $root.Lemonade)
            return object;
        var message = new $root.Lemonade();
        switch (object.drink) {
        case "UNKNOWN":
        case 0:
            message.drink = 0;
            break;
        case "LEMONADE":
        case 1:
            message.drink = 1;
            break;
        case "HIBISCUS_LEMONADE":
        case 2:
            message.drink = 2;
            break;
        }
        return message;
    };

    /**
     * Creates a plain object from a Lemonade message. Also converts values to other types if specified.
     * @function toObject
     * @memberof Lemonade
     * @static
     * @param {Lemonade} message Lemonade
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    Lemonade.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        var object = {};
        if (options.defaults)
            object.drink = options.enums === String ? "UNKNOWN" : 0;
        if (message.drink != null && message.hasOwnProperty("drink"))
            object.drink = options.enums === String ? $root.Lemonade.LemonadeType[message.drink] : message.drink;
        return object;
    };

    /**
     * Converts this Lemonade to JSON.
     * @function toJSON
     * @memberof Lemonade
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    Lemonade.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    /**
     * LemonadeType enum.
     * @name Lemonade.LemonadeType
     * @enum {number}
     * @property {number} UNKNOWN=0 UNKNOWN value
     * @property {number} LEMONADE=1 LEMONADE value
     * @property {number} HIBISCUS_LEMONADE=2 HIBISCUS_LEMONADE value
     */
    Lemonade.LemonadeType = (function() {
        var valuesById = {}, values = Object.create(valuesById);
        values[valuesById[0] = "UNKNOWN"] = 0;
        values[valuesById[1] = "LEMONADE"] = 1;
        values[valuesById[2] = "HIBISCUS_LEMONADE"] = 2;
        return values;
    })();

    return Lemonade;
})();

$root.Fresca = (function() {

    /**
     * Properties of a Fresca.
     * @exports IFresca
     * @interface IFresca
     * @property {Fresca.FrescaType|null} [drink] Fresca drink
     */

    /**
     * Constructs a new Fresca.
     * @exports Fresca
     * @classdesc Represents a Fresca.
     * @implements IFresca
     * @constructor
     * @param {IFresca=} [properties] Properties to set
     */
    function Fresca(properties) {
        if (properties)
            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * Fresca drink.
     * @member {Fresca.FrescaType} drink
     * @memberof Fresca
     * @instance
     */
    Fresca.prototype.drink = 0;

    /**
     * Creates a new Fresca instance using the specified properties.
     * @function create
     * @memberof Fresca
     * @static
     * @param {IFresca=} [properties] Properties to set
     * @returns {Fresca} Fresca instance
     */
    Fresca.create = function create(properties) {
        return new Fresca(properties);
    };

    /**
     * Encodes the specified Fresca message. Does not implicitly {@link Fresca.verify|verify} messages.
     * @function encode
     * @memberof Fresca
     * @static
     * @param {IFresca} message Fresca message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    Fresca.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.drink != null && Object.hasOwnProperty.call(message, "drink"))
            writer.uint32(/* id 1, wireType 0 =*/8).int32(message.drink);
        return writer;
    };

    /**
     * Encodes the specified Fresca message, length delimited. Does not implicitly {@link Fresca.verify|verify} messages.
     * @function encodeDelimited
     * @memberof Fresca
     * @static
     * @param {IFresca} message Fresca message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    Fresca.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a Fresca message from the specified reader or buffer.
     * @function decode
     * @memberof Fresca
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {Fresca} Fresca
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    Fresca.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.Fresca();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
            case 1:
                message.drink = reader.int32();
                break;
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        return message;
    };

    /**
     * Decodes a Fresca message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof Fresca
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {Fresca} Fresca
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    Fresca.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a Fresca message.
     * @function verify
     * @memberof Fresca
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    Fresca.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (message.drink != null && message.hasOwnProperty("drink"))
            switch (message.drink) {
            default:
                return "drink: enum value expected";
            case 0:
            case 1:
            case 2:
                break;
            }
        return null;
    };

    /**
     * Creates a Fresca message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof Fresca
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {Fresca} Fresca
     */
    Fresca.fromObject = function fromObject(object) {
        if (object instanceof $root.Fresca)
            return object;
        var message = new $root.Fresca();
        switch (object.drink) {
        case "UNKNOWN":
        case 0:
            message.drink = 0;
            break;
        case "MANDARIN_AGUA_FRESCA":
        case 1:
            message.drink = 1;
            break;
        case "BERRY_AGUA_FRESCA":
        case 2:
            message.drink = 2;
            break;
        }
        return message;
    };

    /**
     * Creates a plain object from a Fresca message. Also converts values to other types if specified.
     * @function toObject
     * @memberof Fresca
     * @static
     * @param {Fresca} message Fresca
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    Fresca.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        var object = {};
        if (options.defaults)
            object.drink = options.enums === String ? "UNKNOWN" : 0;
        if (message.drink != null && message.hasOwnProperty("drink"))
            object.drink = options.enums === String ? $root.Fresca.FrescaType[message.drink] : message.drink;
        return object;
    };

    /**
     * Converts this Fresca to JSON.
     * @function toJSON
     * @memberof Fresca
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    Fresca.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    /**
     * FrescaType enum.
     * @name Fresca.FrescaType
     * @enum {number}
     * @property {number} UNKNOWN=0 UNKNOWN value
     * @property {number} MANDARIN_AGUA_FRESCA=1 MANDARIN_AGUA_FRESCA value
     * @property {number} BERRY_AGUA_FRESCA=2 BERRY_AGUA_FRESCA value
     */
    Fresca.FrescaType = (function() {
        var valuesById = {}, values = Object.create(valuesById);
        values[valuesById[0] = "UNKNOWN"] = 0;
        values[valuesById[1] = "MANDARIN_AGUA_FRESCA"] = 1;
        values[valuesById[2] = "BERRY_AGUA_FRESCA"] = 2;
        return values;
    })();

    return Fresca;
})();

$root.Coke = (function() {

    /**
     * Properties of a Coke.
     * @exports ICoke
     * @interface ICoke
     * @property {Coke.CokeType|null} [drink] Coke drink
     */

    /**
     * Constructs a new Coke.
     * @exports Coke
     * @classdesc Represents a Coke.
     * @implements ICoke
     * @constructor
     * @param {ICoke=} [properties] Properties to set
     */
    function Coke(properties) {
        if (properties)
            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * Coke drink.
     * @member {Coke.CokeType} drink
     * @memberof Coke
     * @instance
     */
    Coke.prototype.drink = 0;

    /**
     * Creates a new Coke instance using the specified properties.
     * @function create
     * @memberof Coke
     * @static
     * @param {ICoke=} [properties] Properties to set
     * @returns {Coke} Coke instance
     */
    Coke.create = function create(properties) {
        return new Coke(properties);
    };

    /**
     * Encodes the specified Coke message. Does not implicitly {@link Coke.verify|verify} messages.
     * @function encode
     * @memberof Coke
     * @static
     * @param {ICoke} message Coke message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    Coke.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.drink != null && Object.hasOwnProperty.call(message, "drink"))
            writer.uint32(/* id 1, wireType 0 =*/8).int32(message.drink);
        return writer;
    };

    /**
     * Encodes the specified Coke message, length delimited. Does not implicitly {@link Coke.verify|verify} messages.
     * @function encodeDelimited
     * @memberof Coke
     * @static
     * @param {ICoke} message Coke message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    Coke.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a Coke message from the specified reader or buffer.
     * @function decode
     * @memberof Coke
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {Coke} Coke
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    Coke.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.Coke();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
            case 1:
                message.drink = reader.int32();
                break;
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        return message;
    };

    /**
     * Decodes a Coke message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof Coke
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {Coke} Coke
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    Coke.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a Coke message.
     * @function verify
     * @memberof Coke
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    Coke.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (message.drink != null && message.hasOwnProperty("drink"))
            switch (message.drink) {
            default:
                return "drink: enum value expected";
            case 0:
            case 1:
            case 2:
            case 3:
                break;
            }
        return null;
    };

    /**
     * Creates a Coke message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof Coke
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {Coke} Coke
     */
    Coke.fromObject = function fromObject(object) {
        if (object instanceof $root.Coke)
            return object;
        var message = new $root.Coke();
        switch (object.drink) {
        case "UNKNOWN":
        case 0:
            message.drink = 0;
            break;
        case "COKE":
        case 1:
            message.drink = 1;
            break;
        case "DIET_COKE":
        case 2:
            message.drink = 2;
            break;
        case "MEXICAN_COKE":
        case 3:
            message.drink = 3;
            break;
        }
        return message;
    };

    /**
     * Creates a plain object from a Coke message. Also converts values to other types if specified.
     * @function toObject
     * @memberof Coke
     * @static
     * @param {Coke} message Coke
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    Coke.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        var object = {};
        if (options.defaults)
            object.drink = options.enums === String ? "UNKNOWN" : 0;
        if (message.drink != null && message.hasOwnProperty("drink"))
            object.drink = options.enums === String ? $root.Coke.CokeType[message.drink] : message.drink;
        return object;
    };

    /**
     * Converts this Coke to JSON.
     * @function toJSON
     * @memberof Coke
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    Coke.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    /**
     * CokeType enum.
     * @name Coke.CokeType
     * @enum {number}
     * @property {number} UNKNOWN=0 UNKNOWN value
     * @property {number} COKE=1 COKE value
     * @property {number} DIET_COKE=2 DIET_COKE value
     * @property {number} MEXICAN_COKE=3 MEXICAN_COKE value
     */
    Coke.CokeType = (function() {
        var valuesById = {}, values = Object.create(valuesById);
        values[valuesById[0] = "UNKNOWN"] = 0;
        values[valuesById[1] = "COKE"] = 1;
        values[valuesById[2] = "DIET_COKE"] = 2;
        values[valuesById[3] = "MEXICAN_COKE"] = 3;
        return values;
    })();

    return Coke;
})();

$root.Sprite = (function() {

    /**
     * Properties of a Sprite.
     * @exports ISprite
     * @interface ISprite
     * @property {Sprite.SpriteType|null} [drink] Sprite drink
     */

    /**
     * Constructs a new Sprite.
     * @exports Sprite
     * @classdesc Represents a Sprite.
     * @implements ISprite
     * @constructor
     * @param {ISprite=} [properties] Properties to set
     */
    function Sprite(properties) {
        if (properties)
            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * Sprite drink.
     * @member {Sprite.SpriteType} drink
     * @memberof Sprite
     * @instance
     */
    Sprite.prototype.drink = 0;

    /**
     * Creates a new Sprite instance using the specified properties.
     * @function create
     * @memberof Sprite
     * @static
     * @param {ISprite=} [properties] Properties to set
     * @returns {Sprite} Sprite instance
     */
    Sprite.create = function create(properties) {
        return new Sprite(properties);
    };

    /**
     * Encodes the specified Sprite message. Does not implicitly {@link Sprite.verify|verify} messages.
     * @function encode
     * @memberof Sprite
     * @static
     * @param {ISprite} message Sprite message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    Sprite.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.drink != null && Object.hasOwnProperty.call(message, "drink"))
            writer.uint32(/* id 1, wireType 0 =*/8).int32(message.drink);
        return writer;
    };

    /**
     * Encodes the specified Sprite message, length delimited. Does not implicitly {@link Sprite.verify|verify} messages.
     * @function encodeDelimited
     * @memberof Sprite
     * @static
     * @param {ISprite} message Sprite message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    Sprite.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a Sprite message from the specified reader or buffer.
     * @function decode
     * @memberof Sprite
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {Sprite} Sprite
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    Sprite.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.Sprite();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
            case 1:
                message.drink = reader.int32();
                break;
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        return message;
    };

    /**
     * Decodes a Sprite message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof Sprite
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {Sprite} Sprite
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    Sprite.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a Sprite message.
     * @function verify
     * @memberof Sprite
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    Sprite.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (message.drink != null && message.hasOwnProperty("drink"))
            switch (message.drink) {
            default:
                return "drink: enum value expected";
            case 0:
            case 1:
            case 2:
                break;
            }
        return null;
    };

    /**
     * Creates a Sprite message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof Sprite
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {Sprite} Sprite
     */
    Sprite.fromObject = function fromObject(object) {
        if (object instanceof $root.Sprite)
            return object;
        var message = new $root.Sprite();
        switch (object.drink) {
        case "UNKNOWN":
        case 0:
            message.drink = 0;
            break;
        case "SPRITE":
        case 1:
            message.drink = 1;
            break;
        case "MEXICAN_SPRITE":
        case 2:
            message.drink = 2;
            break;
        }
        return message;
    };

    /**
     * Creates a plain object from a Sprite message. Also converts values to other types if specified.
     * @function toObject
     * @memberof Sprite
     * @static
     * @param {Sprite} message Sprite
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    Sprite.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        var object = {};
        if (options.defaults)
            object.drink = options.enums === String ? "UNKNOWN" : 0;
        if (message.drink != null && message.hasOwnProperty("drink"))
            object.drink = options.enums === String ? $root.Sprite.SpriteType[message.drink] : message.drink;
        return object;
    };

    /**
     * Converts this Sprite to JSON.
     * @function toJSON
     * @memberof Sprite
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    Sprite.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    /**
     * SpriteType enum.
     * @name Sprite.SpriteType
     * @enum {number}
     * @property {number} UNKNOWN=0 UNKNOWN value
     * @property {number} SPRITE=1 SPRITE value
     * @property {number} MEXICAN_SPRITE=2 MEXICAN_SPRITE value
     */
    Sprite.SpriteType = (function() {
        var valuesById = {}, values = Object.create(valuesById);
        values[valuesById[0] = "UNKNOWN"] = 0;
        values[valuesById[1] = "SPRITE"] = 1;
        values[valuesById[2] = "MEXICAN_SPRITE"] = 2;
        return values;
    })();

    return Sprite;
})();

$root.Soda = (function() {

    /**
     * Properties of a Soda.
     * @exports ISoda
     * @interface ISoda
     * @property {Soda.SodaType|null} [drink] Soda drink
     */

    /**
     * Constructs a new Soda.
     * @exports Soda
     * @classdesc Represents a Soda.
     * @implements ISoda
     * @constructor
     * @param {ISoda=} [properties] Properties to set
     */
    function Soda(properties) {
        if (properties)
            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * Soda drink.
     * @member {Soda.SodaType} drink
     * @memberof Soda
     * @instance
     */
    Soda.prototype.drink = 0;

    /**
     * Creates a new Soda instance using the specified properties.
     * @function create
     * @memberof Soda
     * @static
     * @param {ISoda=} [properties] Properties to set
     * @returns {Soda} Soda instance
     */
    Soda.create = function create(properties) {
        return new Soda(properties);
    };

    /**
     * Encodes the specified Soda message. Does not implicitly {@link Soda.verify|verify} messages.
     * @function encode
     * @memberof Soda
     * @static
     * @param {ISoda} message Soda message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    Soda.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.drink != null && Object.hasOwnProperty.call(message, "drink"))
            writer.uint32(/* id 1, wireType 0 =*/8).int32(message.drink);
        return writer;
    };

    /**
     * Encodes the specified Soda message, length delimited. Does not implicitly {@link Soda.verify|verify} messages.
     * @function encodeDelimited
     * @memberof Soda
     * @static
     * @param {ISoda} message Soda message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    Soda.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a Soda message from the specified reader or buffer.
     * @function decode
     * @memberof Soda
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {Soda} Soda
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    Soda.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.Soda();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
            case 1:
                message.drink = reader.int32();
                break;
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        return message;
    };

    /**
     * Decodes a Soda message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof Soda
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {Soda} Soda
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    Soda.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a Soda message.
     * @function verify
     * @memberof Soda
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    Soda.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (message.drink != null && message.hasOwnProperty("drink"))
            switch (message.drink) {
            default:
                return "drink: enum value expected";
            case 0:
            case 1:
            case 2:
                break;
            }
        return null;
    };

    /**
     * Creates a Soda message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof Soda
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {Soda} Soda
     */
    Soda.fromObject = function fromObject(object) {
        if (object instanceof $root.Soda)
            return object;
        var message = new $root.Soda();
        switch (object.drink) {
        case "UNKNOWN":
        case 0:
            message.drink = 0;
            break;
        case "MEDIUM_SODA":
        case 1:
            message.drink = 1;
            break;
        case "LARGE_SODA":
        case 2:
            message.drink = 2;
            break;
        }
        return message;
    };

    /**
     * Creates a plain object from a Soda message. Also converts values to other types if specified.
     * @function toObject
     * @memberof Soda
     * @static
     * @param {Soda} message Soda
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    Soda.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        var object = {};
        if (options.defaults)
            object.drink = options.enums === String ? "UNKNOWN" : 0;
        if (message.drink != null && message.hasOwnProperty("drink"))
            object.drink = options.enums === String ? $root.Soda.SodaType[message.drink] : message.drink;
        return object;
    };

    /**
     * Converts this Soda to JSON.
     * @function toJSON
     * @memberof Soda
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    Soda.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    /**
     * SodaType enum.
     * @name Soda.SodaType
     * @enum {number}
     * @property {number} UNKNOWN=0 UNKNOWN value
     * @property {number} MEDIUM_SODA=1 MEDIUM_SODA value
     * @property {number} LARGE_SODA=2 LARGE_SODA value
     */
    Soda.SodaType = (function() {
        var valuesById = {}, values = Object.create(valuesById);
        values[valuesById[0] = "UNKNOWN"] = 0;
        values[valuesById[1] = "MEDIUM_SODA"] = 1;
        values[valuesById[2] = "LARGE_SODA"] = 2;
        return values;
    })();

    return Soda;
})();

$root.Drink = (function() {

    /**
     * Properties of a Drink.
     * @exports IDrink
     * @interface IDrink
     * @property {ISoda|null} [soda] Drink soda
     * @property {ILemonade|null} [lemonade] Drink lemonade
     * @property {IFresca|null} [fresca] Drink fresca
     * @property {ICoke|null} [coke] Drink coke
     * @property {ISprite|null} [sprite] Drink sprite
     */

    /**
     * Constructs a new Drink.
     * @exports Drink
     * @classdesc Represents a Drink.
     * @implements IDrink
     * @constructor
     * @param {IDrink=} [properties] Properties to set
     */
    function Drink(properties) {
        if (properties)
            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * Drink soda.
     * @member {ISoda|null|undefined} soda
     * @memberof Drink
     * @instance
     */
    Drink.prototype.soda = null;

    /**
     * Drink lemonade.
     * @member {ILemonade|null|undefined} lemonade
     * @memberof Drink
     * @instance
     */
    Drink.prototype.lemonade = null;

    /**
     * Drink fresca.
     * @member {IFresca|null|undefined} fresca
     * @memberof Drink
     * @instance
     */
    Drink.prototype.fresca = null;

    /**
     * Drink coke.
     * @member {ICoke|null|undefined} coke
     * @memberof Drink
     * @instance
     */
    Drink.prototype.coke = null;

    /**
     * Drink sprite.
     * @member {ISprite|null|undefined} sprite
     * @memberof Drink
     * @instance
     */
    Drink.prototype.sprite = null;

    // OneOf field names bound to virtual getters and setters
    var $oneOfFields;

    /**
     * Drink drink.
     * @member {"soda"|"lemonade"|"fresca"|"coke"|"sprite"|undefined} drink
     * @memberof Drink
     * @instance
     */
    Object.defineProperty(Drink.prototype, "drink", {
        get: $util.oneOfGetter($oneOfFields = ["soda", "lemonade", "fresca", "coke", "sprite"]),
        set: $util.oneOfSetter($oneOfFields)
    });

    /**
     * Creates a new Drink instance using the specified properties.
     * @function create
     * @memberof Drink
     * @static
     * @param {IDrink=} [properties] Properties to set
     * @returns {Drink} Drink instance
     */
    Drink.create = function create(properties) {
        return new Drink(properties);
    };

    /**
     * Encodes the specified Drink message. Does not implicitly {@link Drink.verify|verify} messages.
     * @function encode
     * @memberof Drink
     * @static
     * @param {IDrink} message Drink message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    Drink.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.soda != null && Object.hasOwnProperty.call(message, "soda"))
            $root.Soda.encode(message.soda, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
        if (message.lemonade != null && Object.hasOwnProperty.call(message, "lemonade"))
            $root.Lemonade.encode(message.lemonade, writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
        if (message.fresca != null && Object.hasOwnProperty.call(message, "fresca"))
            $root.Fresca.encode(message.fresca, writer.uint32(/* id 3, wireType 2 =*/26).fork()).ldelim();
        if (message.coke != null && Object.hasOwnProperty.call(message, "coke"))
            $root.Coke.encode(message.coke, writer.uint32(/* id 4, wireType 2 =*/34).fork()).ldelim();
        if (message.sprite != null && Object.hasOwnProperty.call(message, "sprite"))
            $root.Sprite.encode(message.sprite, writer.uint32(/* id 5, wireType 2 =*/42).fork()).ldelim();
        return writer;
    };

    /**
     * Encodes the specified Drink message, length delimited. Does not implicitly {@link Drink.verify|verify} messages.
     * @function encodeDelimited
     * @memberof Drink
     * @static
     * @param {IDrink} message Drink message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    Drink.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a Drink message from the specified reader or buffer.
     * @function decode
     * @memberof Drink
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {Drink} Drink
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    Drink.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.Drink();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
            case 1:
                message.soda = $root.Soda.decode(reader, reader.uint32());
                break;
            case 2:
                message.lemonade = $root.Lemonade.decode(reader, reader.uint32());
                break;
            case 3:
                message.fresca = $root.Fresca.decode(reader, reader.uint32());
                break;
            case 4:
                message.coke = $root.Coke.decode(reader, reader.uint32());
                break;
            case 5:
                message.sprite = $root.Sprite.decode(reader, reader.uint32());
                break;
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        return message;
    };

    /**
     * Decodes a Drink message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof Drink
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {Drink} Drink
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    Drink.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a Drink message.
     * @function verify
     * @memberof Drink
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    Drink.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        var properties = {};
        if (message.soda != null && message.hasOwnProperty("soda")) {
            properties.drink = 1;
            {
                var error = $root.Soda.verify(message.soda);
                if (error)
                    return "soda." + error;
            }
        }
        if (message.lemonade != null && message.hasOwnProperty("lemonade")) {
            if (properties.drink === 1)
                return "drink: multiple values";
            properties.drink = 1;
            {
                var error = $root.Lemonade.verify(message.lemonade);
                if (error)
                    return "lemonade." + error;
            }
        }
        if (message.fresca != null && message.hasOwnProperty("fresca")) {
            if (properties.drink === 1)
                return "drink: multiple values";
            properties.drink = 1;
            {
                var error = $root.Fresca.verify(message.fresca);
                if (error)
                    return "fresca." + error;
            }
        }
        if (message.coke != null && message.hasOwnProperty("coke")) {
            if (properties.drink === 1)
                return "drink: multiple values";
            properties.drink = 1;
            {
                var error = $root.Coke.verify(message.coke);
                if (error)
                    return "coke." + error;
            }
        }
        if (message.sprite != null && message.hasOwnProperty("sprite")) {
            if (properties.drink === 1)
                return "drink: multiple values";
            properties.drink = 1;
            {
                var error = $root.Sprite.verify(message.sprite);
                if (error)
                    return "sprite." + error;
            }
        }
        return null;
    };

    /**
     * Creates a Drink message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof Drink
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {Drink} Drink
     */
    Drink.fromObject = function fromObject(object) {
        if (object instanceof $root.Drink)
            return object;
        var message = new $root.Drink();
        if (object.soda != null) {
            if (typeof object.soda !== "object")
                throw TypeError(".Drink.soda: object expected");
            message.soda = $root.Soda.fromObject(object.soda);
        }
        if (object.lemonade != null) {
            if (typeof object.lemonade !== "object")
                throw TypeError(".Drink.lemonade: object expected");
            message.lemonade = $root.Lemonade.fromObject(object.lemonade);
        }
        if (object.fresca != null) {
            if (typeof object.fresca !== "object")
                throw TypeError(".Drink.fresca: object expected");
            message.fresca = $root.Fresca.fromObject(object.fresca);
        }
        if (object.coke != null) {
            if (typeof object.coke !== "object")
                throw TypeError(".Drink.coke: object expected");
            message.coke = $root.Coke.fromObject(object.coke);
        }
        if (object.sprite != null) {
            if (typeof object.sprite !== "object")
                throw TypeError(".Drink.sprite: object expected");
            message.sprite = $root.Sprite.fromObject(object.sprite);
        }
        return message;
    };

    /**
     * Creates a plain object from a Drink message. Also converts values to other types if specified.
     * @function toObject
     * @memberof Drink
     * @static
     * @param {Drink} message Drink
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    Drink.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        var object = {};
        if (message.soda != null && message.hasOwnProperty("soda")) {
            object.soda = $root.Soda.toObject(message.soda, options);
            if (options.oneofs)
                object.drink = "soda";
        }
        if (message.lemonade != null && message.hasOwnProperty("lemonade")) {
            object.lemonade = $root.Lemonade.toObject(message.lemonade, options);
            if (options.oneofs)
                object.drink = "lemonade";
        }
        if (message.fresca != null && message.hasOwnProperty("fresca")) {
            object.fresca = $root.Fresca.toObject(message.fresca, options);
            if (options.oneofs)
                object.drink = "fresca";
        }
        if (message.coke != null && message.hasOwnProperty("coke")) {
            object.coke = $root.Coke.toObject(message.coke, options);
            if (options.oneofs)
                object.drink = "coke";
        }
        if (message.sprite != null && message.hasOwnProperty("sprite")) {
            object.sprite = $root.Sprite.toObject(message.sprite, options);
            if (options.oneofs)
                object.drink = "sprite";
        }
        return object;
    };

    /**
     * Converts this Drink to JSON.
     * @function toJSON
     * @memberof Drink
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    Drink.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return Drink;
})();

$root.Side = (function() {

    /**
     * Properties of a Side.
     * @exports ISide
     * @interface ISide
     * @property {Side.SideType|null} [side] Side side
     */

    /**
     * Constructs a new Side.
     * @exports Side
     * @classdesc Represents a Side.
     * @implements ISide
     * @constructor
     * @param {ISide=} [properties] Properties to set
     */
    function Side(properties) {
        if (properties)
            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * Side side.
     * @member {Side.SideType} side
     * @memberof Side
     * @instance
     */
    Side.prototype.side = 0;

    /**
     * Creates a new Side instance using the specified properties.
     * @function create
     * @memberof Side
     * @static
     * @param {ISide=} [properties] Properties to set
     * @returns {Side} Side instance
     */
    Side.create = function create(properties) {
        return new Side(properties);
    };

    /**
     * Encodes the specified Side message. Does not implicitly {@link Side.verify|verify} messages.
     * @function encode
     * @memberof Side
     * @static
     * @param {ISide} message Side message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    Side.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.side != null && Object.hasOwnProperty.call(message, "side"))
            writer.uint32(/* id 1, wireType 0 =*/8).int32(message.side);
        return writer;
    };

    /**
     * Encodes the specified Side message, length delimited. Does not implicitly {@link Side.verify|verify} messages.
     * @function encodeDelimited
     * @memberof Side
     * @static
     * @param {ISide} message Side message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    Side.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a Side message from the specified reader or buffer.
     * @function decode
     * @memberof Side
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {Side} Side
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    Side.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.Side();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
            case 1:
                message.side = reader.int32();
                break;
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        return message;
    };

    /**
     * Decodes a Side message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof Side
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {Side} Side
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    Side.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a Side message.
     * @function verify
     * @memberof Side
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    Side.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (message.side != null && message.hasOwnProperty("side"))
            switch (message.side) {
            default:
                return "side: enum value expected";
            case 0:
            case 1:
            case 2:
            case 3:
            case 4:
            case 5:
                break;
            }
        return null;
    };

    /**
     * Creates a Side message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof Side
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {Side} Side
     */
    Side.fromObject = function fromObject(object) {
        if (object instanceof $root.Side)
            return object;
        var message = new $root.Side();
        switch (object.side) {
        case "UNKNOWN":
        case 0:
            message.side = 0;
            break;
        case "CHIPS":
        case 1:
            message.side = 1;
            break;
        case "CHIPS_AND_GUACAMOLE":
        case 2:
            message.side = 2;
            break;
        case "CHIPS_AND_SALSA":
        case 3:
            message.side = 3;
            break;
        case "GUACAMOLE":
        case 4:
            message.side = 4;
            break;
        case "TORTILLA":
        case 5:
            message.side = 5;
            break;
        }
        return message;
    };

    /**
     * Creates a plain object from a Side message. Also converts values to other types if specified.
     * @function toObject
     * @memberof Side
     * @static
     * @param {Side} message Side
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    Side.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        var object = {};
        if (options.defaults)
            object.side = options.enums === String ? "UNKNOWN" : 0;
        if (message.side != null && message.hasOwnProperty("side"))
            object.side = options.enums === String ? $root.Side.SideType[message.side] : message.side;
        return object;
    };

    /**
     * Converts this Side to JSON.
     * @function toJSON
     * @memberof Side
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    Side.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    /**
     * SideType enum.
     * @name Side.SideType
     * @enum {number}
     * @property {number} UNKNOWN=0 UNKNOWN value
     * @property {number} CHIPS=1 CHIPS value
     * @property {number} CHIPS_AND_GUACAMOLE=2 CHIPS_AND_GUACAMOLE value
     * @property {number} CHIPS_AND_SALSA=3 CHIPS_AND_SALSA value
     * @property {number} GUACAMOLE=4 GUACAMOLE value
     * @property {number} TORTILLA=5 TORTILLA value
     */
    Side.SideType = (function() {
        var valuesById = {}, values = Object.create(valuesById);
        values[valuesById[0] = "UNKNOWN"] = 0;
        values[valuesById[1] = "CHIPS"] = 1;
        values[valuesById[2] = "CHIPS_AND_GUACAMOLE"] = 2;
        values[valuesById[3] = "CHIPS_AND_SALSA"] = 3;
        values[valuesById[4] = "GUACAMOLE"] = 4;
        values[valuesById[5] = "TORTILLA"] = 5;
        return values;
    })();

    return Side;
})();

$root.Meal = (function() {

    /**
     * Properties of a Meal.
     * @exports IMeal
     * @interface IMeal
     * @property {Meal.MealType|null} [mealType] Meal mealType
     * @property {Meal.MeatType|null} [meatType] Meal meatType
     * @property {Meal.RiceType|null} [riceType] Meal riceType
     * @property {Meal.BeanType|null} [beanType] Meal beanType
     * @property {number|null} [Cheese] Meal Cheese
     * @property {number|null} [QuesoBlanco] Meal QuesoBlanco
     * @property {number|null} [CornSalsa] Meal CornSalsa
     * @property {number|null} [MildSalsa] Meal MildSalsa
     * @property {number|null} [MediumGreenSalsa] Meal MediumGreenSalsa
     * @property {number|null} [HotRedSalsa] Meal HotRedSalsa
     * @property {number|null} [SourCream] Meal SourCream
     * @property {number|null} [Guacamole] Meal Guacamole
     * @property {number|null} [Fajitas] Meal Fajitas
     * @property {number|null} [Lettuce] Meal Lettuce
     * @property {number|null} [DoubleWrap] Meal DoubleWrap
     */

    /**
     * Constructs a new Meal.
     * @exports Meal
     * @classdesc Represents a Meal.
     * @implements IMeal
     * @constructor
     * @param {IMeal=} [properties] Properties to set
     */
    function Meal(properties) {
        if (properties)
            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * Meal mealType.
     * @member {Meal.MealType} mealType
     * @memberof Meal
     * @instance
     */
    Meal.prototype.mealType = 0;

    /**
     * Meal meatType.
     * @member {Meal.MeatType} meatType
     * @memberof Meal
     * @instance
     */
    Meal.prototype.meatType = 0;

    /**
     * Meal riceType.
     * @member {Meal.RiceType} riceType
     * @memberof Meal
     * @instance
     */
    Meal.prototype.riceType = 0;

    /**
     * Meal beanType.
     * @member {Meal.BeanType} beanType
     * @memberof Meal
     * @instance
     */
    Meal.prototype.beanType = 0;

    /**
     * Meal Cheese.
     * @member {number} Cheese
     * @memberof Meal
     * @instance
     */
    Meal.prototype.Cheese = 0;

    /**
     * Meal QuesoBlanco.
     * @member {number} QuesoBlanco
     * @memberof Meal
     * @instance
     */
    Meal.prototype.QuesoBlanco = 0;

    /**
     * Meal CornSalsa.
     * @member {number} CornSalsa
     * @memberof Meal
     * @instance
     */
    Meal.prototype.CornSalsa = 0;

    /**
     * Meal MildSalsa.
     * @member {number} MildSalsa
     * @memberof Meal
     * @instance
     */
    Meal.prototype.MildSalsa = 0;

    /**
     * Meal MediumGreenSalsa.
     * @member {number} MediumGreenSalsa
     * @memberof Meal
     * @instance
     */
    Meal.prototype.MediumGreenSalsa = 0;

    /**
     * Meal HotRedSalsa.
     * @member {number} HotRedSalsa
     * @memberof Meal
     * @instance
     */
    Meal.prototype.HotRedSalsa = 0;

    /**
     * Meal SourCream.
     * @member {number} SourCream
     * @memberof Meal
     * @instance
     */
    Meal.prototype.SourCream = 0;

    /**
     * Meal Guacamole.
     * @member {number} Guacamole
     * @memberof Meal
     * @instance
     */
    Meal.prototype.Guacamole = 0;

    /**
     * Meal Fajitas.
     * @member {number} Fajitas
     * @memberof Meal
     * @instance
     */
    Meal.prototype.Fajitas = 0;

    /**
     * Meal Lettuce.
     * @member {number} Lettuce
     * @memberof Meal
     * @instance
     */
    Meal.prototype.Lettuce = 0;

    /**
     * Meal DoubleWrap.
     * @member {number} DoubleWrap
     * @memberof Meal
     * @instance
     */
    Meal.prototype.DoubleWrap = 0;

    /**
     * Creates a new Meal instance using the specified properties.
     * @function create
     * @memberof Meal
     * @static
     * @param {IMeal=} [properties] Properties to set
     * @returns {Meal} Meal instance
     */
    Meal.create = function create(properties) {
        return new Meal(properties);
    };

    /**
     * Encodes the specified Meal message. Does not implicitly {@link Meal.verify|verify} messages.
     * @function encode
     * @memberof Meal
     * @static
     * @param {IMeal} message Meal message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    Meal.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.mealType != null && Object.hasOwnProperty.call(message, "mealType"))
            writer.uint32(/* id 1, wireType 0 =*/8).int32(message.mealType);
        if (message.meatType != null && Object.hasOwnProperty.call(message, "meatType"))
            writer.uint32(/* id 2, wireType 0 =*/16).int32(message.meatType);
        if (message.riceType != null && Object.hasOwnProperty.call(message, "riceType"))
            writer.uint32(/* id 3, wireType 0 =*/24).int32(message.riceType);
        if (message.beanType != null && Object.hasOwnProperty.call(message, "beanType"))
            writer.uint32(/* id 4, wireType 0 =*/32).int32(message.beanType);
        if (message.Cheese != null && Object.hasOwnProperty.call(message, "Cheese"))
            writer.uint32(/* id 5, wireType 5 =*/45).float(message.Cheese);
        if (message.QuesoBlanco != null && Object.hasOwnProperty.call(message, "QuesoBlanco"))
            writer.uint32(/* id 6, wireType 5 =*/53).float(message.QuesoBlanco);
        if (message.CornSalsa != null && Object.hasOwnProperty.call(message, "CornSalsa"))
            writer.uint32(/* id 7, wireType 5 =*/61).float(message.CornSalsa);
        if (message.MildSalsa != null && Object.hasOwnProperty.call(message, "MildSalsa"))
            writer.uint32(/* id 8, wireType 5 =*/69).float(message.MildSalsa);
        if (message.MediumGreenSalsa != null && Object.hasOwnProperty.call(message, "MediumGreenSalsa"))
            writer.uint32(/* id 9, wireType 5 =*/77).float(message.MediumGreenSalsa);
        if (message.HotRedSalsa != null && Object.hasOwnProperty.call(message, "HotRedSalsa"))
            writer.uint32(/* id 10, wireType 5 =*/85).float(message.HotRedSalsa);
        if (message.SourCream != null && Object.hasOwnProperty.call(message, "SourCream"))
            writer.uint32(/* id 11, wireType 5 =*/93).float(message.SourCream);
        if (message.Guacamole != null && Object.hasOwnProperty.call(message, "Guacamole"))
            writer.uint32(/* id 12, wireType 5 =*/101).float(message.Guacamole);
        if (message.Fajitas != null && Object.hasOwnProperty.call(message, "Fajitas"))
            writer.uint32(/* id 13, wireType 5 =*/109).float(message.Fajitas);
        if (message.Lettuce != null && Object.hasOwnProperty.call(message, "Lettuce"))
            writer.uint32(/* id 14, wireType 5 =*/117).float(message.Lettuce);
        if (message.DoubleWrap != null && Object.hasOwnProperty.call(message, "DoubleWrap"))
            writer.uint32(/* id 15, wireType 5 =*/125).float(message.DoubleWrap);
        return writer;
    };

    /**
     * Encodes the specified Meal message, length delimited. Does not implicitly {@link Meal.verify|verify} messages.
     * @function encodeDelimited
     * @memberof Meal
     * @static
     * @param {IMeal} message Meal message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    Meal.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a Meal message from the specified reader or buffer.
     * @function decode
     * @memberof Meal
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {Meal} Meal
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    Meal.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.Meal();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
            case 1:
                message.mealType = reader.int32();
                break;
            case 2:
                message.meatType = reader.int32();
                break;
            case 3:
                message.riceType = reader.int32();
                break;
            case 4:
                message.beanType = reader.int32();
                break;
            case 5:
                message.Cheese = reader.float();
                break;
            case 6:
                message.QuesoBlanco = reader.float();
                break;
            case 7:
                message.CornSalsa = reader.float();
                break;
            case 8:
                message.MildSalsa = reader.float();
                break;
            case 9:
                message.MediumGreenSalsa = reader.float();
                break;
            case 10:
                message.HotRedSalsa = reader.float();
                break;
            case 11:
                message.SourCream = reader.float();
                break;
            case 12:
                message.Guacamole = reader.float();
                break;
            case 13:
                message.Fajitas = reader.float();
                break;
            case 14:
                message.Lettuce = reader.float();
                break;
            case 15:
                message.DoubleWrap = reader.float();
                break;
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        return message;
    };

    /**
     * Decodes a Meal message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof Meal
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {Meal} Meal
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    Meal.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a Meal message.
     * @function verify
     * @memberof Meal
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    Meal.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (message.mealType != null && message.hasOwnProperty("mealType"))
            switch (message.mealType) {
            default:
                return "mealType: enum value expected";
            case 0:
            case 1:
            case 2:
            case 3:
            case 4:
            case 5:
                break;
            }
        if (message.meatType != null && message.hasOwnProperty("meatType"))
            switch (message.meatType) {
            default:
                return "meatType: enum value expected";
            case 0:
            case 1:
            case 2:
            case 3:
            case 4:
            case 5:
                break;
            }
        if (message.riceType != null && message.hasOwnProperty("riceType"))
            switch (message.riceType) {
            default:
                return "riceType: enum value expected";
            case 0:
            case 1:
            case 2:
            case 3:
                break;
            }
        if (message.beanType != null && message.hasOwnProperty("beanType"))
            switch (message.beanType) {
            default:
                return "beanType: enum value expected";
            case 0:
            case 1:
            case 2:
            case 3:
                break;
            }
        if (message.Cheese != null && message.hasOwnProperty("Cheese"))
            if (typeof message.Cheese !== "number")
                return "Cheese: number expected";
        if (message.QuesoBlanco != null && message.hasOwnProperty("QuesoBlanco"))
            if (typeof message.QuesoBlanco !== "number")
                return "QuesoBlanco: number expected";
        if (message.CornSalsa != null && message.hasOwnProperty("CornSalsa"))
            if (typeof message.CornSalsa !== "number")
                return "CornSalsa: number expected";
        if (message.MildSalsa != null && message.hasOwnProperty("MildSalsa"))
            if (typeof message.MildSalsa !== "number")
                return "MildSalsa: number expected";
        if (message.MediumGreenSalsa != null && message.hasOwnProperty("MediumGreenSalsa"))
            if (typeof message.MediumGreenSalsa !== "number")
                return "MediumGreenSalsa: number expected";
        if (message.HotRedSalsa != null && message.hasOwnProperty("HotRedSalsa"))
            if (typeof message.HotRedSalsa !== "number")
                return "HotRedSalsa: number expected";
        if (message.SourCream != null && message.hasOwnProperty("SourCream"))
            if (typeof message.SourCream !== "number")
                return "SourCream: number expected";
        if (message.Guacamole != null && message.hasOwnProperty("Guacamole"))
            if (typeof message.Guacamole !== "number")
                return "Guacamole: number expected";
        if (message.Fajitas != null && message.hasOwnProperty("Fajitas"))
            if (typeof message.Fajitas !== "number")
                return "Fajitas: number expected";
        if (message.Lettuce != null && message.hasOwnProperty("Lettuce"))
            if (typeof message.Lettuce !== "number")
                return "Lettuce: number expected";
        if (message.DoubleWrap != null && message.hasOwnProperty("DoubleWrap"))
            if (typeof message.DoubleWrap !== "number")
                return "DoubleWrap: number expected";
        return null;
    };

    /**
     * Creates a Meal message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof Meal
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {Meal} Meal
     */
    Meal.fromObject = function fromObject(object) {
        if (object instanceof $root.Meal)
            return object;
        var message = new $root.Meal();
        switch (object.mealType) {
        case "UNKNOWN_MEAL":
        case 0:
            message.mealType = 0;
            break;
        case "BURRITO":
        case 1:
            message.mealType = 1;
            break;
        case "SOFT_TACOS":
        case 2:
            message.mealType = 2;
            break;
        case "CRISPY_TACOS":
        case 3:
            message.mealType = 3;
            break;
        case "SALAD":
        case 4:
            message.mealType = 4;
            break;
        case "BOWL":
        case 5:
            message.mealType = 5;
            break;
        }
        switch (object.meatType) {
        case "UNKNOWN_MEAT":
        case 0:
            message.meatType = 0;
            break;
        case "CHICKEN":
        case 1:
            message.meatType = 1;
            break;
        case "STEAK":
        case 2:
            message.meatType = 2;
            break;
        case "BARBACOA":
        case 3:
            message.meatType = 3;
            break;
        case "CARNITAS":
        case 4:
            message.meatType = 4;
            break;
        case "VEGGIE":
        case 5:
            message.meatType = 5;
            break;
        }
        switch (object.riceType) {
        case "UNKNOWN_RICE":
        case 0:
            message.riceType = 0;
            break;
        case "NO_RICE":
        case 1:
            message.riceType = 1;
            break;
        case "WHITE_RICE":
        case 2:
            message.riceType = 2;
            break;
        case "BROWN_RICE":
        case 3:
            message.riceType = 3;
            break;
        }
        switch (object.beanType) {
        case "UNKNOWN_BEANS":
        case 0:
            message.beanType = 0;
            break;
        case "NO_BEANS":
        case 1:
            message.beanType = 1;
            break;
        case "PINTO_BEANS":
        case 2:
            message.beanType = 2;
            break;
        case "BLACK_BEANS":
        case 3:
            message.beanType = 3;
            break;
        }
        if (object.Cheese != null)
            message.Cheese = Number(object.Cheese);
        if (object.QuesoBlanco != null)
            message.QuesoBlanco = Number(object.QuesoBlanco);
        if (object.CornSalsa != null)
            message.CornSalsa = Number(object.CornSalsa);
        if (object.MildSalsa != null)
            message.MildSalsa = Number(object.MildSalsa);
        if (object.MediumGreenSalsa != null)
            message.MediumGreenSalsa = Number(object.MediumGreenSalsa);
        if (object.HotRedSalsa != null)
            message.HotRedSalsa = Number(object.HotRedSalsa);
        if (object.SourCream != null)
            message.SourCream = Number(object.SourCream);
        if (object.Guacamole != null)
            message.Guacamole = Number(object.Guacamole);
        if (object.Fajitas != null)
            message.Fajitas = Number(object.Fajitas);
        if (object.Lettuce != null)
            message.Lettuce = Number(object.Lettuce);
        if (object.DoubleWrap != null)
            message.DoubleWrap = Number(object.DoubleWrap);
        return message;
    };

    /**
     * Creates a plain object from a Meal message. Also converts values to other types if specified.
     * @function toObject
     * @memberof Meal
     * @static
     * @param {Meal} message Meal
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    Meal.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        var object = {};
        if (options.defaults) {
            object.mealType = options.enums === String ? "UNKNOWN_MEAL" : 0;
            object.meatType = options.enums === String ? "UNKNOWN_MEAT" : 0;
            object.riceType = options.enums === String ? "UNKNOWN_RICE" : 0;
            object.beanType = options.enums === String ? "UNKNOWN_BEANS" : 0;
            object.Cheese = 0;
            object.QuesoBlanco = 0;
            object.CornSalsa = 0;
            object.MildSalsa = 0;
            object.MediumGreenSalsa = 0;
            object.HotRedSalsa = 0;
            object.SourCream = 0;
            object.Guacamole = 0;
            object.Fajitas = 0;
            object.Lettuce = 0;
            object.DoubleWrap = 0;
        }
        if (message.mealType != null && message.hasOwnProperty("mealType"))
            object.mealType = options.enums === String ? $root.Meal.MealType[message.mealType] : message.mealType;
        if (message.meatType != null && message.hasOwnProperty("meatType"))
            object.meatType = options.enums === String ? $root.Meal.MeatType[message.meatType] : message.meatType;
        if (message.riceType != null && message.hasOwnProperty("riceType"))
            object.riceType = options.enums === String ? $root.Meal.RiceType[message.riceType] : message.riceType;
        if (message.beanType != null && message.hasOwnProperty("beanType"))
            object.beanType = options.enums === String ? $root.Meal.BeanType[message.beanType] : message.beanType;
        if (message.Cheese != null && message.hasOwnProperty("Cheese"))
            object.Cheese = options.json && !isFinite(message.Cheese) ? String(message.Cheese) : message.Cheese;
        if (message.QuesoBlanco != null && message.hasOwnProperty("QuesoBlanco"))
            object.QuesoBlanco = options.json && !isFinite(message.QuesoBlanco) ? String(message.QuesoBlanco) : message.QuesoBlanco;
        if (message.CornSalsa != null && message.hasOwnProperty("CornSalsa"))
            object.CornSalsa = options.json && !isFinite(message.CornSalsa) ? String(message.CornSalsa) : message.CornSalsa;
        if (message.MildSalsa != null && message.hasOwnProperty("MildSalsa"))
            object.MildSalsa = options.json && !isFinite(message.MildSalsa) ? String(message.MildSalsa) : message.MildSalsa;
        if (message.MediumGreenSalsa != null && message.hasOwnProperty("MediumGreenSalsa"))
            object.MediumGreenSalsa = options.json && !isFinite(message.MediumGreenSalsa) ? String(message.MediumGreenSalsa) : message.MediumGreenSalsa;
        if (message.HotRedSalsa != null && message.hasOwnProperty("HotRedSalsa"))
            object.HotRedSalsa = options.json && !isFinite(message.HotRedSalsa) ? String(message.HotRedSalsa) : message.HotRedSalsa;
        if (message.SourCream != null && message.hasOwnProperty("SourCream"))
            object.SourCream = options.json && !isFinite(message.SourCream) ? String(message.SourCream) : message.SourCream;
        if (message.Guacamole != null && message.hasOwnProperty("Guacamole"))
            object.Guacamole = options.json && !isFinite(message.Guacamole) ? String(message.Guacamole) : message.Guacamole;
        if (message.Fajitas != null && message.hasOwnProperty("Fajitas"))
            object.Fajitas = options.json && !isFinite(message.Fajitas) ? String(message.Fajitas) : message.Fajitas;
        if (message.Lettuce != null && message.hasOwnProperty("Lettuce"))
            object.Lettuce = options.json && !isFinite(message.Lettuce) ? String(message.Lettuce) : message.Lettuce;
        if (message.DoubleWrap != null && message.hasOwnProperty("DoubleWrap"))
            object.DoubleWrap = options.json && !isFinite(message.DoubleWrap) ? String(message.DoubleWrap) : message.DoubleWrap;
        return object;
    };

    /**
     * Converts this Meal to JSON.
     * @function toJSON
     * @memberof Meal
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    Meal.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    /**
     * MealType enum.
     * @name Meal.MealType
     * @enum {number}
     * @property {number} UNKNOWN_MEAL=0 UNKNOWN_MEAL value
     * @property {number} BURRITO=1 BURRITO value
     * @property {number} SOFT_TACOS=2 SOFT_TACOS value
     * @property {number} CRISPY_TACOS=3 CRISPY_TACOS value
     * @property {number} SALAD=4 SALAD value
     * @property {number} BOWL=5 BOWL value
     */
    Meal.MealType = (function() {
        var valuesById = {}, values = Object.create(valuesById);
        values[valuesById[0] = "UNKNOWN_MEAL"] = 0;
        values[valuesById[1] = "BURRITO"] = 1;
        values[valuesById[2] = "SOFT_TACOS"] = 2;
        values[valuesById[3] = "CRISPY_TACOS"] = 3;
        values[valuesById[4] = "SALAD"] = 4;
        values[valuesById[5] = "BOWL"] = 5;
        return values;
    })();

    /**
     * MeatType enum.
     * @name Meal.MeatType
     * @enum {number}
     * @property {number} UNKNOWN_MEAT=0 UNKNOWN_MEAT value
     * @property {number} CHICKEN=1 CHICKEN value
     * @property {number} STEAK=2 STEAK value
     * @property {number} BARBACOA=3 BARBACOA value
     * @property {number} CARNITAS=4 CARNITAS value
     * @property {number} VEGGIE=5 VEGGIE value
     */
    Meal.MeatType = (function() {
        var valuesById = {}, values = Object.create(valuesById);
        values[valuesById[0] = "UNKNOWN_MEAT"] = 0;
        values[valuesById[1] = "CHICKEN"] = 1;
        values[valuesById[2] = "STEAK"] = 2;
        values[valuesById[3] = "BARBACOA"] = 3;
        values[valuesById[4] = "CARNITAS"] = 4;
        values[valuesById[5] = "VEGGIE"] = 5;
        return values;
    })();

    /**
     * RiceType enum.
     * @name Meal.RiceType
     * @enum {number}
     * @property {number} UNKNOWN_RICE=0 UNKNOWN_RICE value
     * @property {number} NO_RICE=1 NO_RICE value
     * @property {number} WHITE_RICE=2 WHITE_RICE value
     * @property {number} BROWN_RICE=3 BROWN_RICE value
     */
    Meal.RiceType = (function() {
        var valuesById = {}, values = Object.create(valuesById);
        values[valuesById[0] = "UNKNOWN_RICE"] = 0;
        values[valuesById[1] = "NO_RICE"] = 1;
        values[valuesById[2] = "WHITE_RICE"] = 2;
        values[valuesById[3] = "BROWN_RICE"] = 3;
        return values;
    })();

    /**
     * BeanType enum.
     * @name Meal.BeanType
     * @enum {number}
     * @property {number} UNKNOWN_BEANS=0 UNKNOWN_BEANS value
     * @property {number} NO_BEANS=1 NO_BEANS value
     * @property {number} PINTO_BEANS=2 PINTO_BEANS value
     * @property {number} BLACK_BEANS=3 BLACK_BEANS value
     */
    Meal.BeanType = (function() {
        var valuesById = {}, values = Object.create(valuesById);
        values[valuesById[0] = "UNKNOWN_BEANS"] = 0;
        values[valuesById[1] = "NO_BEANS"] = 1;
        values[valuesById[2] = "PINTO_BEANS"] = 2;
        values[valuesById[3] = "BLACK_BEANS"] = 3;
        return values;
    })();

    return Meal;
})();

$root.Order = (function() {

    /**
     * Properties of an Order.
     * @exports IOrder
     * @interface IOrder
     * @property {IMeal|null} [meal] Order meal
     * @property {ISide|null} [side] Order side
     * @property {IDrink|null} [drink] Order drink
     */

    /**
     * Constructs a new Order.
     * @exports Order
     * @classdesc Represents an Order.
     * @implements IOrder
     * @constructor
     * @param {IOrder=} [properties] Properties to set
     */
    function Order(properties) {
        if (properties)
            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * Order meal.
     * @member {IMeal|null|undefined} meal
     * @memberof Order
     * @instance
     */
    Order.prototype.meal = null;

    /**
     * Order side.
     * @member {ISide|null|undefined} side
     * @memberof Order
     * @instance
     */
    Order.prototype.side = null;

    /**
     * Order drink.
     * @member {IDrink|null|undefined} drink
     * @memberof Order
     * @instance
     */
    Order.prototype.drink = null;

    // OneOf field names bound to virtual getters and setters
    var $oneOfFields;

    /**
     * Order order.
     * @member {"meal"|"side"|"drink"|undefined} order
     * @memberof Order
     * @instance
     */
    Object.defineProperty(Order.prototype, "order", {
        get: $util.oneOfGetter($oneOfFields = ["meal", "side", "drink"]),
        set: $util.oneOfSetter($oneOfFields)
    });

    /**
     * Creates a new Order instance using the specified properties.
     * @function create
     * @memberof Order
     * @static
     * @param {IOrder=} [properties] Properties to set
     * @returns {Order} Order instance
     */
    Order.create = function create(properties) {
        return new Order(properties);
    };

    /**
     * Encodes the specified Order message. Does not implicitly {@link Order.verify|verify} messages.
     * @function encode
     * @memberof Order
     * @static
     * @param {IOrder} message Order message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    Order.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.meal != null && Object.hasOwnProperty.call(message, "meal"))
            $root.Meal.encode(message.meal, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
        if (message.side != null && Object.hasOwnProperty.call(message, "side"))
            $root.Side.encode(message.side, writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
        if (message.drink != null && Object.hasOwnProperty.call(message, "drink"))
            $root.Drink.encode(message.drink, writer.uint32(/* id 3, wireType 2 =*/26).fork()).ldelim();
        return writer;
    };

    /**
     * Encodes the specified Order message, length delimited. Does not implicitly {@link Order.verify|verify} messages.
     * @function encodeDelimited
     * @memberof Order
     * @static
     * @param {IOrder} message Order message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    Order.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes an Order message from the specified reader or buffer.
     * @function decode
     * @memberof Order
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {Order} Order
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    Order.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.Order();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
            case 1:
                message.meal = $root.Meal.decode(reader, reader.uint32());
                break;
            case 2:
                message.side = $root.Side.decode(reader, reader.uint32());
                break;
            case 3:
                message.drink = $root.Drink.decode(reader, reader.uint32());
                break;
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        return message;
    };

    /**
     * Decodes an Order message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof Order
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {Order} Order
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    Order.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies an Order message.
     * @function verify
     * @memberof Order
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    Order.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        var properties = {};
        if (message.meal != null && message.hasOwnProperty("meal")) {
            properties.order = 1;
            {
                var error = $root.Meal.verify(message.meal);
                if (error)
                    return "meal." + error;
            }
        }
        if (message.side != null && message.hasOwnProperty("side")) {
            if (properties.order === 1)
                return "order: multiple values";
            properties.order = 1;
            {
                var error = $root.Side.verify(message.side);
                if (error)
                    return "side." + error;
            }
        }
        if (message.drink != null && message.hasOwnProperty("drink")) {
            if (properties.order === 1)
                return "order: multiple values";
            properties.order = 1;
            {
                var error = $root.Drink.verify(message.drink);
                if (error)
                    return "drink." + error;
            }
        }
        return null;
    };

    /**
     * Creates an Order message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof Order
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {Order} Order
     */
    Order.fromObject = function fromObject(object) {
        if (object instanceof $root.Order)
            return object;
        var message = new $root.Order();
        if (object.meal != null) {
            if (typeof object.meal !== "object")
                throw TypeError(".Order.meal: object expected");
            message.meal = $root.Meal.fromObject(object.meal);
        }
        if (object.side != null) {
            if (typeof object.side !== "object")
                throw TypeError(".Order.side: object expected");
            message.side = $root.Side.fromObject(object.side);
        }
        if (object.drink != null) {
            if (typeof object.drink !== "object")
                throw TypeError(".Order.drink: object expected");
            message.drink = $root.Drink.fromObject(object.drink);
        }
        return message;
    };

    /**
     * Creates a plain object from an Order message. Also converts values to other types if specified.
     * @function toObject
     * @memberof Order
     * @static
     * @param {Order} message Order
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    Order.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        var object = {};
        if (message.meal != null && message.hasOwnProperty("meal")) {
            object.meal = $root.Meal.toObject(message.meal, options);
            if (options.oneofs)
                object.order = "meal";
        }
        if (message.side != null && message.hasOwnProperty("side")) {
            object.side = $root.Side.toObject(message.side, options);
            if (options.oneofs)
                object.order = "side";
        }
        if (message.drink != null && message.hasOwnProperty("drink")) {
            object.drink = $root.Drink.toObject(message.drink, options);
            if (options.oneofs)
                object.order = "drink";
        }
        return object;
    };

    /**
     * Converts this Order to JSON.
     * @function toJSON
     * @memberof Order
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    Order.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return Order;
})();

$root.Response = (function() {

    /**
     * Properties of a Response.
     * @exports IResponse
     * @interface IResponse
     * @property {IOrder|null} [order] Response order
     * @property {Response.Action|null} [action] Response action
     * @property {Array.<number>|null} [probabilities] Response probabilities
     */

    /**
     * Constructs a new Response.
     * @exports Response
     * @classdesc Represents a Response.
     * @implements IResponse
     * @constructor
     * @param {IResponse=} [properties] Properties to set
     */
    function Response(properties) {
        this.probabilities = [];
        if (properties)
            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * Response order.
     * @member {IOrder|null|undefined} order
     * @memberof Response
     * @instance
     */
    Response.prototype.order = null;

    /**
     * Response action.
     * @member {Response.Action} action
     * @memberof Response
     * @instance
     */
    Response.prototype.action = 0;

    /**
     * Response probabilities.
     * @member {Array.<number>} probabilities
     * @memberof Response
     * @instance
     */
    Response.prototype.probabilities = $util.emptyArray;

    /**
     * Creates a new Response instance using the specified properties.
     * @function create
     * @memberof Response
     * @static
     * @param {IResponse=} [properties] Properties to set
     * @returns {Response} Response instance
     */
    Response.create = function create(properties) {
        return new Response(properties);
    };

    /**
     * Encodes the specified Response message. Does not implicitly {@link Response.verify|verify} messages.
     * @function encode
     * @memberof Response
     * @static
     * @param {IResponse} message Response message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    Response.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.order != null && Object.hasOwnProperty.call(message, "order"))
            $root.Order.encode(message.order, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
        if (message.action != null && Object.hasOwnProperty.call(message, "action"))
            writer.uint32(/* id 2, wireType 0 =*/16).int32(message.action);
        if (message.probabilities != null && message.probabilities.length) {
            writer.uint32(/* id 3, wireType 2 =*/26).fork();
            for (var i = 0; i < message.probabilities.length; ++i)
                writer.float(message.probabilities[i]);
            writer.ldelim();
        }
        return writer;
    };

    /**
     * Encodes the specified Response message, length delimited. Does not implicitly {@link Response.verify|verify} messages.
     * @function encodeDelimited
     * @memberof Response
     * @static
     * @param {IResponse} message Response message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    Response.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a Response message from the specified reader or buffer.
     * @function decode
     * @memberof Response
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {Response} Response
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    Response.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.Response();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
            case 1:
                message.order = $root.Order.decode(reader, reader.uint32());
                break;
            case 2:
                message.action = reader.int32();
                break;
            case 3:
                if (!(message.probabilities && message.probabilities.length))
                    message.probabilities = [];
                if ((tag & 7) === 2) {
                    var end2 = reader.uint32() + reader.pos;
                    while (reader.pos < end2)
                        message.probabilities.push(reader.float());
                } else
                    message.probabilities.push(reader.float());
                break;
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        return message;
    };

    /**
     * Decodes a Response message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof Response
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {Response} Response
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    Response.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a Response message.
     * @function verify
     * @memberof Response
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    Response.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (message.order != null && message.hasOwnProperty("order")) {
            var error = $root.Order.verify(message.order);
            if (error)
                return "order." + error;
        }
        if (message.action != null && message.hasOwnProperty("action"))
            switch (message.action) {
            default:
                return "action: enum value expected";
            case 0:
            case 1:
            case 2:
            case 3:
            case 4:
            case 5:
            case 6:
                break;
            }
        if (message.probabilities != null && message.hasOwnProperty("probabilities")) {
            if (!Array.isArray(message.probabilities))
                return "probabilities: array expected";
            for (var i = 0; i < message.probabilities.length; ++i)
                if (typeof message.probabilities[i] !== "number")
                    return "probabilities: number[] expected";
        }
        return null;
    };

    /**
     * Creates a Response message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof Response
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {Response} Response
     */
    Response.fromObject = function fromObject(object) {
        if (object instanceof $root.Response)
            return object;
        var message = new $root.Response();
        if (object.order != null) {
            if (typeof object.order !== "object")
                throw TypeError(".Response.order: object expected");
            message.order = $root.Order.fromObject(object.order);
        }
        switch (object.action) {
        case "UNKNOWN":
        case 0:
            message.action = 0;
            break;
        case "VIEW":
        case 1:
            message.action = 1;
            break;
        case "CLEAR":
        case 2:
            message.action = 2;
            break;
        case "AFFIRM":
        case 3:
            message.action = 3;
            break;
        case "DENY":
        case 4:
            message.action = 4;
            break;
        case "ORDER":
        case 5:
            message.action = 5;
            break;
        case "REMOVE":
        case 6:
            message.action = 6;
            break;
        }
        if (object.probabilities) {
            if (!Array.isArray(object.probabilities))
                throw TypeError(".Response.probabilities: array expected");
            message.probabilities = [];
            for (var i = 0; i < object.probabilities.length; ++i)
                message.probabilities[i] = Number(object.probabilities[i]);
        }
        return message;
    };

    /**
     * Creates a plain object from a Response message. Also converts values to other types if specified.
     * @function toObject
     * @memberof Response
     * @static
     * @param {Response} message Response
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    Response.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        var object = {};
        if (options.arrays || options.defaults)
            object.probabilities = [];
        if (options.defaults) {
            object.order = null;
            object.action = options.enums === String ? "UNKNOWN" : 0;
        }
        if (message.order != null && message.hasOwnProperty("order"))
            object.order = $root.Order.toObject(message.order, options);
        if (message.action != null && message.hasOwnProperty("action"))
            object.action = options.enums === String ? $root.Response.Action[message.action] : message.action;
        if (message.probabilities && message.probabilities.length) {
            object.probabilities = [];
            for (var j = 0; j < message.probabilities.length; ++j)
                object.probabilities[j] = options.json && !isFinite(message.probabilities[j]) ? String(message.probabilities[j]) : message.probabilities[j];
        }
        return object;
    };

    /**
     * Converts this Response to JSON.
     * @function toJSON
     * @memberof Response
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    Response.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    /**
     * Action enum.
     * @name Response.Action
     * @enum {number}
     * @property {number} UNKNOWN=0 UNKNOWN value
     * @property {number} VIEW=1 VIEW value
     * @property {number} CLEAR=2 CLEAR value
     * @property {number} AFFIRM=3 AFFIRM value
     * @property {number} DENY=4 DENY value
     * @property {number} ORDER=5 ORDER value
     * @property {number} REMOVE=6 REMOVE value
     */
    Response.Action = (function() {
        var valuesById = {}, values = Object.create(valuesById);
        values[valuesById[0] = "UNKNOWN"] = 0;
        values[valuesById[1] = "VIEW"] = 1;
        values[valuesById[2] = "CLEAR"] = 2;
        values[valuesById[3] = "AFFIRM"] = 3;
        values[valuesById[4] = "DENY"] = 4;
        values[valuesById[5] = "ORDER"] = 5;
        values[valuesById[6] = "REMOVE"] = 6;
        return values;
    })();

    return Response;
})();

module.exports = $root;
