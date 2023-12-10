import * as React from 'react';
import { useState, useEffect } from "react";
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { ThemeProvider } from '@mui/material/styles';
import { DataGrid } from '@mui/x-data-grid';
import { Box } from '@mui/material';

import App, { get_columns, theme  } from "../App";
import Navbar from './Navbar';
import "../styles.css";
import Button from '@mui/material/Button';
import { useNavigate, Link } from 'react-router-dom';



export default function AllShipments() {
    const [shipmentRows, setShipmentRows] = useState([]);
    const [shipmentCols, setShipmentCols] = useState([]);

    useEffect(() => {
         if (shipmentRows.length === 0) {
             get_shipment_data();
         }
    }, [,]);

    const get_shipment_data = () => {
        let paramString = `SHIPMENT_all_shipments;;;()`;
        const options = {
            method: "POST",
            headers: { "Content-Type": "text/plain" },
            body: paramString,
        };
        fetch('http://127.0.0.1:8080/', options)
            .then(response => response.json())
            .then(result => {
                setShipmentRows(result["result"]);
                setShipmentCols(get_columns(result["result"]));
            });
    };



    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Navbar />

            <Grid className='background-grid' sx={{
                alignContent: "center",
                justifyContent: "center"
            }}>

                All Shipments
                <Typography align="right" marginRight="20vw" marginBottom="1vh">
                    <Button variant="contained" component={Link} to="/suppliers">
                        Suppliers Summary
                    </Button>
                </Typography>
                <Box sx={{
                    width: "85%",
                    height: "60vh",
                    background: "white",
                    fontFamily: "Calibri"
                }}>
                    
                    <DataGrid
                        columns={shipmentCols}
                        rows={shipmentRows}
                        getRowId={(row) => row.shipment_id} // Adjust to your data's unique identifier
                    />
                </Box>
            </Grid>
        </ThemeProvider>
    );
}
