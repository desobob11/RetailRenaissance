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

export default function DetailPanel(props) {
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [address, setAddress] = useState("");
    const [totalOrder, setTotalOrder] = useState("");
    const [completed, setCompleted] = useState("");
    const [totalSales, setTotalSales] = useState("");




    useEffect(() => {
        setName(props["custName"]);
        setPhone(props["phone"]);
        setEmail(props["email"]);
        setAddress(props["address"])
    }, [])

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />

            <Box
            
            sx={{background:"white",
            width:"80%",
            height:"25%",
            fontFamily: "Calibri",
            border: "none",
            borderRadius: "20px",
            marginLeft:"10%",
            marginTop:"5%"
        }}>

                <Grid spacing={4} sx={{ width: "100%", height: "100%", display: 'flex' }}>
            
                <Grid item name="name"
                sx={{
                    width: "33.33%",
                    height: "70%",
                    borderStyle:"solid",
                    borderWidth:"thin",
                    borderColor:"lightgrey",
                    borderLeft:"none",
                    borderTop:"none",
                    textAlign:"center",
                    alignItems:"center",
                    justifyContent:"center",
                    display:'flex'
                }}>
                        <Typography component="h1" variant="h4">
                            {name}
                        </Typography>
                </Grid>
                    <Grid item name="info"
                        sx={{
                            width: "33.33%",
                            height: "70%",
                            borderStyle: "solid",
                            borderWidth: "thin",
                            borderColor: "lightgrey",
                            borderTop: "none"
                           // textAlign: "center",
                           // alignItems: "center",
                           // justifyContent: "center",
                           // display: 'flex'
                        }}>
                        <Typography component="h1" variant="subtitle1" color="grey" sx={{position:"relative", left:35, top:20}}>
                            SUPPLIER INFORMATION
                        </Typography>
                        <Typography component="h1" variant="subtitle1" sx={{ position: "relative", left: 35, top: 20 }}>
                            <p></p>
                            Contact Number          {phone} <p></p>
                            Email Address           {email}
                        </Typography>
                    </Grid>
     
                    <Grid item name="analytics"
                        sx={{
                            width: "33.33%",
                            height: "70%",
                            borderStyle: "solid",
                            borderWidth: "thin",
                            borderColor: "lightgrey",
                            borderRight:"none",
                            borderTop: "none"
                          //  textAlign: "center",
                          //  alignItems: "center",
                           // justifyContent: "center",
                            //display: 'flex'
                        }}>
                        <Typography component="h1" variant="subtitle1" color="grey" sx={{ position: "relative", left: 35, top: 20 }}>
                            SHIPPING ADDRESS
                        </Typography>
                        <Typography component="h1" variant="subtitle1" sx={{ position: "relative", left: 35, top: 20 }}>
                            <p></p>
                            {address} <p></p>
                        </Typography>
                    </Grid>


            </Grid>
            </Box>


        </ThemeProvider>


    );
}