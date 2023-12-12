import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import { useState, useEffect, setState } from "react";
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import App, { tablify, parse_bool, theme, get_columns } from "../App";
import Navbar from './Navbar';
import "../styles.css"
import Table from '@mui/material/Table';

import Typography from '@mui/material/Typography';
import { createTheme, makeStyles, ThemeProvider } from '@mui/material/styles';
import { TableBody, TableHead, TableRow, Box } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { columnsStateInitializer } from '@mui/x-data-grid/internals';





// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export default function DetailPanel(props) {
    
    const boldStyle = { fontWeight: 'bold', color: 'black' };

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [amount, setAmount] = useState("");
    const [transaction_date, setTransactionDate] = useState("");




    useEffect(() => {
        setFirstName(props.firstName);
        setLastName(props.lastName);
        setAmount(props.amount);
        setTransactionDate(props.transaction_date);
      }, [props.firstName, props.lastName, props.amount, props.employee_date_hired, props.manager_id, props.transaction_date,]);






      return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Typography variant="h4" component="h2" gutterBottom style={{ marginTop: '5vh', marginLeft:'145px'}}>
            Transaction Details
         </Typography>   
            <Box
                sx={{
                    background: "white",
                    width: "80%",
                    margin: "0% auto 0", // centers the box with a top margin of 5% gang gang
                    fontFamily: "Calibri",
                    border: "1px solid lightgrey",
                    borderRadius: "20px",
                    padding: 2,
                    display: 'flex', 
                    alignItems: 'center', // centers items vertically
                    alignItems: 'flex-start', // aligns items to the start of the flex container

                }}
            >           
                <Box sx={{ flex: 1, textAlign: 'center', padding: 2, marginTop: 2, }}> {/* Flex 1 for equal width */}
                    <Typography variant="h5" gutterBottom>
                        {props.firstName} {props.lastName} 
                    </Typography>
                    <Typography color="textSecondary">
                    <span style={boldStyle}>Transaction ID:</span> {props.transaction_id}
                    </Typography>
                    <Typography color="textSecondary">
                    <span style={boldStyle}>Customer ID:</span> {props.customer_id}
                    </Typography>
                </Box>
                <Box sx={{ flex: 2, borderLeft: '1px solid lightgrey', paddingLeft: 5}}> {/* Flex 2 for dbl wif */}
                    <Typography variant="h6" gutterBottom>
                        ORDER INFORMATION
                    </Typography>
                    <Typography color="textSecondary">
                    <span style={boldStyle}>Date:</span> {props.transaction_date}
                    </Typography>
                    <Typography color="textSecondary">
                    <span style={boldStyle}>Amount:</span> {props.amount}
                    </Typography>
                </Box>
                  <Box sx={{ flex: 2, borderLeft: '1px solid lightgrey', paddingLeft: 5 }}> {/* Flex 2 for dbl wif */}
                      <Typography variant="h6" gutterBottom>
                          CUSTOMER INFORMATION
                      </Typography>
                      <Typography color="textSecondary">
                          <span style={boldStyle}>Email:</span> {props.email}
                      </Typography>
                      <Typography color="textSecondary">
                          <span style={boldStyle}>Contact Number:</span> {props.phone_num}
                      </Typography>
                      <Typography color="textSecondary">
                          <span style={boldStyle}>Shipping Address:</span> {props.address}
                      </Typography>
                  </Box>
            </Box>
        </ThemeProvider>
    );
}
