import * as React from 'react';
import { useState, useEffect } from "react";
import CssBaseline from '@mui/material/CssBaseline';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { ThemeProvider } from '@mui/material/styles';
import { DataGrid } from '@mui/x-data-grid';
import { Box } from '@mui/material';

import App, { get_columns, theme } from "../App";
import Navbar from './Navbar';
import "../styles.css";
import Button from '@mui/material/Button';


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

export default function Products() {
    const [productsRow, setProductsRows] = useState([]);
    const [productsCols, setProductsCols] = useState([]);

    useEffect(() => {
        if (productsRow.length === 0) {
            get_product_data();
        }
    }, [productsRow]);

    const get_product_data = () => {
       let paramString = `Product_get_all_data;;;()`;
        const options = {
            method: "POST",
            headers: { "Content-Type": "text/plain" },
            body: paramString,
        };
        fetch('http://127.0.0.1:8080/', options)
          .then(response => response.json())
          .then(result => {
              setProductsRows(result["result"]);
              setProductsCols(createColumns(get_columns(result["result"])));
          });
    };



    const createActionsColumn = () => {
        return {
          field: 'actions',
          headerName: 'Actions',
          sortable: false,
          filterable: false,
          renderCell: (params) => {
            const onRemove = () => {
              // Implement  remove logic here, e.g. call an API to remove the data from the database
              console.log('Remove', params.row);
            };
            return (
              <>
                <Button onClick={onRemove} color="secondary" variant="contained">
                  Remove
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
                return { ...col, headerName: 'Product ID',};
            }
            if (col.field === 'product_name') { 
                return { ...col, headerName: 'Product Name',};
            }
            if (col.field === 'price') { 
                return { ...col, headerName: 'Price',};
            }
            if (col.field === 'branch_id') { 
                return { ...col, headerName: 'Branch ID',};
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
                All Products
                <Box sx={{
                    width: "85%",
                    height: "60vh",
                    background: "white",
                    fontFamily: "Calibri",
                    '& .row-highQuantity': { backgroundColor: '#C8E6C9' }, // light green
                    '& .row-midQuantity': { backgroundColor: '#FFF9C4' }, // light yellow
                    '& .row-lowQuantity': { backgroundColor: '#FFCDD2' }, // light red
                }}>
                    <DataGrid 
                        columns={productsCols} 
                        rows={productsRow} 
                        getRowId={(row) => row.product_id} // Adjust to your data's unique identifier
                        onRowSelectionModelChange={(id) => {
                            let record = productsRow.filter((x) => x.ID == id);
                            alert(JSON.stringify(record));
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
