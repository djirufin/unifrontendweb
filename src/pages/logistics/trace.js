/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import { Grid, makeStyles, Paper } from "@material-ui/core";
import React from "react";
import { useState } from "react";
import Controls from "../../components/controls/Controls";
import Header from "../../components/Header";
import { Form } from "../../components/useForm";
import { getCurrentUser } from "../../services/authService";
import * as logisticService from "../../services/logisticService";

const useStyles = makeStyles((theme) => ({
  pageContent: {
    margin: theme.spacing(2),
    padding: theme.spacing(1),
  },
  Content: {
    width: "69em",
    height: 100,
    margin: theme.spacing(2),
    padding: theme.spacing(1),
  },
  searchInput: {
    width: "70%",
    left: "0rem",
  },
  newButton: {
    position: "absolute",
    right: "10px",
  },
}));

export default function Trace(props) {
  const classes = useStyles();
  const [searchInput, setSearchInput] = useState("");
  const [currentUser, setCurrentUser] = useState(getCurrentUser());
  const [result, setResult] = useState([]);
  const [statut, setStatut] = useState(0);

  const handleSearch = (e) => {
    if (searchInput) {
      if (currentUser) {
        e.preventDefault();
        logisticService.traceProduct(searchInput).then((response) => {
          setResult(response.data);
          setStatut(1);

          console.log("DATA", response.data, statut);

          if (response.data.length > 0) {
            logisticService.tracerFound(
              searchInput,
              currentUser.firstname + " " + currentUser.lastname,
              currentUser.telephone,
              currentUser.email
            );
          }
        });
      }
    }
  };
  return (
    <>
      <Header />
      <Paper className={classes.pageContent}>
        <Form onClick={handleSearch}>
          <Grid>
            <Controls.Input
              label="Search Batch number"
              name="searchInput"
              onChange={(e) => setSearchInput(e.target.value)}
              value={searchInput}
            />
            <Controls.Button text="Search" type="submit" />
          </Grid>
        </Form>
        &nbsp;&nbsp;&nbsp;
        {statut === 1 ? (
          result.length === 0 ? (
            <h3 style={{ color: "red" }}>
              Ce produit n'existe pas dans la base UNICEF
            </h3>
          ) : null
        ) : null}
      </Paper>
      {result.length > 0 ? (
        <Paper className={classes.Content}>
          {result.map((searchResult) => {
            return (
              <Grid className={classes.head} container key={searchResult.id}>
                <Grid item xs={4}>
                  <div>
                    <p>
                      Batch number : <strong>{searchResult["Batch"]}</strong>
                    </p>
                    <p>
                      Reference : <strong>{"TRF11348854436"}</strong>
                    </p>
                    <p>
                      Waybill number :{" "}
                      <strong>{searchResult["Waybill Number"]}</strong>
                    </p>
                  </div>
                </Grid>
                <Grid item xs={4}>
                  <div>
                    <p>
                      Sender Name : <strong>{searchResult.senderName}</strong>
                    </p>
                    <p>
                      Sender Phone : <strong>{searchResult.senderPhone}</strong>
                    </p>
                    <p>
                      Sender Email : <strong>{searchResult.senderEmail}</strong>
                    </p>
                  </div>
                </Grid>
                <Grid item xs={4}>
                  <div>
                    <p>
                      Receiver Name :{" "}
                      <strong>{searchResult.consigneeSpoc}</strong>
                    </p>
                    <p>
                      Receiver Phone :{" "}
                      <strong>{searchResult.receiverPhone}</strong>
                    </p>
                    <p>
                      Receiver Email :{" "}
                      <strong>{searchResult.receiverEmail}</strong>
                    </p>
                  </div>
                </Grid>
              </Grid>
            );
          })}
        </Paper>
      ) : null}
    </>
  );
}
