import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import { useState, useEffect, setState } from "react";
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import App, { tablify, parse_bool, theme, get_columns } from "../App";
import Navbar from './ListItems';
import "../styles.css"
import Table from '@mui/material/Table';
import {LineChart} from '@mui/x-charts';

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

export default function Reports() {


    const _cols = [{field: "Name"},
                    {field: "ID"}]
    const _rows = [{"Name": "Hello", "ID": 1}]



    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />


            <Navbar />
            <Typography variant="h4" marginLeft="10vw" marginTop="5vh">
                Best Selling Products
            </Typography>
        
            <Grid container spacing={4}className='background-grid' sx={{
                alignContent: "center",
                justifyContent: "center"
            }}>
          

            <Grid item marginTop="2vh">
                <DataGrid
                    columns={_cols}
                    rows={_rows}
                    getRowId={(row) => row.ID}
                    sx={{
                        width: "80vw",
                        height: "30vh",
                        background: "white",
                        fontFamily: "Calibri",
                        border: "none",
                        borderRadius: "20px"
                    }}
                    /*
                    onRowSelectionModelChange={(id) => {
                        let record = userRows.filter((x) => {
                            return x.ID == id;
                        })
                        alert(JSON.stringify(record));
                    }}
                    */

                >
                </DataGrid>
            </Grid>
                <Box sx={{
                    width: "80vw",
                    height: "60vh",
                    marginLeft: "8vw"

                }}>
                    <LineChart
                        xAxis={[{ data: [1, 2, 3, 5, 8, 10] }]}
                        series={[
                            {
                                data: [2, 5.5, 2, 8.5, 1.5, 5],
                            },
                        ]}

                    />

                </Box>
            <Grid item>
                <Typography variant="h5" marginLeft="6vw" marginTop="1vh">
                    Trending Products
                </Typography>
            </Grid>
                <Grid item>
                    <Typography variant="h5" marginLeft="15vw" marginTop="1vh">
                        Latest Transactions
                    </Typography>
                </Grid>
                <Grid item>
                    <Typography variant="h5" marginLeft="18vw" marginTop="1vh">
                        Order Summary (Last 7 Days)
                    </Typography>
                </Grid>
            <Grid item>
                <DataGrid
                    columns={_cols}
                    rows={_rows}
                    getRowId={(row) => row.ID}
                    sx={{
                        width: "20vw",
                        height: "30vh",
                        background: "white",
                        fontFamily: "Calibri",
                        border:"none",
                        borderRadius: "20px"
                    }}
                /*
                onRowSelectionModelChange={(id) => {
                    let record = userRows.filter((x) => {
                        return x.ID == id;
                    })
                    alert(JSON.stringify(record));
                }}
                */

                >
                </DataGrid>
                   </Grid>
                <Grid item>
                                <DataGrid
                    columns={_cols}
                    rows={_rows}
                    getRowId={(row) => row.ID}
                    sx={{
                        width: "40vw",
                        height: "30vh",
                        background: "white",
                        fontFamily: "Calibri",
                        border: "none",
                        borderRadius:"20px"
                    }}
                    /*
                    onRowSelectionModelChange={(id) => {
                        let record = userRows.filter((x) => {
                            return x.ID == id;
                        })
                        alert(JSON.stringify(record));
                    }}
                    */

                >
                </DataGrid>
            </Grid>
                <Grid item>
                    <DataGrid
                        columns={_cols}
                        rows={_rows}
                        getRowId={(row) => row.ID}
                        sx={{
                            width: "20vw",
                            height: "30vh",
                            background: "white",
                            fontFamily: "Calibri",
                            border: "none",
                            borderRadius: "20px"
                        }}
                    /*
                    onRowSelectionModelChange={(id) => {
                        let record = userRows.filter((x) => {
                            return x.ID == id;
                        })
                        alert(JSON.stringify(record));
                    }}
                    */

                    >
                    </DataGrid>
                </Grid>
            </Grid>
            <Typography variant="h4" marginLeft="10vw" marginTop="5vh">
                Transactions YTD
            </Typography>


        </ThemeProvider>


    );
}