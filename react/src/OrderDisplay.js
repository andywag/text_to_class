
var protos = require("./model.js")


function getLeafText(leafNodes, obj){
    if (obj) {
        if (typeof obj === "string" || obj instanceof String) {
            leafNodes.push(obj);
        }
        else {
            Object.values(obj).forEach(val => getLeafText(leafNodes, val));
        }
    }
}

function convertVariableName(v) {
    let result = v.replace("_", " ").toLowerCase();
    return result;
}

function singleTextItem(order) {
    let leafNodes = []
    let text = getLeafText(leafNodes, order.toJSON());
    let newNodes = leafNodes.map(x => convertVariableName(x));
    return newNodes;
}

function getFloatText(leafNodes, key, value){
    if (value) {
        if (typeof value === "number") {
            if (value > .8) {
                leafNodes.push(key);
            }
        }
        else if (typeof value === "string" || value instanceof String) {

        }
        else {
            Object.keys(value).forEach(k => getFloatText(leafNodes, k, value[k]));
        }
    }
}

function getFloatItems(order) {
    let leafNodes = []
    getFloatText(leafNodes, "", order.toJSON());
    let newNodes = leafNodes.map(x => convertVariableName(x));
    return newNodes;
}

function orderToString(order) {
    if (order.hasOwnProperty("meal")) {
        let items = singleTextItem(order);
        let new_items = getFloatItems(order);
        items = items.concat(new_items);
        //console.log("Items", items, new_items);
        return items.join();
    }
    else if (order.hasOwnProperty("drink")) {
        return singleTextItem(order)[0];
    }
    else if (order.hasOwnProperty("side")) {
        return singleTextItem(order)[0];
    }
}

function copy(aObject) {
    if (!aObject) {
        return aObject;
    }

    let v;
    let bObject = Array.isArray(aObject) ? [] : {};
    for (const k in aObject) {
        v = aObject[k];
        bObject[k] = (typeof v === "object") ? copy(v) : v;
    }

    return bObject;
}

function orderMissing(order) {

    let createChoices = (x, order, type, index) => {
        let new_order = copy(order); //JSON.parse(JSON.stringify(order));
        new_order.meal[type] = index;
        console.log("Create Choice", new_order)
        return {title:x, result:new_order};
    }

    let handleType = (order, type, typeString, title) => {
        if (!order.meal.hasOwnProperty(typeString) || order.meal[typeString] == 0) {
            console.log("Prototypes", Object.keys(type));
            let types = Object.keys(type);
            let choices = types.slice(1).map( (x,i) => createChoices(x, order, typeString, i + 1))
            return {type:typeString, choices:choices, title :title}
        }
        return null
    }

    if (order.hasOwnProperty("meal")) {
        let meal = order.meal;

        let ret = handleType(order, protos.Meal.MealType, 'mealType', 'meal')
        if (ret) return ret

        ret = handleType(order, protos.Meal.MeatType, 'meatType', 'meat')
        if (ret) return ret

        ret = handleType(order, protos.Meal.RiceType, 'riceType', 'rice')
        if (ret) return ret

        ret = handleType(order, protos.Meal.BeanType, 'beanType', 'beans')
        if (ret) return ret;
        return null;

        /*
        if (!meal.hasOwnProperty("mealType")) {
            console.log("Prototypes", Object.keys(protos.Meal.MealType));
            let types = Object.keys(protos.Meal.MealType);
            let choices = types.slice(1).map( x => createChoices(x, order, 'mealType'))
            return {type:'mealType', choices:choices, title :'meal'}
        }
        if (!meal.hasOwnProperty("meatType")) {
            let types = Object.keys(protos.Meal.MeatType);
            return {type:'meatType', choices:types.slice(1), title: 'meat'}
        }
        if (!meal.hasOwnProperty("riceType")) {
            let types = Object.keys(protos.Meal.RiceType);
            return {type:'riceType', choices:types.slice(1), title: 'rice'}
        }
        if (!meal.hasOwnProperty("beanType")) {
            let types = Object.keys(protos.Meal.BeanType);
            return {type:'beanType', choices:types.slice(1), title: 'bean'}
        }
        */

    }

}

export {orderToString, orderMissing};
