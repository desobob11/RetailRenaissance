
import './App.css';
import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SignInSide from './Components/SignIn';
//import UsersPage from './Components/Users';
import Customers from './Components/CustomersPage';
import UsersSummary from './Components/UsersPage';
import Transactions from './Components/TransactionsPage';
import Products from './Components/ProductsPage'

import { ThemeProvider, createMuiTheme, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Reports from './Components/Reports';
import Suppliers from './Components/Suppliers';
import AddProduct from './Components/AddProduct';
import CreateShipment from './Components/CreateShipment';
import AllShipments from './Components/AllShipment';

const defaultTheme = createTheme();


/**
 * This function assumes that the result set is from a stored procedure call. This means
 * that the results sit is an array with length n=2, where the first index
 * is an array of objects containing the request data, and the second index
 * is an array of objects containing metadata for the resultset (headers, etc.)
 * @param {
 * } resultset 
 */

export var login_name = "";
//export login_name;
window.active_user_id = 0;
export var logged_in = false;
export var username = "";

export function get_columns(table) {
  let cols = [];
  Object.keys(table[0]).forEach((x) => {
    cols.push({field:x, flex:1});
  })
  return cols;
}

export function tablify(resultset) {
  let arr = [];
  let row = [];
  Object.keys(resultset["result"][0]).forEach((x) => {
    row.push(x);
  })
  arr.push(row);
  row = [];

  resultset["result"].forEach((x) => {
    Object.values(x).forEach((y) => {
      row.push(y);
    })
    arr.push(row);
    row = [];
  })

  return arr;
}

export const theme = createTheme({
  palette: {
    background:{
      default:"#EFE7EB"
    }
  }


})

export function parse_bool(response) {
  try {
    return response["result"][0]["@result"];
  }
  // server response not received
  catch (error) {
    alert(error)
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
          <Route path="/users" element={<UsersSummary />} />
          <Route path="/homepage"  element={<Reports />} />
          <Route path="/customers" element={<Customers/>} />
          <Route path="/transactions" element={<Transactions/>} />
          <Route path="/products" element={<Products/>} />
          <Route path="/suppliers" element={<Suppliers />} />
          <Route path="/addproduct" element={<AddProduct />} />
          <Route path="/createshipment" element={<CreateShipment />} />
          <Route path="/allshipments" element={<AllShipments />} />

        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;

