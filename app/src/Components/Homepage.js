import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import { useState, useEffect, setState } from "react";
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import App, { tablify, parse_bool, theme, get_columns} from "../App";
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





    const [userRows, setUserRows] = useState([]);
    const [userCols, setUserCols] = useState([]);

    useEffect(() => {

        if (userRows.length == 0) {
            get_user_data();
        }
        if (userCols.length == 0) {

        }
    }, [userRows, userCols]);

    const get_user_data = (event) => {
        let paramString = `user_summary;;;()`;
        const options = {
            method: "POST",
            headers: { "Content-Type": "text/plain" },
            body: paramString,
        };
        fetch('http://127.0.0.1:8080/', options).then(response => response.json()).then(result => {
            setUserRows(result["result"]);
            setUserCols(get_columns(result["result"]));
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
                    Users


                <DataGrid 
                columns={userCols} 
                rows={userRows} 
                getRowId={(row)=> row.ID} 
                sx={{
                    width: "85%",
                    height: "60vh",
                    background:"white",
                    fontFamily:"Calibri"
                }}
                onRowSelectionModelChange={(id) => {
                    let record = userRows.filter((x) => {
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