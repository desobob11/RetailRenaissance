import * as React from 'react';
import { useState, useEffect } from "react";
import CssBaseline from '@mui/material/CssBaseline';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { ThemeProvider } from '@mui/material/styles';
import { DataGrid } from '@mui/x-data-grid';
import { Box } from '@mui/material';
import Button from '@mui/material/Button';
import DetailPanel from './TransactionPanel'; // Import the DetailPanel component as it is in a separate .js file
import App, { get_columns, theme } from "../App";
import Navbar from './Navbar';
import "../styles.css";



export default function Transactions() {
    const [TransactionsRow, setTransactionsRows] = useState([]);
    const [TransactionsCols, setTransactionsCols] = useState([]);
    const [selectedTransaction, setSeletecedTransaction] = useState({});
   

    const handleRefund = (id) => {
        setTransactionsRows(prevRows =>

            prevRows.map(row => row.transaction_id === id ? { ...row, status: 'Cancelled' } : row)

        );
        console.log('Refund', id);
    };

    const handleReorder = (id) => {
        setTransactionsRows(prevRows =>

            prevRows.map(row => row.transaction_id === id ? { ...row, status: 'Pending' } : row)

        );
        console.log('Reorder', id);
    };


    useEffect(() => {
        if (TransactionsRow.length === 0) {
            get_transactions_data();
        }
    }, [TransactionsRow]);



    const get_transactions_data = () => {
       let paramString = `TRANSACTION_get_all_data;;;()`;
        const options = {
            method: "POST",
            headers: { "Content-Type": "text/plain" },
            body: paramString,
        };
        fetch('http://127.0.0.1:8080/', options)
          .then(response => response.json())
          .then(result => {
              setTransactionsRows(result["result"]);
              setTransactionsCols(createColumns(get_columns(result["result"])));
          });
    };


    

    const createActionsColumn = () => {
        return {
            field: 'actions',
            headerName: 'Actions',
            sortable: false,
            renderCell: (params) => {
                const { row } = params;
                const { status, transaction_id } = row;
                const onView = () => {
                    setSeletecedTransaction(params.row);
                    console.log('View', row);
                };

                return (
                    <>
                        <Button onClick={onView} color="primary" variant="contained" style={{ marginRight: '8px' }}>
                            View
                        </Button>

                        {status === 'Complete' || status === 'Pending' ? (

                            <Button onClick={() => handleRefund(transaction_id)} color="secondary" variant="contained">
                                Refund
                            </Button>
                        ) : null}

                        {status === 'Cancelled' ? (

                            <Button onClick={() => handleReorder(transaction_id)} color="secondary" variant="contained">
                                Reorder
                            </Button>
                        ) : null}
                    </>
                );
            },
            width: 200
        };
    };



    const createColumns = (data) => {
        const baseColumns = data.map(col => {

            if (col.field === 'status') { 

                return { ...col, headerName: 'Status', cellClassName: getOrderStatusClassName };
            }
            if (col.field === 'amount') { 
                return { ...col, headerName: 'Amount',};
            }
            if (col.field === 'customer_id') { 
                return { ...col, headerName: 'Customer ID',};
            }
            if (col.field === 'transaction_id') { 
                return { ...col, headerName: 'Transaction ID',};
            }
            if (col.field === 'transaction_date') { 
                return { ...col, headerName: 'Date',};
            }
            return col;
        });
        const actionsColumn = createActionsColumn();
        baseColumns.push(actionsColumn);

        return baseColumns;
    };

    const getOrderStatusClassName = (params) => {
        const status = params.row.status;
        console.log(status); // This will print the status for each row to the console
        if (status === 'Complete') {
            return 'row-complete';
        } else if (status === 'Pending') {
            return 'row-pending';
        } else if (status === 'Cancelled') {
            return 'row-cancelled';
        }
        return '';
    };

    
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Navbar />
            {selectedTransaction && selectedTransaction.transaction_id && (
                <DetailPanel 
                  transactionId={selectedTransaction.transaction_id}
                  customer_id={selectedTransaction.customer_id}
                  firstName={selectedTransaction.first_name}
                  lastName={selectedTransaction.last_name} 
                  transaction_id={selectedTransaction.transaction_id} 
                  amount={selectedTransaction.amount}
                  transaction_date={selectedTransaction.transaction_date}

                />
            )}
            <Grid className='background-grid' sx={{
                alignContent: "center",
                justifyContent: "center"
            }}>
                Transactions Summary
                <Box sx={{
                    width: "85%",
                    height: "60vh",
                    background: "white",
                    fontFamily: "Calibri",
                    '& .row-complete': { backgroundColor: '#90EE90' }, // light green
                    '& .row-pending': { backgroundColor: '#FFFFE0' }, // light yellow
                    '& .row-cancelled': { backgroundColor: '#FFC0CB' }, // light red
                }}>
                    <DataGrid 
                        columns={TransactionsCols} 
                        rows={TransactionsRow} 
                        getRowId={(row) => row.transaction_id} // Adjust to your data's unique identifier
                        initialState={{
                            columns: {
                                columnVisibilityModel: {
                                    transaction_date: false,
                                    customer_id: false,    
                                },
                            },
                        }}
                         classes={{
                            columnHeader: 'myGridHeader',
                            footer: 'myGridFooter',
                          }}
                  />
                </Box>
            </Grid>
        </ThemeProvider>
    );
}
