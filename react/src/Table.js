import React, {useEffect, Component} from "react";
import {addResponseMessage, setQuickButtons, Widget} from "react-chat-widget";
import logo from "./logo.svg";

import 'react-chat-widget/lib/styles.css';

import DenseTable from "material-table";
import { Grid, MuiThemeProvider, Button } from "@material-ui/core";
import { createMuiTheme } from "@material-ui/core/styles";

import { forwardRef } from 'react';

import AddBox from '@material-ui/icons/AddBox';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import ViewColumn from '@material-ui/icons/ViewColumn';
import blue from '@material-ui/core/colors/blue';


function Table() {

    const theme = createMuiTheme({
        direction: "ltr",
        size: "small",
        palette: {
            type: "light",
            primary: blue
        },
    });

    const tableIcons = {
        Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
        Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
        Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
        Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
        DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
        Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
        Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
        Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
        FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
        LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
        NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
        PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
        ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
        SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
        ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
        ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
    };

    const tableColumns = [
        { title: "Index", field: "index", type: "numeric",
            cellStyle: { width: "5%", maxWidth: "5%" },
            headerStyle: { width: "5%", maxWidth: "5%" }},
        { title: "Number", field: "number", type: "numeric",
            cellStyle: { width: "5%", maxWidth: "5%" },
            headerStyle: { width: "5%", maxWidth: "5%" }},
        { title: "Item",  field: "item",
            cellStyle: { width: "80%", maxWidth: "80%" },
            headerStyle: { width: "80%", maxWidth: "80%" }},
        { title: "Probability", field: "prob", type: "numeric",
            cellStyle: { width: "5%", maxWidth: "5%" },
            headerStyle: { width: "5%", maxWidth: "5%" }}
        ];

    return (
        <MuiThemeProvider theme={theme}>
        <div style={{ maxWidth: "100%", paddingTop: "12px" }}>
        <div className="Table">
            <DenseTable
                icons={tableIcons}
                columns={tableColumns}
                data={[
                    {
                        index: 1,
                        number: 2,
                        item: "diet coke",
                        prob: .5,
                    },
                ]}
                title="Cart Contents"
                options={{
                    headerStyle: { backgroundColor: "black", color: "white" },
                    search: false
                }}
            />
        </div>
        </div>
        </MuiThemeProvider>
    );
}

export default Table;
