import React, {useEffect, Component, useState} from "react";
import {addResponseMessage, setQuickButtons, Widget} from "react-chat-widget";
import logo from "./logo.svg";
import proto from "./chipotle_pb"
import 'react-chat-widget/lib/styles.css';
import orderToString from './OrderDisplay.js';

var protos = require("./model.js")

//const hostname = "http://20.57.184.176:5005/webhooks/rest/webhook"
const hostname = "http://localhost:5005/webhooks/rest/webhook"



function Chat(props) {
    useEffect(() => {
        addResponseMessage('Welcome');
    }, []);

    const createButton = (x) => {
        return {label:x.title, value:x.payload};
    }
    const handleJsonSingle = (json) => {
        //console.log(`json`, json);
        if (json.hasOwnProperty('text')) {
            addResponseMessage(json.text);
        }
        if (json.hasOwnProperty("buttons")) {
            let buttons = json.buttons.map(x => createButton(x));
            setQuickButtons(buttons);
        }
        if (json.hasOwnProperty("custom")) {
            let json_value = JSON.parse(json.custom)
            let result = protos.Response.fromObject(json_value);
            console.log("Json Value", json_value, result);

            //console.log("Response", result, result.action, result.toJSON());
            if (result.action == protos.Response.Action.CLEAR) {
                props.setTableList([]);
            }
            else if (result.action == protos.Response.Action.ORDER) {
                //console.log("Oder", result.order);
                //console.log("OrderToString", orderToString(result.order));
                orderToString(result.order);
                let newList = props.table_list.concat([result.order]);
                props.setTableList(newList);
                //console.log("Added Item", props.table_list, new_table)
                //console.log("CT", protos.Coke.CokeType)
            }
            //var myBuffer = [];
            //var buffer = new Buffer(str, 'base64');

            //console.log("Custom", str, buffer);


            //let res = proto.Response.deserializeBinary(buffer);
            //console.log("Result", res, res.toObject());
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
        //console.log('quick button clicked ' + message)
        setQuickButtons([])
        postMessage(message);
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
