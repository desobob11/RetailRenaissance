import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import BarChartIcon from '@mui/icons-material/BarChart';
import LayersIcon from '@mui/icons-material/Layers';
import AssignmentIcon from '@mui/icons-material/Assignment';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import ReceiptIcon from '@mui/icons-material/Receipt';
import PeopleIcon from '@mui/icons-material/People';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import HouseIcon from '@mui/icons-material/House';
import House from '@mui/icons-material/House';
import "../styles.css"
import { Typography } from '@mui/material';
import Box from '@mui/material/Box';
import { useNavigate, Link } from 'react-router-dom';
import List from '@mui/material/List';

export const mainListItems = (
    <React.Fragment>
        <ListItemButton component={Link} to="/homepage">
            <ListItemIcon>
                <HouseIcon className="icon"/>
            </ListItemIcon>
            <ListItemText primary={<Typography component="span">
                <Box className="navbar-text">
                    Home
                </Box>
            </Typography>} />
        </ListItemButton>
        <ListItemButton component={Link} to= "/Products">
            <ListItemIcon>
                <ShoppingCartIcon className="icon"  />
            </ListItemIcon>
            <ListItemText primary={<Typography component="span">
                <Box className="navbar-text">
                    Products
                </Box>
            </Typography>} />
        </ListItemButton>
        <ListItemButton component={Link} to= "/Transactions">
            <ListItemIcon>
                <ReceiptIcon className="icon" />
            </ListItemIcon>
            <ListItemText primary={<Typography component="span">
                <Box className="navbar-text">
                    Transactions
                </Box>
            </Typography>} />
        </ListItemButton>
        <ListItemButton component={Link} to="/customers">
            <ListItemIcon>
                <PeopleIcon className="icon" />
            </ListItemIcon >
            <ListItemText primary={<Typography component="span">
                <Box className="navbar-text"t>
                    Customers
                </Box>
            </Typography>} />
        </ListItemButton>
        <ListItemButton component={Link} to="/suppliers">
            <ListItemIcon>
                <LocalShippingIcon className="icon" />
            </ListItemIcon >
            <ListItemText primary={<Typography component="span">
                <Box className="navbar-text">
                    Suppliers
                </Box>
            </Typography>} />
        </ListItemButton>
        <ListItemButton component={Link} to="/users">
            <ListItemIcon>
                <AdminPanelSettingsIcon className="icon" />
            </ListItemIcon>
            <ListItemText primary={<Typography component="span">
                <Box className="navbar-text">
                    Users
                </Box>
                </Typography>} />
        </ListItemButton>
        <ListItemButton component={Link} to="/" onClick={() => { window.active_user_id = 0; alert(window.active_user_id);}}>
            <ListItemIcon>
            </ListItemIcon >
            <ListItemText primary={<Typography component="span">
                <Box className="navbar-text">
                    Logout
                </Box>
            </Typography>} />
        </ListItemButton>
    </React.Fragment>
);

export const secondaryListItems = (
    <React.Fragment>
        <ListSubheader component="div" inset>
            Saved reports
        </ListSubheader>
        <ListItemButton>
            <ListItemIcon>
                <AssignmentIcon />
            </ListItemIcon>
            <ListItemText primary="Current month" />
        </ListItemButton>
        <ListItemButton>
            <ListItemIcon>
                <AssignmentIcon />
            </ListItemIcon>
            <ListItemText primary="Last quarter" />
        </ListItemButton>
        <ListItemButton>
            <ListItemIcon>
                <AssignmentIcon />
            </ListItemIcon>
            <ListItemText primary="Year-end sale" />
        </ListItemButton>
    </React.Fragment>
);




export default function Navbar() {
    return (<List
        sx={{
            width: "100%",
            display: "flex",
            flexDirection: "row",
            background: "White",
            boxShadow:1,
            height:"10vh"
        }}
    >
        {mainListItems}
    </List>);
}
