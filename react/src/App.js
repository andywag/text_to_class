import logo from './logo.svg';
import './App.css';


import React, { useState, useEffect } from 'react';
import { Widget, addResponseMessage, setQuickButtons, handleQuickButtonClicked } from 'react-chat-widget';
import ReactDOM from "react-dom";


import Chat from './Chat.js'
import Table from './Table.js'
import ReactJson from 'react-json-view'

import 'react-chat-widget/lib/styles.css';
import {createMuiTheme} from "@material-ui/core/styles";
import { Grid, MuiThemeProvider, Button } from "@material-ui/core";
import blue from '@material-ui/core/colors/blue';

var protos = require("./model.js")


const theme = createMuiTheme({
    size: "small",
    palette: {
        type: "dark",
        primary: blue
    },
});

const ref = "https://github.com/andywag/text_to_class"

function App() {
    const [table_list, setTableList] = useState([]);
    const [currentOrder, setCurrentOrder] = useState(JSON.parse("{}"));

    return (

    <div className="App">
        <Chat table_list = {table_list}
              setTableList = {setTableList}
              currentOrder = {currentOrder}
              setCurrentOrder = {setCurrentOrder}
        ></Chat>
        <MuiThemeProvider theme={theme}>
        <Grid container spacing={3}>
            <Grid item xs={6}>
                <div className="Intro">
                <h1>Restaurant Chatbot Demo</h1>
                <p>This page is a demo of chatbot which handles restaurant ordering. The chatbot should handle basic commands to
                    order from Chipotle. The demo is based on <a href={ref}>TextToClass</a> which is a generic library which can be used to convert text
                    to programmatic data structures. The demo currently supports addition of items to a cart not a full fledged ordering system although
                    scaling up should not be difficult as the NLP portion of the system supports generic handling of input.
                </p>

            </div>
            </Grid>
            <Grid item xs={6}>
                <h2>Example Commands (Should handle single item orders)</h2>
                <ul style={{"text-align":"left"}}>
                    <li>Add Chicken Bowl with White Rice, Corn, Cheese and Mild Salsa.</li>
                    <li>Order Mexican Coke</li>
                    <li>I want chips and guacamole</li>
                    <li>Clear Cart (<b><i>Clears the cart</i></b>)</li>
                </ul>
            </Grid>

            <Grid item xs={6}>
                <div className="centered">
                    <Table table_list = {table_list}></Table>
                </div>
            </Grid>
            <Grid item xs={3}
             alignContent={"flex-start"}>
                <ReactJson src={currentOrder} />
            </Grid>
            <Grid item xs={3}
                  alignContent={"flex-start"}>
            </Grid>
        </Grid>
        </MuiThemeProvider>
        <header className="App-header">
        </header>
    </div>

  );
}

export default App;
