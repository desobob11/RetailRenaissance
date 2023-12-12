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


const defaultTheme = createTheme();

export default function DetailPanel(props) {
    
    const boldStyle = { fontWeight: 'bold', color: 'black' };

    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [address, setAddress] = useState("");
    const [totalOrder, setTotalOrder] = useState("");
    const [completed, setCompleted] = useState("");
    const [totalSales, setTotalSales] = useState("");





    useEffect(() => {
        setName(props.custName);
        setPhone(props.phone);
        setEmail(props.email);
        setAddress(props.address);
        setTotalSales(props.sales);
      }, [props.custName, props.phone, props.email, props.address, props.sales]);

      return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Typography variant="h4" component="h2" gutterBottom style={{ marginTop: '5vh', marginLeft:'140px'}}>
            Customer Details
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
                        {props.custName} {props.lastName} 
                    </Typography>
                    <Typography color="textSecondary">
                    <span style={boldStyle}>Customer ID:</span> {props.customer_id}
                    </Typography>
                </Box>
                <Box sx={{ flex: 2, borderLeft: '1px solid lightgrey', borderRight: '1px solid lightgrey', paddingLeft: 5, paddingRight: 2,}}> {/* Flex 2 for dbl wif */}
                    <Typography variant="h6" gutterBottom>
                        PERSONAL INFORMATION
                    </Typography>
                    <Typography color="textSecondary">
                    <span style={boldStyle}>Contact Number:</span> {props.phone}
                    </Typography>
                    <Typography color="textSecondary">
                    <span style={boldStyle}>Email:</span> {props.email}
                    </Typography>
                </Box>
                <Box sx={{ flex: 2, paddingLeft: 2, marginLeft: 2 }}>
                    <Typography variant="h6" gutterBottom>
                        SHIPPING ADDRESS
                    </Typography>
                    <Typography color="textSecondary">{props.address}</Typography>
                 </Box>
                 <Box sx={{ flex: 2, borderLeft: '1px solid lightgrey', paddingLeft: 2, marginLeft: 2, }}> 
                    <Typography variant="h6" gutterBottom>
                        ORDER DETAILS
                    </Typography>
                    <Typography color="textSecondary">
                    <span style={boldStyle}>Total Sales:</span> {props.totalSales}
                    </Typography>
                    <Typography color="textSecondary">
                    <span style={boldStyle}>Total Order:</span> {props.totalOrder}
                    </Typography>
                    <Typography color="textSecondary">
                    <span style={boldStyle}>Completed:</span> {props.completed}
                    </Typography>
                    <Typography color="textSecondary">
                    <span style={boldStyle}>Cancelled:</span> {props.cancelled}
                    </Typography>
                </Box>
            </Box>
        </ThemeProvider>
    );
}
