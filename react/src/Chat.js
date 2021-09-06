import React, {useEffect, Component, useState} from "react";
import {addResponseMessage, setQuickButtons, Widget} from "react-chat-widget";
import logo from "./logo.svg";
import proto from "./chipotle_pb"
import 'react-chat-widget/lib/styles.css';
import {orderToString, orderMissing} from './OrderDisplay.js';

var protos = require("./model.js")

const hostname = "http://20.57.184.176:5005/webhooks/rest/webhook"
//const hostname = "http://localhost:5005/webhooks/rest/webhook"



function Chat(props) {
    useEffect(() => {
        addResponseMessage('Welcome');
    }, []);

    const createButton = (x, y) => {
        console.log("Create Button", x);
        return {label:x, value:y};
    }

    const createRefineButton = (choices) => {
        console.log("Refining", choices)
        return choices.map(x => createButton(x.title, x.result));
    }

    const affirmDenyButtons = [{label:'Yes', value:'Yes'}, {label:'No', value:'No'}];


    const handleJsonSingle = (json) => {
        //console.log(`json`, json);
        if (json.hasOwnProperty('text')) {
            addResponseMessage(json.text);
        }
        if (json.hasOwnProperty("buttons")) {
            let buttons = json.buttons.map(x => createButton(x,x));
            setQuickButtons(buttons);
        }
        if (json.hasOwnProperty("custom")) {

            let json_value = JSON.parse(json.custom)
            //props.setCurrentOrder(json_value)

            let result = protos.Response.fromObject(json_value);
            console.log("Json Value", json_value, result);

            if (result.action == protos.Response.Action.CLEAR) {
                props.setTableList([]);
            }
            else if (result.action == protos.Response.Action.ORDER) {
                let missing = orderMissing(result.order);
                props.setCurrentOrder(result.order)

                if (missing) {
                    console.log("Missing", missing);
                    addResponseMessage("What " +  missing.title + " would you like?");
                    let buttons = createRefineButton(missing.choices);
                    setQuickButtons(buttons);
                }
                else {
                    addResponseMessage("Add " + orderToString(result.order) + " to cart?");
                    setQuickButtons(affirmDenyButtons);
                }
                //let newList = props.table_list.concat([result.order]);
                //props.setTableList(newList);
            }

        }
    }
    const handleJsonResponse = (json) => {
        //console.log(`Top Json`, json);
        json.forEach(handleJsonSingle);

    }

    const postMessage = (message) => {
        //console.log(process.env);
        //console.log('Post Message' + message, hostname);

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ sender: 'sender',message:message })
        };
        let result = fetch(hostname,
            requestOptions).then(response => {
            response.json().then(json => {
                handleJsonResponse(json);
            });
        });
    }

    const handleNewUserMessage = (newMessage) => {
        console.log(`New message incoming! ${newMessage}`);
        setQuickButtons([])
        postMessage(newMessage);
    }

    const handleQuickButtonClicked = (message) => {
        console.log('quick button clicked ' + message)
        setQuickButtons([])
        if (message == "Yes") {
            let newList = props.table_list.concat([props.currentOrder]);
            props.setTableList(newList);
            props.setCurrentOrder({})
        }
        else {
            console.log("Message", message, typeof message, typeof props.currentOrder)
            let newOrder = protos.Order.create(message)
            props.setCurrentOrder(newOrder);
            let missing = orderMissing(message);
            if (missing) {
                console.log("Missing", missing);
                addResponseMessage("What " +  missing.title + " would you like?");
                let buttons = createRefineButton(missing.choices);
                setQuickButtons(buttons);
            }
            else {
                console.log("Setting Order", props.currentOrder, newOrder)
                let newList = props.table_list.concat([newOrder]);
                props.setTableList(newList);
                props.setCurrentOrder({})

            }
        }


    }

    return (
        <div className="Chat">
            <Widget
                handleNewUserMessage={handleNewUserMessage}
                handleQuickButtonClicked={handleQuickButtonClicked}
                title="Restaurant Ordering Demo"
                subtitle=""
            />
        </div>
    );
}

export default Chat;
