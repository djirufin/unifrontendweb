import React from 'react';
import './App.css';
import { makeStyles, createTheme, ThemeProvider } from '@material-ui/core';
import {Switch, Route, BrowserRouter} from "react-router-dom";
import dashboard from '../pages/dashboard/dashboard';
import Login from '../pages/Authticate/Login';
import Transfer from '../pages/logistic/transfer/Transfer';
import Transaction from '../pages/logistic/Transaction';
import Acknowledge from '../pages/logistic/acknowledge/Acknowledge';
import Trace from '../pages/logistic/trace/Trace';
import searchProduct from '../pages/logistic/trace/searchProduct';
import Availability from '../pages/logistic/availability/Availability';
import Issues from '../pages/logistic/issues/Issues';
import Inventory from '../pages/logistic/inventory/Inventory';
import Dispatch from '../pages/logistic/dispatch/Dispatch';
import Logistics from '../pages/logistic/Logistics';
import Eum from '../pages/eum/Eum';
import Nutrition from '../pages/eum/nutrition/Nutrition';

const theme = createTheme({
  palette: {
    primary: {
      main: "#1cabe2",
      light: '#d2f6ff'
    },
    secondary: {
      main: "#f83245",
      light: '#f8324526'
    },
    background: {
      default: "#f4f5fd"
    },
  },
  overrides:{
    MuiAppBar:{
      root:{
        transform:'translateZ(0)'
      }
    }
  },
  props:{
    MuiIconButton:{
      disableRipple:true
    }
  }
})


const useStyles = makeStyles({
  appMain: {
  }
})

function App() {
  const classes = useStyles(); 

  return (
    <>
      <ThemeProvider theme={theme}>
        <BrowserRouter basename='/unifrontendweb'>
            <Switch>
              <Route exact path="/" component={ Login } />
              <Route path="/dashboard" component={ dashboard } />
              {/* <Route path="/logistics"  component={ Logistics } />
              <Route path="/transfer" component={ Transfer } />
              <Route path="/transactions" component={ Transaction } />
              <Route path="/acknowledge" component={ Acknowledge } />
              <Route path="/trace" component={ Trace } />
              <Route path="/search" component={ searchProduct } />
              <Route path="/availability" component={ Availability } />
              <Route path="/issues" component={ Issues } />
              <Route path="/inventory" component={ Inventory } />
              <Route path="/dispatch" component={ Dispatch } />
              <Route path="/eum" component={ Eum } />
              <Route path="/nutrition" component={ Nutrition } /> */}
            </Switch>
        </BrowserRouter>
      </ThemeProvider>
    </>
  );
}

export default App;
