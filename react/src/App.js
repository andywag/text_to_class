import logo from './logo.svg';
import './App.css';

import React, { useState, useEffect } from 'react';
import { Widget, addResponseMessage, setQuickButtons, handleQuickButtonClicked } from 'react-chat-widget';

import 'react-chat-widget/lib/styles.css';
//const hostname = process.env.HOSTNAME + ":5005/webhooks/rest/webhook"
const hostname = "http://localhost:5005/webhooks/rest/webhook"

function App() {
    useEffect(() => {
        addResponseMessage('Welcome to this awesome chat!');
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
    <div className="App">
      <Widget
          handleNewUserMessage={handleNewUserMessage}
          handleQuickButtonClicked={handleQuickButtonClicked}
      />
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
