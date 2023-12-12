import * as React from 'react';
import { useState, useEffect } from "react";
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { ThemeProvider } from '@mui/material/styles';
import { DataGrid } from '@mui/x-data-grid';
import { Box } from '@mui/material';

import App, { get_columns, theme } from "../App";
import Navbar from './Navbar';
import "../styles.css";
import Button from '@mui/material/Button';
import { useNavigate, Link } from 'react-router-dom';



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




    const createColumns = (data) => {
        return data.map(col => {
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
         <Typography align="right" marginRight="14vw" marginBottom={12}>
                    <Button component={Link} to="/addproduct" variant="contained" >
                        Add Product
                    </Button>
                </Typography>
                <Typography variant="h4" component="h2" gutterBottom style={{marginLeft:'0px', marginTop: "-11%",}}>
            Products Summary
         </Typography> 
                <Box sx={{
                    width: "85%",
                    height: "60vh",
                    background: "white",
                    fontFamily: "Calibri",
                    '& .row-highQuantity': { color: '#00BB00' }, // light green
                    '& .row-midQuantity': { color: '#FF9900' }, // light yellow
                    '& .row-lowQuantity': { color: '#BB0000' }, // light red
                }}>
                    
                    <DataGrid 
                        columns={productsCols} 
                        rows={productsRow} 
                        getRowId={(row) => row.product_id} // Adjust to your data's unique identifier
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
