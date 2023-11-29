import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import { useState, useEffect, setState } from "react";
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import App, { tablify, parse_bool, theme, get_columns } from "../App";
import Navbar from './Navbar';
import "../styles.css"

import Typography from '@mui/material/Typography';
import { createTheme, makeStyles, ThemeProvider } from '@mui/material/styles';
import { TableBody, TableHead, TableRow, Box } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { columnsStateInitializer } from '@mui/x-data-grid/internals';



function Copyright(props) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <Link color="inherit" href="https://mui.com/">
                Your Website
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}


// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export default function Transactions() {


    const [TransactionsRow, setTransactionRows] = useState([]);
    const [TransactionsCols, setTransactionCols] = useState([]);





    useEffect(() => {

        if (TransactionsRow.length == 0) {
            //get_transaction_data();
        }
        if (TransactionsCols.length == 0) {

        }
    }, [TransactionsRow, TransactionsCols]);




    const get_orders_data = (event) => {
       let paramString = `transactions;;;()`; 
        const options = {
            method: "POST",
            headers: { "Content-Type": "text/plain" },
            body: paramString,
        };
        fetch('http://127.0.0.1:8080/', options).then(response => response.json()).then(result => {
            setTransactionRows(result["result"]);
            setTransactionCols(get_columns(result["result"]));
        });

    }




    const rowStyle = (record, index) => ({


    })



    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />

                
                    <Navbar/>

                <Grid className='background-grid' sx={{
                    alignContent:"center",
                    justifyContent:"center"
                }}>
                    Transactions


                <DataGrid 
                columns={TransactionsCols} 
                rows={TransactionsRow} 
                getRowId={(row)=> row.ID} 
                sx={{
                    width: "85%",
                    height: "60vh",
                    background:"white",
                    fontFamily:"Calibri"
                }}
                onRowSelectionModelChange={(id) => {
                    let record = TransactionsRow.filter((x) => {
                        return x.ID == id;
                    })
                    alert(JSON.stringify(record));
                }}
                
                >
                </DataGrid>
                </Grid>
        </ThemeProvider>


    );
}