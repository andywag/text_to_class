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


const theme = createMuiTheme({
    size: "small",
    palette: {
        type: "dark",
        primary: blue
    },
});

const ref = "https://github.com/andywag/text_to_class"

function App() {

    return (
    <div className="App">
        <Chat></Chat>
        <MuiThemeProvider theme={theme}>
        <div className="Intro">
            <h1>Restaurant Chatbot Demo</h1>
            <p>This page is a demo of chatbot which handles restaurant ordering. The chatbot should handle basic commands to
            order from Chipotle. The demo is based on <a href={ref}>TextToClass</a> which is a generic library which can be used to convert text to programmatic
            data structures.</p>
            <p>The NLP (Natural Language Processing) portion should be robust but the UI it is still a bit rudimentary. The table of cart contents is
            currently under development. Proper handling of this operation requires refactoring to move operations from the server to client
            as well as more generalization.</p>
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
