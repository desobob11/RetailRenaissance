import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import { useState, useEffect, setState } from "react";
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import App, { tablify, parse_bool, theme, get_columns } from "../App";
import Navbar from './Navbar';
import "../styles.css"
import Table from '@mui/material/Table';
import DetailPanel from './CustomerPanel'
import Typography from '@mui/material/Typography';
import { createTheme, makeStyles, ThemeProvider } from '@mui/material/styles';
import { TableBody, TableHead, TableRow, Box } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { columnsStateInitializer } from '@mui/x-data-grid/internals';
import Button from '@mui/material/Button';





const defaultTheme = createTheme();

export default function Customers() {
    const [custName, setCustName] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [address, setAddress] = useState("");
    const [totalOrder, setTotalOrder] = useState("");
    const [completed, setCompleted] = useState("");
    const [totalSales, setTotalSales] = useState("");

    const [customerRows, setCustomerRows] = useState([]);
    const [customerCols, setCustomerCols] = useState([]);
    const [selectedCustomer, setSelectedCustomer] = useState({});

    useEffect(() => {
        if (customerRows.length == 0) {
            get_customer_data()
        }
   
    }, []);




    const get_customer_data = (event) => {
        let paramString = `CUSTOMERS_get_all_data;;;()`;
        const options = {
            method: "POST",
            headers: { "Content-Type": "text/plain" },
            body: paramString,
        };
        fetch('http://127.0.0.1:8080/', options).then(response => response.json()).then(result => {
            setCustomerRows(result["result"]);
            setCustomerCols(createColumns(get_columns(result["result"])));
        });

    }




    const createActionsColumn = () => {
        return {
          field: 'actions',
          headerName: 'Actions',
          sortable: false,
          renderCell: (params) => {
            const onView = () => {
              setSelectedCustomer(params.row);
              console.log(params.row);
            };
            return (
              <>
                <Button onClick={onView} color="primary" variant="contained" style={{ marginRight: '8px' }}>
                  View
                </Button>
              </>
            );
          },

          width: 100
        };
      };



    const createColumns = (data) => {
        const baseColumns = data.map(col => {
            if (col.field === 'customer_id') { 
                return { ...col, headerName: 'Customer ID', };
            }
            if (col.field === 'phone_num') { 
                return { ...col, headerName: 'Phone-Number',};
            }
            if (col.field === 'email') { 
                return { ...col, headerName: '  Email',};
            }
            if (col.field === 'first_name') { 
                return { ...col, headerName: 'First Name',};
            }
            if (col.field === 'last_name') { 
                return { ...col, headerName: 'Last Name',};
            }
            if (col.field === 'address') { 
                return { ...col, headerName: 'Address',};
            }
            if (col.field === 'sales') { 
                return { ...col, headerName: 'Sales',};
            }
            if (col.field === 'cancelled') { 
                return { ...col, headerName: 'Cancelled', cellClassName: getOrdersCancelledClassName };
            }
            if (col.field === 'completed') { 
                return { ...col, headerName: 'Completed', cellClassName: getOrdersCompletedClassName };

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
        if (cancelled >= 0 ) {
            return 'row-cancelled';
        };
    }



    const totalOrders = selectedCustomer.completed + selectedCustomer.cancelled;
    




    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
        <Box
        sx={{
            alignContent:"center",
            display:'in-line',
            width:"100vw",
            height:"100vh"
        }}>
            <Navbar></Navbar>
                <DetailPanel 
                custName={selectedCustomer.first_name}
                lastName={selectedCustomer.last_name} 
                customer_id={selectedCustomer.customer_id} 
                phone={selectedCustomer.phone_num}
                email={selectedCustomer.email}
                address={selectedCustomer.address}
                totalOrder={totalOrders} 
                totalSales={selectedCustomer.sales} 
                completed={selectedCustomer.completed} 
                cancelled={selectedCustomer.cancelled} 
                >
                </DetailPanel>
                <Typography variant="h4" component="h2" gutterBottom style={{ marginLeft:'140px', marginTop: "2%",}}>
            Customer Summary
         </Typography> 
                <DataGrid
                    columns={customerCols}
                    rows={customerRows}
                    getRowId={(row) => row.customer_id}
                    initialState={{
                        columns: {
                            columnVisibilityModel: {
                                email: false,
                                phone_num: false,
                                address: false,
                                sales: false,


                            },
                        },
                    }}
                    sx={{
                        marginTop:"1%",
                        width: "80%",
                        height: "900px",
                        background: "white",
                        fontFamily: "Calibri",
                        marginLeft:"10%",
                        border: "none",
                        borderRadius: "20px",
                        '& .row-complete': { backgroundColor: '#C8E6C9' }, // light green
                        '& .row-cancelled': { backgroundColor: '#FFCDD2' }, // light red

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