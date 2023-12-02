import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import { useState, useEffect, setState } from "react";
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import App, { tablify, parse_bool, theme, get_columns } from "../App";
import Navbar from './Navbar';
import "../styles.css"
import Table from '@mui/material/Table';
import DetailPanel from './DetailPanel'
import Typography from '@mui/material/Typography';
import { createTheme, makeStyles, ThemeProvider } from '@mui/material/styles';
import { TableBody, TableHead, TableRow, Box } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { columnsStateInitializer } from '@mui/x-data-grid/internals';
import Button from '@mui/material/Button';
import SuppliersPanel from './SuppliersPanel';




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

export default function Suppliers() {
    const [contactNumber, setContactNumber] = useState("");
    const [contactEmail, setContactEmail] = useState("");
    const [address, setAddress] = useState("");
    const [totalReceived, setTotalReceived] = useState("");
    const [averageDelay, setAverageDelay] = useState("");
    const [selectedID, setSelectedID] = useState("");
    const [selectedName, setSelectedName] = useState("");

    const [detailRow, setDetailRow] = useState([])
    const [detailCol, setDetailCol] = useState([])

    const [supplierRows, setSupplierRows] = useState([]);
    const [supplierCols, setSupplierCols] = useState([]);



    useEffect(() => {
        if (supplierRows.length == 0) {
            get_supplier_data()
        }
        if (selectedID != "") {
            get_supplier_detail();
        }

        if (detailRow.length != 0) {
            setContactNumber(detailRow[0]["Contact Number"]);
            setContactEmail(detailRow[0]["Contact Email"]);
            setAddress(detailRow[0]["Address"]);
            setTotalReceived(detailRow[0]["Shipments Received"]);
            setAverageDelay(detailRow[0]["Average Shipping Delay"]);
        }
        

    }, [selectedID, detailRow]);


    const get_supplier_data = (event) => {
        let paramString = `SUPPLIERS_supplier_summary;;;()`;
        const options = {
            method: "POST",
            headers: { "Content-Type": "text/plain" },
            body: paramString,
        };
        fetch('http://127.0.0.1:8080/', options).then(response => response.json()).then(result => {
            setSupplierRows(result["result"]);
            setSupplierCols(createColumns(get_columns(result["result"])));
        });
    }

    const get_supplier_detail = (event)  => {
        let paramString = `SUPPLIERS_supplier_detail;;;(${selectedID})`;
        const options = {
            method: "POST",
            headers: { "Content-Type": "text/plain" },
            body: paramString,
        };
        fetch('http://127.0.0.1:8080/', options).then(response => response.json()).then(result => {
            setDetailRow(result["result"]);
            setDetailCol(createColumns(get_columns(result["result"])));
        });
    }

    const createActionsColumn = () => {
        return {
            field: 'actions',
            headerName: 'Actions',
            sortable: false,
            renderCell: (params) => {
                const onView = () => {
                    setSelectedID(params.row["ID"]);
                    setSelectedName(params.row["Company Name"])
                };
                const onRemove = () => {
                    // Implement im not done but im assuming you gotta be like call an API to remove the data from the database havent gotten here yet 
                    console.log('Remove', params.row);
                };
                return (
                    <>
                        <Button onClick={onView} color="primary" variant="contained" style={{ marginRight: '8px' }}>
                            View
                        </Button>
                        <Button onClick={onRemove} color="secondary" variant="contained">
                            Remove
                        </Button>
                    </>
                );
            },
            width: 175
        };
    };



    const createColumns = (data) => {
        const baseColumns = data.map(col => {
            if (col.field === 'customer_id') {
                return { ...col, headerName: 'Customer ID', };
            }
            if (col.field === 'phone_num') {
                return { ...col, headerName: 'Phone-Number', };
            }
            if (col.field === 'email') {
                return { ...col, headerName: '  Email', };
            }
            if (col.field === 'first_name') {
                return { ...col, headerName: 'First Name', };
            }
            if (col.field === 'last_name') {
                return { ...col, headerName: 'Last Name', };
            }
            if (col.field === 'address') {
                return { ...col, headerName: 'Address', };
            }
            if (col.field === 'sales') {
                return { ...col, headerName: 'Sales', };
            }
            if (col.field === 'cancelled') {
                return { ...col, headerName: 'Cancelled', cellClassName: getOrdersCompletedClassName };
            }
            if (col.field === 'completed') {
                return { ...col, headerName: 'Completed', cellClassName: getOrdersCancelledClassName };
            }
            return col;
        });
        const actionsColumn = createActionsColumn();
        baseColumns.push(actionsColumn);

        return baseColumns;
    };



    const getOrdersCompletedClassName = (params) => {
        const completed = params.row.completed;
        console.log(completed);
        if (completed >= 0) {
            return 'row-complete';
        };
    }


    const getOrdersCancelledClassName = (params) => {
        const cancelled = params.row.cancelled;
        console.log(cancelled);
        if (cancelled >= 0) {
            return 'row-cancelled';
        };
    }



    //const totalOrders = selectedCustomer.completed + selectedCustomer.cancelled;




    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Box
                sx={{
                    alignContent: "center",
                    display: 'in-line',
                    width: "100vw",
                    height: "100vh"
                }}>
                <Navbar></Navbar>
                <SuppliersPanel
                    number={contactNumber}
                    email={contactEmail}
                    address={address}
                    id={selectedID}
                    received={totalReceived}
                    delay={averageDelay}
                    name={selectedName}
                >
                </SuppliersPanel>
                <DataGrid
                    columns={supplierCols}
                    rows={supplierRows}
                    getRowId={(row) => row.ID}
                    sx={{
                        marginTop: "1%",
                        width: "80%",
                        height: "1000px",
                        background: "white",
                        fontFamily: "Calibri",
                        marginLeft: "10%",
                        border: "none",
                        borderRadius: "20px",
                        '& .row-complete': { color: '#00BB00' }, // light green
                        '& .row-cancelled': { color: '#BB0000' } // light yellow
                    }}
                    onRowSelectionModelChange={(id) => {
                        // let record = userRows.filter((x) => {
                        //      return x.ID == id;
                        //  })
                        //  alert(JSON.stringify(record));
                    }}
                    classes={{
                        columnHeader: 'myGridHeader',
                        footer: 'myGridFooter',
                    }}

                >
                </DataGrid>
            </Box>


        </ThemeProvider>


    );
}