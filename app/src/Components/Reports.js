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

    const [countOrders, setCountOrders] = useState("");
    const [sumOrders, setSumOrders] = useState("");

    const [bestSellingRows, setBestSellingRows] = useState([]);
    const [bestSellingCols, setBestSellingCols] = useState([]);

    const [trendingRows, setTrendingRows] = useState([]);
    const [trendingCols, setTrendingCols] = useState([]);
    const [latestRows, setLatestRows] = useState([]);
    const [latestCols, setLatestCols] = useState([]);

    const get_best_selling = (event) => {
        let paramString = `REPORTS_bestselling_products;;;()`;
        const options = {
            method: "POST",
            headers: { "Content-Type": "text/plain" },
            body: paramString,
        };
        fetch('http://127.0.0.1:8080/', options).then(response => response.json()).then(result => {
            setBestSellingRows(result["result"]);
            setBestSellingCols(get_columns(result["result"]));
        });

    }
    const get_trending = (event) => {
        let paramString = `REPORTS_trending_products;;;()`;
        const options = {
            method: "POST",
            headers: { "Content-Type": "text/plain" },
            body: paramString,
        };
        fetch('http://127.0.0.1:8080/', options).then(response => response.json()).then(result => {
            setTrendingRows(result["result"]);
            setTrendingCols(get_columns(result["result"]));
        });

    }
    
    const get_latest = (event) => {
        let paramString = `REPORTS_latest_transactions;;;()`;
        const options = {
            method: "POST",
            headers: { "Content-Type": "text/plain" },
            body: paramString,
        };
        fetch('http://127.0.0.1:8080/', options).then(response => response.json()).then(result => {
            setLatestRows(result["result"]);
            setLatestCols(get_columns(result["result"]));
        });

    }

    const get_summary = (event) => {
        let paramString = `REPORTS_sum_orders;;;()`;
        const options = {
            method: "POST",
            headers: { "Content-Type": "text/plain" },
            body: paramString,
        };
        fetch('http://127.0.0.1:8080/', options).then(response => response.json()).then(result => {
            setSumOrders(result["result"][0]["@result"]);
        });
        paramString = `REPORTS_count_orders;;;()`;
        options["body"] = paramString;
        fetch('http://127.0.0.1:8080/', options).then(response => response.json()).then(result => {
            setCountOrders(result["result"][0]["@result"]);
        });

        

    }

    useEffect(() => {
        if (bestSellingRows.length == 0) {
            get_best_selling();
        }
        if (bestSellingCols.length == 0) {
            get_trending();
        }
        if (latestCols.length == 0) {
            get_latest();
        }
        if (sumOrders == "") {
            get_summary();
        }

        }, [bestSellingRows, trendingRows, latestCols, sumOrders]);





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
                <DataGrid name="bestSelling"
                    columns={bestSellingCols}
                    rows={bestSellingRows}
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
                <Typography variant="h4" marginLeft="10vw" marginTop="5vh">
                    Best-Selling Product, Transactions YTD
                </Typography>
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
                <DataGrid name="trending"
                    columns={trendingCols}
                    rows={trendingRows}
                    getRowId={(row) => row.ID}
                    sx={{
                        width: "30vw",
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
                                <DataGrid name="Latest"
                    columns={latestCols}
                    rows={latestRows}
                    getRowId={(row) => row.ID}
                    sx={{
                        width: "30vw",
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
                <Box sx={{
                    backgroundColor:"white",
                        width: "20vw",
                        height: "30vh",
                        display:'table',
                        borderRadius: "20px",
                        alignItems:'left',
                        justifyContent:'left'
                }}>
            
                <Typography variant="h6" marginLeft="20px" marginTop="20px" align='left'>
                    Sum of sales: {sumOrders}
                </Typography>
                <Typography variant="h6" marginLeft="20px" marginTop="20px" align='left'>
                    Count of sales: {countOrders}
                </Typography>
   
                </Box>
            </Grid>
            </Grid>



        </ThemeProvider>


    );
}