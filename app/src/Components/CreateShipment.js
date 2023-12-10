import * as React from 'react';
import { useState, useEffect } from "react";
import CssBaseline from '@mui/material/CssBaseline';

import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { ThemeProvider } from '@mui/material/styles';
import { DataGrid } from '@mui/x-data-grid';
import { Box, TextField, Select, MenuItem, InputLabel, FormControl, Autocomplete } from '@mui/material';

import App, { get_columns, theme,  } from "../App";
import Navbar from './Navbar';
import "../styles.css";
import Button from '@mui/material/Button';
import { useNavigate, Link } from 'react-router-dom';
import { parse_bool } from '../App';


function parse_warehouse_ids(response) {
    var ids = []
    response.forEach((x) => {
        ids.push(x["ID"]);
    })
    return ids;
}

function parse_prods(response) {
    var ids = []
    response.forEach((x) => {
        ids.push(x["Product"]);
    })
    return ids;
}

function build_amounts() {
    var amounts = [];
    for (let i = 1; i < 1000; ++i) {
        amounts.push(i);
    }
    return amounts;
}

export default function CreateShipment() {

    const [warehouseIDs, setWarehouseIDs] = useState([]);
    const [idList, setIdList] = useState([]);

    const [productBox, setProductBox] = useState("");
    const [countBox, setCountBox] = useState("");

    const [warehouseBox, setWarehouseBox] = useState("");


    const [warehouseProds, setWarehouseProds] = useState([])
    const [prodList, setProdList] = useState([]);
    const amounts = build_amounts();



    const handleWarehouse = function(event) {
        setWarehouseBox(event.target.value);
    }

    const handleProductBox = function (event, value) {
        setProductBox(value);
    }

    const handleCountBox = function (event, value) {
        setCountBox(value);
    }


    const addItem = function(event) {
        if (productBox != "" && countBox != "") {
            var copy = [...rows]
            copy.push({ id: copy.length + 1, Product: productBox, Count: countBox });
            setRows(copy);    
        }
        else {
            alert("Invalid selection.")
        }
    }


    useEffect(() => {
        if (warehouseIDs.length === 0) {
            get_warehouse_ids()
        }
        if (idList.length === 0) {
            setIdList(parse_warehouse_ids(warehouseIDs))
        }

        if (warehouseBox != "") {
            get_warehouse_prods();
        }


    }, [,warehouseIDs, warehouseBox, warehouseProds]);


    const get_warehouse_ids = () => {
        let paramString = `GENERAL_get_warehouse_ids;;;()`;
        const options = {
            method: "POST",
            headers: { "Content-Type": "text/plain" },
            body: paramString,
        };
        fetch('http://127.0.0.1:8080/', options)
            .then(response => response.json())
            .then(result => {
                setWarehouseIDs(result["result"]);
            });
    };

    const get_warehouse_prods = () => {
        let paramString = `SHIPMENT_get_prods_warehouse;;;(${warehouseBox})`;
        const options = {
            method: "POST",
            headers: { "Content-Type": "text/plain" },
            body: paramString,
        };
        fetch('http://127.0.0.1:8080/', options)
            .then(response => response.json())
            .then(result => {
                setProdList(parse_prods(result["result"]));
            });
    };


    const confirm_shipment = () => {
        if (rows.length != 0) {

        
            let paramString = `SHIPMENT_create_shipment_row;;;(${window.active_user_id}, ${warehouseBox})`;
            const options = {
                method: "POST",
                headers: { "Content-Type": "text/plain" },
                body: paramString,
            };
            fetch('http://127.0.0.1:8080/', options)
                .then(response => response.json())
                .then(result => {

                });

            for (let i = 0; i < rows.length; ++i) {
                var row = rows[i];
                var prod_id = Number(row["Product"].split(".")[0]);
                paramString = `SHIPMENT_fill_contains;;;(${prod_id}, ${row["Count"]})`;
                const options = {
                    method: "POST",
                    headers: { "Content-Type": "text/plain" },
                    body: paramString,
                };
                fetch('http://127.0.0.1:8080/', options)
                    .then(response => response.json())
                    .then(result => {

                    });
            }
            setRows([]);
        }
        else {
            alert("Products are required when placing a shipment");
        }
        
    }
    




    
    const [rows, setRows] = useState([]);
    const cols = [
        { field: 'Product', width:300},
        { field: 'Count'}
    ];


    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Navbar />
            <Grid className='background-grid' width={"100vw"} sx={{
                alignContent: "center",
                justifyContent: "center"
            }}>

                Place a Shipment
                <Typography align="right" marginRight="20vw" marginBottom="1vh">
                    <Button variant="contained" component={Link} to="/suppliers">
                        Suppliers Summary
                    </Button>
                </Typography>
                <Grid item display={"inline-block"}>
                <Box sx={{
                    width: "20vw",
                    height: "60vh",
                    background: "white",
                    fontFamily: "Calibri",
                    display: 'flex',
                    flexDirection: 'column',
                    gap: "40px",
                    borderRadius: "20px",
                    '& .row-highQuantity': { color: '#00BB00' }, // light green
                    '& .row-midQuantity': { color: '#FF9900' }, // light yellow
                    '& .row-lowQuantity': { color: '#BB0000' }, // light red
                }}>
                    <FormControl>
                        <InputLabel sx={{ width: "150%", marginLeft: "20px", marginTop:"20px" }}>Warehouse Id</InputLabel>
                            <Select sx={{ width: "150px", marginLeft: "20px", marginTop: "20px" }} onChange={handleWarehouse}
                            label="Warehouse ID">
                            {idList.map((val) => {
                                return <MenuItem value={val}>{val}</MenuItem>
                            })}
                        </Select>
                    </FormControl>
        
                </Box>
                </Grid>

                <Grid item display={"inline-block"}>
                    <Box sx={{
                        width: "20vw",
                        height: "60vh",
                        background: "white",
                        fontFamily: "Calibri",
                        display: 'flex',
                        flexDirection: 'column',
                        gap: "40px",
                        borderRadius: "20px",
                        '& .row-highQuantity': { color: '#00BB00' }, // light green
                        '& .row-midQuantity': { color: '#FF9900' }, // light yellow
                        '& .row-lowQuantity': { color: '#BB0000' }, // light red
                    }}>
                            <Autocomplete sx={{ width: "300px", marginLeft: "20px", marginTop: "20px" }} onInputChange={handleProductBox}
                                options={prodList}
                                renderInput={(params) => <TextField {...params} label="Product" />}
                                >                                    
                            </Autocomplete>
                        <Autocomplete sx={{ width: "300px", marginLeft: "20px", marginTop: "20px" }} onInputChange={handleCountBox}
                                options={amounts}
                                renderInput={(params) => <TextField {...params} label="Count of Products" />}
                            >
                            </Autocomplete>

                        <Typography align="left" marginLeft="20px">
                            <Button variant="contained" onClick={addItem}>
                                Add Item
                            </Button>
                        </Typography>
                        <Typography align="left" marginLeft="20px">
                            <Button variant="contained" onClick={confirm_shipment}>
                                Confirm Shipment
                            </Button>
                        </Typography>
                    </Box>
                </Grid>
                <Grid item display="inline-block">
                    <DataGrid
                        columns={cols}
                        rows={rows}
                        sx={{ width: "30vw", height: "60vh", backgroundColor: "white", borderRadius: "20px"}}
                        getRowId={(row) => row.id}
                        
                    />
                </Grid>
                
            </Grid>
        </ThemeProvider>
    );
}
