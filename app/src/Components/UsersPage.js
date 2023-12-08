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
import Typography from '@mui/material/Typography';
import { createTheme, makeStyles, ThemeProvider } from '@mui/material/styles';
import { TableBody, TableHead, TableRow , Box} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import DetailPanel from './CustomerPanel'





// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export default function UsersSummary() {


    const [userRows, setUserRows] = useState([]);
    const [userCols, setUserCols] = useState([]);
    const [selectedUser, setSelectedUser] = useState({});


    useEffect(() => {
        if (userRows.length == 0) {
            get_user_data()
        }
   
    }, []);



    const get_user_data = (event) => {
        let paramString = `User_user_summary;;;()`;
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
            const onView = () => {
              setSelectedUser(params.row);
              console.log(params.row);
            };
            const onDeactivate = () => {
              // Implement im not done but im assuming you gotta be like call an API to Deactivate the data from the database havent gotten here yet 
              console.log('Deactivate', params.row);
            };
            return (
              <>
                <Button onClick={onView} color="primary" variant="contained" style={{ marginRight: '8px' }}>
                  View
                </Button>
                <Button onClick={onDeactivate} color="secondary" variant="contained">
                  Deactivate
                </Button>
              </>
            );
          },
          width: 225
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
                return { ...col, headerName: '  Email',};
            }
            if (col.field === 'first_name') { 
                return { ...col, headerName: 'First Name',};
            }
            if (col.field === 'last_name') { 
                return { ...col, headerName: 'Last Name',};
            }
            if (col.field === 'employee_date_hired') { 
                return { ...col, headerName: 'Date Hired',};
            }
            if (col.field === 'manager_id') { 
                return { ...col, headerName: 'Manager ID',};
            }
            if (col.field === 'manager_branch_id') { 
                return { ...col, headerName: 'Branch ID',};
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
        if (cancelled >= 0 ) {
            return 'row-cancelled';
        };
    }



    const totalOrders = selectedUser.completed + selectedUser.cancelled;


    

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
                custName={selectedUser.first_name}
                lastName={selectedUser.last_name} 
                user_id={selectedUser.user_id} 
                phone={selectedUser.phone_num}
                email={selectedUser.email}
                address={selectedUser.address}
                >
                </DetailPanel>
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
                        '& .row-complete': { backgroundColor: '#C8E6C9' }, // light green
                        '& .row-cancelled': { backgroundColor: '#FFCDD2' }, // light red

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