
import './App.css';
import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SignInSide from './Components/SignIn';
import UsersPage from './Components/Users';
import Homepage from './Components/Homepage';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
const defaultTheme = createTheme();

/**
 * This functio assumes that the result set is from a stored procedure call. This means
 * that the results sit is an array with length n=2, where the first index
 * is an array of objects containing the request data, and the second index
 * is an array of objects containing metadata for the resultset (headers, etc.)
 * @param {
 * } resultset 
 */

export var login_name = "";
//export login_name;



export function tablify(resultset) {
  let arr = [];
  let row = [];
  Object.keys(resultset[0][0]).forEach((x) => {
    row.push(x);
  })
  arr.push(row);
  row = [];

  resultset[0].forEach((x) => {
    Object.values(x).forEach((y) => {
      row.push(y);
    })
    arr.push(row);
    row = [];
  })

  console.log(arr);
}


export function parse_bool(response) {
  try {
    return response["@result"];
  }
  // server response not received
  catch (error) {
    return -1;
  }
}

function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <Helmet>
        <meta name="theme-color" content="#673AAC" />
      </Helmet>
      <Router>

        <Routes>
          <Route path="/" element={<SignInSide />} />
          <Route path="/users" element={<UsersPage />} />
          <Route path="/homepage" element={<Homepage />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;

