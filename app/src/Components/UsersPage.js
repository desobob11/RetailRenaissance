import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import { useState, useEffect, setState } from "react";
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import App, { tablify, parse_bool, theme, get_columns} from "../App";
import Navbar from './Navbar';
import "../styles.css"
import Table from '@mui/material/Table';
import Button from '@mui/material/Button';
import { Box } from '@mui/material';
import Typography from '@mui/material/Typography';
import { createTheme, makeStyles, ThemeProvider } from '@mui/material/styles';
import { TableBody, TableHead, TableRow } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';


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







const defaultTheme = createTheme();

export default function UsersPage() {



    const [userRows, setUserRows] = useState([]);
    const [userCols, setUserCols] = useState([]);

  
    useEffect(() => {
        if (userRows.length == 0) {
            //get_user_data()
        }
   
    }, []);


    const get_user_data = (event) => {
        let paramString = `user_summary;;;()`;
        const options = {
            method: "POST",
            headers: { "Content-Type": "text/plain" },
            body: paramString,
        };
        fetch('http://127.0.0.1:8080/', options).then(response => response.json()).then(result => {
            setUserRows(result["result"]);
            setUserCols(createColumns(get_columns(result["result"])));
        });

      }



 
    const createActionsColumn = () => {
        return {
          field: 'actions',
          headerName: 'Actions',
          sortable: false,
          renderCell: (params) => {
            const onDectivate = () => {
              // Implement im not done but im assuming you gotta be like call an API to remove the data from the database havent gotten here yet 
              console.log('Remove', params.row);
            };
            return (
              <>
                <Button onClick={onDectivate} color="secondary" variant="contained">
                  Deactivate
                </Button>
              </>
            );
          },
          width: 175 
        };
      };




    const createColumns = (data) => {
        const baseColumns = data.map(col => {
            if (col.field === 'user_id') { 
                return { ...col, headerName: 'User ID', };
            }
            if (col.field === 'phone_num') { 
                return { ...col, headerName: 'Phone-Number',};
            }
            if (col.field === 'email') { 
                return { ...col, headerName: 'Email',};
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
            return col;
        });
        const actionsColumn = createActionsColumn();
        baseColumns.push(actionsColumn);

        return baseColumns;
    };






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
                <DataGrid
                    columns={userCols}
                    rows={userRows}
                    getRowId={(row) => row.user_id}
                    sx={{
                        marginTop:"1%",
                        width: "80%",
                        height: "1000px",
                        background: "white",
                        fontFamily: "Calibri",
                        marginLeft:"10%",
                        border: "none",
                        borderRadius: "20px",
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

