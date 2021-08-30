import React, {useEffect, Component, useState} from "react";
import {addResponseMessage, setQuickButtons, Widget} from "react-chat-widget";
import logo from "./logo.svg";

import CartState from "./CartState"

import 'react-chat-widget/lib/styles.css';
const hostname = "http://20.57.184.176:5005/webhooks/rest/webhook"
//const hostname = "http://localhost:5005/webhooks/rest/webhook"


function Chat() {
    const [cart] = useState(new CartState());
    useEffect(() => {
        addResponseMessage('Welcome');
    }, []);

    const createButton = (x) => {
        return {label:x.title, value:x.payload};
    }
    const handleJsonSingle = (json) => {
        console.log(`json`, json);
        addResponseMessage(json.text);
        if (json.hasOwnProperty("buttons")) {
            let buttons = json.buttons.map(x => createButton(x));
            setQuickButtons(buttons);
        }
    }
    const handleJsonResponse = (json) => {
        console.log(`Top Json`, json);
        json.forEach(handleJsonSingle);

    }

    const postMessage = (message) => {
        console.log(process.env);
        console.log('Post Message' + message, hostname);

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