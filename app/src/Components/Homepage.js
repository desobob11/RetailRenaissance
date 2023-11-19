import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import { useState, useEffect, setState } from "react";
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import App, { tablify, parse_bool, theme } from "../App";
import Navbar from './ListItems';
import "../styles.css"
import Table from '@mui/material/Table';

import Typography from '@mui/material/Typography';
import { createTheme, makeStyles, ThemeProvider } from '@mui/material/styles';
import { TableBody, TableHead, TableRow } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';


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

export default function Homepage() {





    const [userTable, setUserTable] = useState("");

    useEffect(() => {
      //  alert(JSON.stringify(userTable));
      //  if (userTable == "") {
       //     get_user_data();
       // }
    }, [userTable]);

    const get_user_data = (event) => {
        let paramString = `user_summary;;;()`;
        const options = {
            method: "POST",
            headers: { "Content-Type": "text/plain" },
            body: paramString,
        };
        fetch('http://127.0.0.1:8080/', options).then(response => response.json()).then(result => {
            setUserTable(tablify(result));
        });

    }

/*
    <AppBar
        sx={{
            background: "MediumAquaMarine",
            height: "5%",
            alignContent: "middle",
            display: "flex",
            alignItems: "left",
            justifyContent: "left",
            verticalAlign: "bottom"

        }}>
        */

    let heading = ["one", "two"];
    let body = [[1, 2]];
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />

                
                    <Navbar/>

                <Grid className='background-grid'>
                    Users

        
                </Grid>








        </ThemeProvider>


    );
}