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

    const [orderItems, setOrderItems] = useState([]);

    useEffect(() => {
        if (props.order && props.order.items) {
            setOrderItems(props.order.items);
        }
    }, [props.order]);


    // Function to calculate subtotal and total
    const calculateTotals = () => {
        const shippingFee = 10; // Flat shipping fee
        const subtotal = orderItems.reduce((sum, item) => sum + (item.price * item.qty), 0);
        const tax = subtotal * 0.05;
        const total = subtotal + shippingFee + tax;
        return { subtotal, shippingFee, total, tax };
    };

    
    // Destructure calculated totals
    const { subtotal, shippingFee, total } = calculateTotals();


    
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Box
                sx={{
                    background: "white",
                    width: "80%",
                    margin: "5% auto 0", // centers the box with a top margin of 5% gang gang
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
                    <span style={boldStyle}>Order ID:</span> {props.order_id}
                    </Typography>
                </Box>
                <Box sx={{ flex: 2, borderLeft: '1px solid lightgrey', borderRight: '1px solid lightgrey', paddingLeft: 5}}> {/* Flex 2 for dbl wif */}
                    <Typography variant="h6" gutterBottom>
                        ORDER DETAILS
                    </Typography>
                    <Typography color="textSecondary">
                    <span style={boldStyle}>Item Names:</span> {props.gender}
                    </Typography>
                    <Typography color="textSecondary">
                    <span style={boldStyle}>Qty:</span> {props.dob}
                    </Typography>
                    <Typography color="textSecondary">
                    <span style={boldStyle}>Total:</span> {props.memberSince}
                    </Typography>
                    <Typography color="textSecondary">
                    <span style={boldStyle}>Payment Method:</span> {props.phone}

                    </Typography>
                </Box>
                <Box sx={{ flex: 2, paddingLeft: 2, marginLeft: 2 }}>
                    <Typography variant="h6" gutterBottom>
                        SHIPPING ADDRESS
                    </Typography>
                    <Typography color="textSecondary">{props.address}</Typography>
                 </Box>
            </Box>
        </ThemeProvider>
    );
}
