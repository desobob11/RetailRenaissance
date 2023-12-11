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
import DetailPanel from './UsersPanel'





// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export default function UsersSummary() {


    const [userRows, setUserRows] = useState([]);
    const [userCols, setUserCols] = useState([]);
    const [selectedUser, setSelectedUser] = useState({});
    const [isManager, setIsManager] = useState(false);



    useEffect(() => {
        if (userRows.length == 0) {
            get_user_data()
        }
        setIsManager(selectedUser.manager_id != null);
    }, [selectedUser]);

    


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
                    setIsManager(params.row.manager_id != null); // Set isManager based on manager_id
                };
                return (
                    <Button onClick={onView} color="primary" variant="contained" style={{ marginRight: '8px' }}>
                        View
                    </Button>
                );
            },
            width: 100
        };
    };



    const createColumns = (data) => {
        const baseColumns = data.map(col => {
            if (col.field === 'user_id') { 
                return { ...col, headerName: 'User ID', };
            }
            if (col.field === 'email') { 
                return { ...col, headerName: '  Email', hideable: true};
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
                <DetailPanel 
                firstName={selectedUser.first_name}
                lastName={selectedUser.last_name} 
                user_id={selectedUser.user_id} 
                email={selectedUser.email}
                employee_date_hired={selectedUser.employee_date_hired}
                manager_id={selectedUser.manager_id}
                manager_branch_id={selectedUser.manager_branch_id}
                isManager={isManager}
                >
                </DetailPanel>
                <DataGrid
                    columns={userCols}
                    rows={userRows}
                    getRowId={(row) => row.user_id}
                    initialState={{
                        columns: {
                            columnVisibilityModel: {
                                email: false,
                                employee_date_hired: false,
                                manager_id: false,
                                manager_branch_id: false,

                            },
                        },
                    }}
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