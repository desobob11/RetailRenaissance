import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import { useState, useEffect, setState } from "react";
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import App, { tablify, parse_bool, theme, get_columns } from "../App";
import Navbar from './ListItems';
import "../styles.css"
import Table from '@mui/material/Table';
import { LineChart } from '@mui/x-charts';
import DetailPanel from './DetailPanel'

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

function extract_summary(result) {
    var rows = []

    

}



// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export default function Customers() {
    const [custName, setCustName] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [address, setAddress] = useState("");
    const [totalOrder, setTotalOrder] = useState("");
    const [completed, setCompleted] = useState("");
    const [totalSales, setTotalSales] = useState("");

    const [customerRows, setCustomerRows] = useState([]);
    const [customerCols, setCustomerCols] = useState([]);

    useEffect(() => {
        if (customerRows.length == 0) {
            get_customer_data()
        }
   
    }, []);

    const get_customer_data = (event) => {
        let paramString = `CUSTOMERS_get_all_data;;;()`;
        const options = {
            method: "POST",
            headers: { "Content-Type": "text/plain" },
            body: paramString,
        };
        fetch('http://127.0.0.1:8080/', options).then(response => response.json()).then(result => {
            setCustomerRows(result["result"]);
            setCustomerCols(get_columns(result["result"]));
        });

    }

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
        <Box
        sx={{
            alignContent:"center",
            display:'in-line',
            width:"100vw",
            height:"100vh"
        }}>
            <Navbar></Navbar>
                <DetailPanel custName="Desmond">
                </DetailPanel>
                <DataGrid
                    columns={customerCols}
                    rows={customerRows}
                    getRowId={(row) => row.customer_id}
                    sx={{
                        marginTop:"1%",
                        width: "80%",
                        height: "1000px",
                        background: "white",
                        fontFamily: "Calibri",
                        marginLeft:"10%",
                        border: "none",
                        borderRadius: "20px"
                    }}
                    onRowSelectionModelChange={(id) => {
                        // let record = userRows.filter((x) => {
                        //      return x.ID == id;
                        //  })
                        //  alert(JSON.stringify(record));
                    }}

                >
                </DataGrid>
        </Box>


        </ThemeProvider>


    );
}