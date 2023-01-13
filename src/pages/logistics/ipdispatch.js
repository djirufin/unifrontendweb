/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import { Grid, makeStyles, Paper } from "@material-ui/core";
import React from "react";
import { useState } from "react";
import Controls from "../../components/controls/Controls";
import Header from "../../components/Header";
import { Form } from "../../components/useForm";
import * as logisticService from "../../services/logisticService";
import * as authService from "../../services/authService";
import { useEffect } from "react";

const useStyles = makeStyles((theme) => ({
  page: {
    padding: 1,
    paddingLeft: "18em",
    height: "82vh",
    display: "inline-block",
  },
  pageContent: {
    width: "69em",
    margin: theme.spacing(2),
    padding: theme.spacing(1),
  },
  searchInput: {
    width: "50%",
    right: "1rem",
  },
  newButton: {
    position: "absolute",
    right: "10px",
  },
  newButton1: {
    position: "absolute",
    right: "9rem",
  },
}));

export default function Ipdispatch(props) {
  const classes = useStyles();
  const [listMaterial, setListMaterial] = useState([]);
  const [currentUser, setCurrentUser] = useState(authService.getCurrentUser());
  const [materialSelected, setMaterialSelected] = useState("");

  const listMaterialIP = () => {
    if (currentUser) {
      logisticService.materialIP(currentUser.organisation).then((response) => {
        setListMaterial(response.data);
        console.log(listMaterial);
      });
    }
  };

  useEffect(() => {
    listMaterialIP();
  }, []);

  const materials = [
    listMaterial.map((type, index) => {
      return {
        id: type["Batch"],
        title: type["Material Description"],
      };
    }),
  ];
  console.log(materials);
  return (
    <>
      <Header />
      <div className={classes.page}>
        <Paper className={classes.pageContent}>
          <Form>
            <Grid container>
              <Grid item xs={6}>
                <Controls.Select
                  label="Select material"
                  name="materialSelected"
                  onChange={(e) => setMaterialSelected(e.target.value)}
                  options={materials[0]}
                />
              </Grid>
            </Grid>
          </Form>
        </Paper>
      </div>
    </>
  );
}
