import * as React from 'react';
import { useState, useEffect } from "react";
import CssBaseline from '@mui/material/CssBaseline';

import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { ThemeProvider } from '@mui/material/styles';
import { DataGrid } from '@mui/x-data-grid';
import { Box, TextField, Select, MenuItem, InputLabel, FormControl} from '@mui/material';

import App, { get_columns, theme } from "../App";
import Navbar from './Navbar';
import "../styles.css";
import Button from '@mui/material/Button';
import { useNavigate, Link } from 'react-router-dom';
import { parse_bool } from '../App';


function parse_branch_ids(response) {
    var ids = []
    response.forEach((x) => {
        ids.push(x["ID"]);
    })
    return ids;
}

export default function AddProduct() {

    const [branchIDs, setBranchIDs] = useState([]);
    const [idList, setIdList] = useState([]);

    const [nameBox, setNameBox] = useState("");
    const [priceBox, setPriceBox] = useState("");
    const [stockBox, setStockBox] = useState("");
    const [branchID, setBranchID] = useState("");
  //  const [returnCode, setReturnCode] = useState(-1);


    const handleName = function(event) {
        setNameBox(event.target.value);
    }


    const handlePrice = function (event) {
        setPriceBox(event.target.value);
    }


    const handleStock = function (event) {
        setStockBox(event.target.value);
    }


    const handleBranch = function (event) {
        setBranchID(event.target.value);
    }

    useEffect(() => {
        if (branchIDs.length === 0) {
            get_branch_ids();
        }

        if (idList.length === 0) {
            setIdList(parse_branch_ids(branchIDs))
        }
    }, [,branchIDs]);

    const get_branch_ids = () => {
        let paramString = `GENERAL_get_branch_ids;;;()`;
        const options = {
            method: "POST",
            headers: { "Content-Type": "text/plain" },
            body: paramString,
        };
        fetch('http://127.0.0.1:8080/', options)
            .then(response => response.json())
            .then(result => {
                setBranchIDs(result["result"]);
            });
    };

    const add_product = () => {
        let paramString = `PRODUCTS_add_product;;;('${nameBox}', '${stockBox}', ${priceBox}, ${branchID})`;
        const options = {
            method: "POST",
            headers: { "Content-Type": "text/plain" },
            body: paramString,
        };
        fetch('http://127.0.0.1:8080/', options)
            .then(response => response.json())
            .then(result => {
                if (parse_bool(result) === 1) {
                    alert("Success!");
                }
                else {
                    alert("Failure, please check your inputs.")
                }
            });
    };



    const createActionsColumn = () => {
        return {
            field: 'actions',
            headerName: 'Actions',
            sortable: false,
            filterable: false,
            renderCell: (params) => {
                const onDeactivate = () => {
                    // Implement  remove logic here, e.g. call an API to remove the data from the database
                    console.log('Deactivate', params.row);
                };
                return (
                    <>
                        <Button onClick={onDeactivate} color="secondary" variant="contained">
                            Deactivate
                        </Button>
                    </>
                );
            },
            width: 125 // Adjust the width as needed
        };
    };

    const createColumns = (data) => {
        const baseColumns = data.map(col => {
            if (col.field === 'num_stock') {
                return { ...col, headerName: 'Current Stock', cellClassName: getQuantityClassName };
            }
            if (col.field === 'product_id') {
                return { ...col, headerName: 'Product ID', };
            }
            if (col.field === 'product_name') {
                return { ...col, headerName: 'Product Name', };
            }
            if (col.field === 'price') {
                return { ...col, headerName: 'Price', };
            }
            if (col.field === 'branch_id') {
                return { ...col, headerName: 'Branch ID', };
            }
            return col;
        });
        const actionsColumn = createActionsColumn();
        baseColumns.push(actionsColumn);
        return baseColumns;
    };

    const getQuantityClassName = (params) => {
        const num_stock = params.row.num_stock;
        console.log(num_stock); // This will print the status for each row to the console
        if (num_stock >= 600) {
            return 'row-highQuantity';
        } else if (num_stock < 600, num_stock > 500) {
            return 'row-midQuantity';
        } else if (num_stock < 500) {
            return 'row-lowQuantity';
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

                Add a Product Manually
                <Typography align="right" marginRight="20vw" marginBottom="1vh">
                    <Button variant="contained" component={Link} to="/products">
                        Products Summary
                    </Button>
                </Typography>
                <Box sx={{
                    width: "85%",
                    height: "60vh",
                    background: "white",
                    fontFamily: "Calibri",
                    display:'flex',
                    flexDirection:'column',
                    gap:"40px",
                    borderRadius:"20px",
                    '& .row-highQuantity': { color: '#00BB00' }, // light green
                    '& .row-midQuantity': { color: '#FF9900' }, // light yellow
                    '& .row-lowQuantity': { color: '#BB0000' }, // light red
                }}>
                    <TextField id="standard-basic" label="Product Name" onChange={handleName} variant="standard" sx={{width:"20%", marginLeft:"20px"}}/>
                    <TextField id="standard-basic" label="Price per Unit" variant="standard" onChange={handlePrice} sx={{ width: "20%", marginLeft: "20px" }} />
                    <TextField id="standard-basic" label="Number of stock" variant="standard" onChange={handleStock}  sx={{ width: "20%", marginLeft: "20px" }} />
                    <FormControl>
                        <InputLabel sx={{ width: "20%", marginLeft: "20px" }}>Branch Id</InputLabel>
                        <Select sx={{ width: "20%", marginLeft: "20px" }} onChange={handleBranch}
                    label="Branch Id">
                    {idList.map((val) => {
                        return <MenuItem value={val}>{val}</MenuItem>
                    })}
                    </Select>
                </FormControl>
                    <Typography align="left" marginLeft="20px">
                        <Button variant="contained" onClick={add_product}>
                            Confirm
                        </Button>
                    </Typography>
                    
                </Box>
            </Grid>
        </ThemeProvider>
    );
}
