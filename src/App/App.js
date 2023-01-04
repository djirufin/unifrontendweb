import React from 'react';
import './App.css';
import { makeStyles, CssBaseline, createTheme, ThemeProvider } from '@material-ui/core';
import {Switch, Route, BrowserRouter} from "react-router-dom";
import Users from '../pages/users/user';
import Login from '../pages/authentication/Login';
import NewOrder from '../pages/logistics/neworder';
import Logistics from '../pages/logistics';
import Organisation from '../pages/users/organisation';

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
    paddingLeft: '250px',
    width: '100%'
  }
})

function App() {
  const classes = useStyles();

  return (
    <>
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <div className={classes.appMain}>
            <Switch>
              <Route exact path="/" component={ Login } />
              <Route exact path="/users"  component={ Users } />
              <Route exact path='/logistic/no' component={ NewOrder } />
              <Route exact path="/logistic/mm" component={ Logistics } />
              <Route exact path="/management/org" component={ Organisation } />
            </Switch>
          </div>
          <CssBaseline />
        </ThemeProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
