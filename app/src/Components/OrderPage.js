import * as React from 'react';
import { useState, useEffect } from "react";
import CssBaseline from '@mui/material/CssBaseline';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { ThemeProvider } from '@mui/material/styles';
import { DataGrid } from '@mui/x-data-grid';
import { Box } from '@mui/material';

import App, { get_columns, theme } from "../App";
import Navbar from './Navbar';
import "../styles.css";

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

export default function Orders() {
    const [OrdersRows, setOrdersRows] = useState([]);
    const [OrdersCols, setOrdersCols] = useState([]);

    useEffect(() => {
        if (OrdersRows.length === 0) {
            get_orders_data();
        }
    }, [OrdersRows]);

    const get_orders_data = () => {
       let paramString = `Order_get_all_data;;;()`;
        const options = {
            method: "POST",
            headers: { "Content-Type": "text/plain" },
            body: paramString,
        };
        fetch('http://127.0.0.1:8080/', options)
          .then(response => response.json())
          .then(result => {
              setOrdersRows(result["result"]);
              setOrdersCols(createColumns(get_columns(result["result"])));
          });
    };

    const createColumns = (data) => {
        return data.map(col => {
            if (col.field === 'order_status') { 
                return { ...col, cellClassName: getOrderStatusClassName };
            }
            return col;
        });
    };

    const getOrderStatusClassName = (params) => {
        const order_status = params.row.order_status;
        console.log(order_status); // This will print the status for each row to the console
        if (order_status === 'Complete') {
            return 'row-complete';
        } else if (order_status === 'Pending') {
            return 'row-pending';
        } else if (order_status === 'Cancelled') {
            return 'row-cancelled';
        }
        return '';
    };
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Navbar />
            <Grid className='background-grid' sx={{
                alignContent: "center",
                justifyContent: "center"
            }}>
                Orders
                <Box sx={{
                    width: "85%",
                    height: "60vh",
                    background: "white",
                    fontFamily: "Calibri",
                    '& .row-complete': { backgroundColor: '#C8E6C9' }, // light green
                    '& .row-pending': { backgroundColor: '#FFF9C4' }, // light yellow
                    '& .row-cancelled': { backgroundColor: '#FFCDD2' }, // light red
                }}>
                    <DataGrid 
                        columns={OrdersCols} 
                        rows={OrdersRows} 
                        getRowId={(row) => row.transaction_id} // Adjust to your data's unique identifier
                        onRowSelectionModelChange={(id) => {
                            let record = OrdersRows.filter((x) => x.ID == id);
                            alert(JSON.stringify(record));
                         }}
                         classes={{
                            columnHeader: 'myGridHeader',
                            footer: 'myGridFooter',
                          }}
                  />
                </Box>
            </Grid>
        </ThemeProvider>
    );
}
