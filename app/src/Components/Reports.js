import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import { useState, useEffect, setState } from "react";
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import App, { tablify, parse_bool, theme, get_columns } from "../App";
import Navbar from './Navbar';
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

function get_x_axis(result) {
    var vals = []

    result.forEach((x) => {
        vals.push(x["Month"])
    })

    return vals;
}

function get_series(result) {
    var vals = []
    result.forEach((x) => {
        vals.push(x["Units Sold"])
    })
    return vals;
}




// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();


export default function Reports() {

    const [bestSellingId, setBestSellingId] = useState(1)
    const [bestSellingName, setBestSellingName] = useState("")
    const [xAxisData, setxAxisData] = useState([0])
    const [seriesData, setSeriesData] = useState([0])
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
            // set to best seller on default
          //  setBestSellingId(result["result"][0]["ID"])
           // setBestSellingName(result["result"][0]["Name"])
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

        const get_graph_data = (event) => {
            let paramString = `REPORTS_line_graph;;;(${bestSellingId})`;
            const options = {
                method: "POST",
                headers: { "Content-Type": "text/plain" },
                body: paramString,
            };
            fetch('http://127.0.0.1:8080/', options).then(response => response.json()).then(result => {
                setxAxisData(get_x_axis(result["result"]));
                setSeriesData(get_series(result["result"]));
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
        

        get_graph_data();
        }, [bestSellingName]);





    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />


            <Navbar />
            <Typography variant="h4" marginLeft="10vw" marginTop="5vh">
                Best Selling Products
            </Typography>
        
            <Grid container spacing={4}className='background-grid' sx={{
                alignContent: "center",
                justifyContent: "center",
                '& .row-highQuantity': { color: '#00BB00' }, // light green
                '& .row-midQuantity': { color: '#FF9900' }, // light yellow
                '& .row-lowQuantity': { color: '#BB0000' }, // light red
            }}>
          

            <Grid item marginTop="2vh">
                <DataGrid name="bestSelling"
                    columns={bestSellingCols}
                    rows={bestSellingRows}
                    getRowId={(row) => row.ID}
                    getCellClassName={(x) => {
                        if (x.field === "Current Stock" && x.value >= 600) {
                            return 'row-highQuantity';
                        }
                        else if (x.field === "Current Stock" && x.value <= 200) {
                            return 'row-lowQuantity';
                        }
                        else if (x.field === "Current Stock") {
                            return 'row-midQuantity'; 
                        }
                    }}
                    sx={{
                        width: "80vw",
                        height: "30vh",
                        background: "white",
                        fontFamily: "Calibri",
                        border: "none",
                        borderRadius: "20px"
                    }}
                    onRowSelectionModelChange={(id) => {
                        let record = bestSellingRows.filter((x) => {
                            return x.ID == id;
                        })
                        setBestSellingId(record[0]["ID"])
                        setBestSellingName(record[0]["Name"])
                    }}
  

                    classes={{
                        columnHeader: 'myGridHeader',
                        footer: 'myGridFooter',
                      }}
                >
                </DataGrid>
            </Grid>
                <Typography variant="h4" marginLeft="10vw" marginTop="5vh">
                    {bestSellingName}, Monthly Sales YTD
                </Typography>
                <Box sx={{
                    width: "80vw",
                    height: "60vh",
                    marginLeft: "8vw"

                }}>
                    <LineChart
                        xAxis={[{ data: xAxisData }]}
                        series={[
                            {
                                data: seriesData,
                            },
                        ]}

                    />

                </Box>

            <Grid item>
            
                    <Typography variant="h5" textAlign={"center"}>
                        Trending Products (90 Days)
                    </Typography>
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
 
                classes={{
                    columnHeader: 'myGridHeader',
                    footer: 'myGridFooter',
                  }}
                >
                </DataGrid>
                   </Grid>
                <Grid item textAlign={"center"}>
                    <Typography variant="h5" >
                        Latest Transactions
                    </Typography>
                 <DataGrid name="Latest"
                    columns={latestCols}
                    rows={latestRows}
                    getRowId={(row) => row.ID}
                    getCellClassName={(x) => {
                        if (x.field === "Status" && x.value === "Cancelled") {
                            return 'row-lowQuantity';
                        }
                        else if (x.field === "Status" && x.value === "Complete") {
                            return 'row-highQuantity';
                        }
                        else if (x.field === "Status") {
                            return 'row-midQuantity';
                        }
                    }}
                    sx={{
                        width: "30vw",
                        height: "30vh",
                        background: "white",
                        fontFamily: "Calibri",
                        border: "none",
                        borderRadius:"20px"
                    }}


                >
                    
                </DataGrid>
            </Grid>
            <Grid item>
                    <Typography variant="h5" textAlign={"center"}>
                        Order Summary (Last 30 Days)
                    </Typography>
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