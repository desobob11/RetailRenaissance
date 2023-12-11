import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import { useState, useEffect, setState } from "react";
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import App, { tablify, parse_bool, theme, get_columns } from "../App";
import Navbar from './Navbar';
import "../styles.css"
import Table from '@mui/material/Table';

import Typography from '@mui/material/Typography';
import { createTheme, makeStyles, ThemeProvider } from '@mui/material/styles';
import { TableBody, TableHead, TableRow, Box } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { columnsStateInitializer } from '@mui/x-data-grid/internals';





// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export default function DetailPanel(props) {
    
    const boldStyle = { fontWeight: 'bold', color: 'black' };

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [employee_date_hired, setEmployee_date_hired] = useState("");
    const [manager_id, setManager_id] = useState("");
    const [manager_branch_id, setManager_branch_id] = useState("");
    const [isManager, setIsManager] = useState(false);




    useEffect(() => {
        setFirstName(props.firstName);
        setLastName(props.lastName);
        setEmail(props.email);
        setEmployee_date_hired(props.employee_date_hired);
        setManager_id(props.manager_id);
        setManager_branch_id(props.manager_branch_id);
        setIsManager(props.isManager);
      }, [props.firstName, props.lastName, props.email, props.employee_date_hired, props.manager_id, props.manager_branch_id, props.isManager]);






      return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Typography variant="h4" component="h2" gutterBottom style={{ marginTop: '5vh', marginLeft:'145px'}}>
            Users Details
         </Typography>
            <Box
                sx={{
                    background: "white",
                    width: "80%",
                    margin: "1% auto 0", // centers the box with a top margin of 5% gang gang
                    fontFamily: "Calibri",
                    border: "1px solid lightgrey",
                    borderRadius: "20px",
                    padding: 2,
                    display: 'flex', 
                    alignItems: 'center', // centers items vertically
                    alignItems: 'flex-start', // aligns items to the start of the flex container

                }}
            >                
                <Box sx={{ flex: 1, textAlign: 'center', padding: 2, marginTop: 2, }}> {/* Flex 1 for equal width */}
                    <Typography variant="h5" gutterBottom>
                        {props.firstName} {props.lastName} 
                    </Typography>
                    <Typography color="textSecondary">
                    <span style={boldStyle}>User ID:</span> {props.user_id}
                    </Typography>
                </Box>
                <Box sx={{ flex: 2, borderLeft: '1px solid lightgrey', borderRight: '1px solid lightgrey', paddingLeft: 5}}> {/* Flex 2 for dbl wif */}
                    <Typography variant="h6" gutterBottom>
                        EMPLOYEE INFORMATION
                    </Typography>
                    <Typography color="textSecondary">
                    <span style={boldStyle}>Email:</span> {props.email}
                    </Typography>
                    <Typography color="textSecondary">
                    <span style={boldStyle}>Date Hired:</span> {props.employee_date_hired}
                    </Typography>
                </Box>
                <Box sx={{ flex: 2, paddingLeft: 2, marginLeft: 2 }}>
                    <Typography variant="h6" gutterBottom>
                        EMPLOYEE STATUS 
                    </Typography>
                    <Typography color="textSecondary">
                    <span style={boldStyle}>Manager:</span>  {isManager ? "Yes" : "No"}
                    </Typography>
                    <Typography color="textSecondary">
                    <span style={boldStyle}>Manager ID:</span>  {props.manager_id}
                    </Typography>
                    <Typography color="textSecondary">
                    <span style={boldStyle}>Branch ID:</span>  {props.manager_branch_id}
                    </Typography>
                 </Box>
            </Box>
        </ThemeProvider>
    );
}
