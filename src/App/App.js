import React from "react";
import "./App.css";
import {
  makeStyles,
  CssBaseline,
  createTheme,
  ThemeProvider,
} from "@material-ui/core";
import { Switch, Route, BrowserRouter } from "react-router-dom";
import Users from "../pages/users/user";
import Login from "../pages/authentication/Login";
import NewOrder from "../pages/logistics/neworder";
import Logistics from "../pages/logistics";
import Organisation from "../pages/users/organisation";
import Acknowledge from "../pages/logistics/acknowledge";
import Trace from "../pages/logistics/trace";
import Issues from "../pages/logistics/issues";
import Inventory from "../pages/logistics/inventory";

const theme = createTheme({
  palette: {
    primary: {
      main: "#1cabe2",
      light: "#d2f6ff",
    },
    secondary: {
      main: "#f83245",
      light: "#f8324526",
    },
    background: {
      default: "#f4f5fd",
    },
  },
  overrides: {
    MuiAppBar: {
      root: {
        transform: "translateZ(0)",
      },
    },
  },
  props: {
    MuiIconButton: {
      disableRipple: true,
    },
  },
});

const useStyles = makeStyles({
  appMain: {
    paddingLeft: "250px",
    width: "100%",
  },
});

function App() {
  const classes = useStyles();

  return (
    <>
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <div className={classes.appMain}>
            <Switch>
              <Route exact path="/" component={Login} />
              <Route exact path="/users" component={Users} />
              <Route exact path="/logistic/no" component={NewOrder} />
              <Route exact path="/logistic/tp" component={Trace} />
              <Route exact path="/logistic/av" component={Logistics} />
              <Route exact path="/logistic/qp" component={Issues} />
              <Route exact path="/logistic/ii" component={Inventory} />
              <Route exact path="/management/org" component={Organisation} />
              <Route
                exact
                path="/logistic/acknowledge"
                component={Acknowledge}
              />
            </Switch>
          </div>
          <CssBaseline />
        </ThemeProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
