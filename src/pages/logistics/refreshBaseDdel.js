/* eslint-disable no-unused-vars */
import React, { Component } from "react";
import Papa from "papaparse";
import { Grid } from "@material-ui/core";
import Controls from "../../components/controls/Controls";
import { loadDdel } from "../../services/logisticService";

class RefreshBaseDdel extends Component {
  state = { display: "" };
  changeHandler = (event) => {
    // Passing file data (event.target.files[0]) to parse using Papa.parse
    this.setState({ display: "Loading..." });
    Papa.parse(event.target.files[0], {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        console.log(results.data);
        loadDdel(results.data)
          .then((response) => this.setState({ display: response.data }))
          .catch((err) =>
            this.setState({ display: "erreur loading " + err.message })
          );
      },
    });
  };
  render() {
    return (
      <React.Fragment>
        <Grid container>
          <Grid item xs={12}>
            <Controls.Input
              type="file"
              onChange={this.changeHandler}
              accept=".csv"
            />
          </Grid>
          <h4>{this.state.display}</h4>
        </Grid>
      </React.Fragment>
    );
  }
}

export default RefreshBaseDdel;
