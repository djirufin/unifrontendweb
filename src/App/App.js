import React from "react";
import "./App.css";
import {
  createMuiTheme,
  CssBaseline,
  makeStyles,
  ThemeProvider,
} from "@material-ui/core";
import { Switch, Route, BrowserRouter } from "react-router-dom";
import Users from "../pages/users/user";
import Login from "../pages/authentication/Login";
import NewOrder from "../pages/logistics/neworder";
import Logistics from "../pages/logistics";
import Organisation from "../pages/users/organisation";
import Issues from "../pages/logistics/issues";
import Inventory from "../pages/logistics/inventory";
import Dashboard from "../pages/dashboard/dashboard";
import TraceFound from "../pages/logistics/traceFound";
import Supplier from "../pages/users/supplier";
import Supply from "../pages/logistics/supply";
import DispatchList from "../pages/logistics/dispatchList";
import Pmv from "../pages/monitoring/pmv";
import policy_privacy from "../pages/users/policy_privacy";
import Adhoc from "../pages/monitoring/adhoc";
import Regular from "../pages/monitoring/regular";

const theme = createMuiTheme({
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
    paddingLeft: "256px",
  },
});

function App() {
  const classes = useStyles();
  return (
    <>
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <Switch>
            <Route exact path="/" component={Login} />
            <Route exact path="/suppliers" component={Supplier} />
            <Route exact path="/privacy" component={policy_privacy} />
            <div className={classes.appMain}>
              <Route exact path="/dashboard" component={Dashboard} />
              <Route exact path="/management/use" component={Users} />
              <Route exact path="/management/org" component={Organisation} />
              <Route exact path="/logistic/no" component={NewOrder} />
              <Route exact path="/logistic/pf" component={TraceFound} />
              <Route exact path="/logistic/av" component={Logistics} />
              <Route exact path="/logistic/qp" component={Issues} />
              <Route exact path="/logistic/ii" component={Inventory} />
              <Route exact path="/logistic/dl" component={DispatchList} />
              <Route exact path="/logistic/sup" component={Supply} />
              <Route exact path="/monitoring/pmv" component={Pmv} />
              <Route exact path="/monitoring/adhoc" component={Adhoc} />
              <Route exact path="/monitoring/regular" component={Regular} />
            </div>
          </Switch>
          <CssBaseline />
        </ThemeProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
