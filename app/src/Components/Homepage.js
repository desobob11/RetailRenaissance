import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import { useState, useEffect, setState } from "react";
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { useRef, Component } from 'react'
import { tablify, parse_bool } from "../App";
import { Navigate, useNavigate } from 'react-router-dom';
import { mainListItems, secondaryListItems } from './ListItems';

import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';

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

export default function Homepage() {






    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    let nav = useNavigate();

    const getUsername = (event) => {
        setUsername(event.target.value);
    }

    const getPassword = (event) => {
        setPassword(event.target.value);
    }

    const [serverResponse, setServerResponse] = useState({});



    const sendLogin = (event) => {
        let paramString = `request_login;;;('${username}','${password}')`;
        const options = {
            method: "POST",
            headers: { "Content-Type": "text/plain" },
            body: paramString,
        };
        fetch('http://127.0.0.1:8080/', options).then(response => response.json()).then(result => {
            let login_flag = result["result"][0]["@result"];
            if (login_flag == 1) {
                nav("/users");
            }
            else {
                alert("Invalid Credentials");
            }
        });

    }



    const fieldRef = useRef("Hello, World!")


    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        console.log({
            email: data.get('email'),
            password: data.get('password'),
        });
    };

    return (
        <ThemeProvider theme={defaultTheme}>
            <mainListItems>
                
            </mainListItems>


        </ThemeProvider>


    );
}