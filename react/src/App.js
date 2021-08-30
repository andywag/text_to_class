import logo from './logo.svg';
import './App.css';


import React, { useState, useEffect } from 'react';
import { Widget, addResponseMessage, setQuickButtons, handleQuickButtonClicked } from 'react-chat-widget';
import ReactDOM from "react-dom";


import Chat from './Chat.js'
import Table from './Table.js'

import 'react-chat-widget/lib/styles.css';
import {createMuiTheme} from "@material-ui/core/styles";
import { Grid, MuiThemeProvider, Button } from "@material-ui/core";
import blue from '@material-ui/core/colors/blue';

const hostname = "http://20.57.184.176:5005/webhooks/rest/webhook"
//const hostname = "http://localhost:5005/webhooks/rest/webhook"


const theme = createMuiTheme({
    size: "small",
    palette: {
        type: "dark",
        primary: blue
    },
});

function App() {

    return (
    <div className="App">
        <Chat></Chat>
        <MuiThemeProvider theme={theme}>
        <div className="Intro">
            <h1>Restaurant Chatbot Demo</h1>
            <p>This page is a demo of chatbot which handles restaraunt ordering. The chatbot should handle basic commmands to
            order from Chipotle. The NLP (Natural Language Processing) portion should be robust but the UI it is
            still a bit rudimentary from the UI Perspective. The table of cart contents is currently under development.</p>
            <h2>Example Commands (Should handle single item orders)</h2>
            <ul style={{"text-align":"left"}}>
                <li>Add Chicken Bowl with White Rice, Corn, Cheese and Mild Salsa.</li>
                <li>Order Mexican Coke</li>
                <li>View Cart</li>
                <li>Clear Cart</li>
            </ul>
        </div>
        </MuiThemeProvider>
        <Table></Table>
      <header className="App-header">
      </header>
    </div>
  );
}

export default App;
