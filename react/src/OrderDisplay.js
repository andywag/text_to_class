
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

export default orderToString;