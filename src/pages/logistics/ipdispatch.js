/* eslint-disable array-callback-return */
/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import {
  Grid,
  makeStyles,
  Paper,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextareaAutosize,
} from "@material-ui/core";
import React from "react";
import Papa from "papaparse";
import { useState } from "react";
import Controls from "../../components/controls/Controls";
import Header from "../../components/Header";
import { Form } from "../../components/useForm";
import * as logisticService from "../../services/logisticService";
import * as authService from "../../services/authService";
import { useEffect } from "react";
import Select from "react-select";
import { Table } from "react-bootstrap";
import { Category } from "@material-ui/icons";
import { generate } from "@wcj/generate-password";

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
    width: "100%",
    right: "1rem",
  },
  newButton: {
    position: "absolute",
    right: "10px",
  },
}));

export default function Ipdispatch(props) {
  const [currentStep, setCurrentStep] = useState(1);
  const classes = useStyles();
  const [listMaterial, setListMaterial] = useState([]);
  const [currentUser, setCurrentUser] = useState(authService.getCurrentUser());

  //info dispatch
  const [nameDispatch, setNameDisptach] = useState("");
  const [detailsDispatch, setDetailsDispatch] = useState("");
  const [display, setDisplay] = useState("");
  const [listBeneficiarie, setListBeneficiarie] = useState([]);
  const [valeur, setValeur] = useState("");
  const [materialToDispatch, setMaterialToDispatch] = useState([]);
  const [send, setSend] = useState("");
  const [finalQuantity, setFinalQuantity] = useState("");

  const stepNumbers = document.querySelectorAll(".step-number");

  //Step progressing
  const update = (currentStep) => {
    const prevBtn = document.getElementById("prevBtn");
    const nextBtn = document.getElementById("nextBtn");
    const stepNumbers = document.querySelectorAll(".step-number");
    const stepProgression = document.querySelector("#stepProgression");

    prevBtn.disabled = false;
    nextBtn.disabled = false;
    if (currentStep <= 1) {
      setCurrentStep(1);
      prevBtn.disabled = true;
    } else if (currentStep >= stepNumbers.length) {
      setCurrentStep(stepNumbers.length);
      nextBtn.disabled = true;
    }

    stepNumbers.forEach((step, i) => {
      if (currentStep > i) {
        step.classList.add("active");
      } else {
        step.classList.remove("active");
      }
    });

    stepProgression.style.width =
      ((currentStep - 1) / (stepNumbers.length - 1)) * 100 + "%";
  };

  useEffect(() => {
    update(currentStep);
    listMaterialIP();
  }, []);

  stepNumbers.forEach((step, i) => {
    step.onClick = () => {
      setCurrentStep(i + 1);
      update();
    };
  });

  const Previous = () => {
    let i = currentStep - 1;
    setCurrentStep(i);
    update(i);
  };

  const Next = () => {
    let i = currentStep + 1;
    setCurrentStep(i);
    update(i);

    //Final Dispatch
    if (i === 5) {
      const productGroupBy = listBeneficiarie.reduce((group, product) => {
        (group[product.Batch] = group[product.Batch] || []).push(product);
        return group;
      }, {});
      setSend(productGroupBy);
    }
  };

  //List materials
  const listMaterialIP = () => {
    if (currentUser) {
      logisticService.materialIP(currentUser.organisation).then((response) => {
        setListMaterial(response.data);
      });
    }
  };

  //dispatch materials
  const product = (e, list) => {
    e.preventDefault();
    list.Batch = e.target.value;
    list["Material Description"] =
      e.target.options[e.target.selectedIndex].text;
  };
  const quantity = (e, list) => {
    e.preventDefault();
    list.Quantity = e.target.value;
  };

  //call all materials
  const allMaterial = [
    listMaterial.map((type, index) => {
      return {
        value: type["Batch"],
        label: type["Material Description"],
      };
    }),
  ];

  //upload file csv
  const changeHandler = (event) => {
    // Passing file data (event.target.files[0]) to parse using Papa.parse
    //display = "Chargement en cours";
    setValeur(event.target.value);
    Papa.parse(event.target.files[0], {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        const quantity = { Quantity: 0 };
        const product = { Batch: "" };
        const material = { "Material Description": "" };
        const resultats = [];
        results.data.map((ligne) => {
          return resultats.push({
            ...ligne,
            ...product,
            ...material,
            ...quantity,
          });
        });
        setListBeneficiarie(resultats);
        setDisplay("Vous avez chargé " + results.data.length + " elements");
      },
    });
  };

  //SAVE DISPATCH
  const dispatcher = (e) => {
    e.preventDefault();
    const dispatch = {
      name: nameDispatch,
      description: detailsDispatch,
      beneficiaries: listBeneficiariesBuilder(),
      senderName: currentUser.firstname + " " + currentUser.lastname,
      senderEmail: currentUser.email,
      senderPhone: currentUser.telephone,
    };
    console.log(dispatch);
    logisticService
      .dispatchMaterial(dispatch)
      .then((response) => {
        console.log(response.data);
      })
      .catch((err) => console.log(err));
  };

  //List EndBeneficiaries
  const listBeneficiariesBuilder = () => {
    var array = [];
    listBeneficiarie.map((i) => {
      var obj = {
        name: i["Name"],
        telephone: i["Telephone"],
        status: "PENDING",
        batch: i["Batch"],
        material_description: i["Material Description"],
        quantity: i["Quantity"],
        token: generate({
          special: false,
          lowerCase: false,
          upperCase: false,
          length: 6,
        }),
      };
      array.push(obj);
    });
    return array;
  };

  return (
    <>
      <Header />
      <div className={classes.page}>
        <Paper className={classes.pageContent}>
          <div className="containerP">
            <div className="progress-steps-container">
              <div className="step-progression" id="stepProgression"></div>
              <div className="step-number">1</div>
              <div className="step-number">2</div>
              <div className="step-number">3</div>
              <div className="step-number">4</div>
              <div className="step-number">5</div>
            </div>
          </div>
        </Paper>
        <Paper className={classes.pageContent}>
          {currentStep && currentStep === 1 ? (
            <Form>
              <Grid container>
                <Grid item xs={6}>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      width: "50em",
                    }}
                  >
                    <p>Dispatch Name : </p>
                    <Controls.Input
                      value={nameDispatch}
                      onChange={(e) => setNameDisptach(e.target.value)}
                    />
                  </div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      width: "31em",
                    }}
                  >
                    <p>Details : </p>
                    <TextareaAutosize
                      variant="outlined"
                      className="textarea"
                      placeholder="Details"
                      value={detailsDispatch}
                      style={{ width: 300, height: 60 }}
                      onChange={(e) => setDetailsDispatch(e.target.value)}
                    />
                  </div>
                </Grid>
              </Grid>
            </Form>
          ) : currentStep === 2 ? (
            <>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  width: "53em",
                }}
              >
                <p>Register beneficiaries : </p>
                <Controls.Input
                  type="file"
                  accept=".csv"
                  onChange={changeHandler}
                  style={{ width: 300, height: 60 }}
                />
                <p>{valeur}</p>
              </div>
              <h4>{display}</h4>
            </>
          ) : currentStep === 3 ? (
            <>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  width: "50em",
                }}
              >
                <p>Select materials to dispatch : </p>
                <Select
                  options={allMaterial[0]}
                  isMulti
                  className={classes.searchInput}
                  onChange={(item) => {
                    setMaterialToDispatch(item);
                  }}
                />
              </div>
            </>
          ) : currentStep === 4 ? (
            <>
              <div>
                {listBeneficiarie.length === 0 ? (
                  <h3 style={{ color: "red" }}>
                    Please complete the previous fields
                  </h3>
                ) : (
                  listBeneficiarie.map((list, index) => {
                    return (
                      <div>
                        <p
                          style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            width: "30em",
                            padding: 2,
                          }}
                        >
                          {list["Name"]} :{" "}
                          <p
                            style={{
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "space-between",
                              width: "20em",
                              padding: 2,
                            }}
                          >
                            <select
                              name={"product" + index}
                              id={"product" + index}
                              onChange={(e) => product(e, list)}
                            >
                              <option value="">Select product</option>
                              {materialToDispatch.map((type, index) => (
                                <option value={type.value} key={index}>
                                  {type.label}
                                </option>
                              ))}
                            </select>
                            <input
                              type="number"
                              name={"qtySend" + index}
                              id={"qtySend" + index}
                              onChange={(e) => quantity(e, list)}
                              style={{ width: "5em" }}
                              placeholder="0"
                            />
                          </p>
                        </p>
                      </div>
                    );
                  })
                )}
              </div>
            </>
          ) : currentStep === 5 ? (
            listBeneficiarie.length === 0 ? (
              <h3 style={{ color: "red" }}>
                Please complete the previous fields
              </h3>
            ) : (
              <>
                <Form
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Table size="small">
                    <TableHead>
                      <TableRow>
                        <TableCell>
                          <strong>Batch Number</strong>
                        </TableCell>
                        <TableCell align="center">
                          <strong>Material Description</strong>
                        </TableCell>
                        <TableCell>
                          <strong>Quantity Send</strong>
                        </TableCell>
                        <TableCell>
                          <strong>Beneficiaries</strong>
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {materialToDispatch.map((item) => {
                        let i = 0;
                        send[item.value].map((item) => {
                          i = i + parseInt(item["Quantity"]);
                        });
                        return (
                          <TableRow>
                            <TableCell>{item.value}</TableCell>
                            <TableCell>{item.label}</TableCell>
                            <TableCell align="center">{i}</TableCell>
                            <TableCell align="center">
                              {send[item.value].length}
                            </TableCell>
                          </TableRow>
                        );
                      })}
                    </TableBody>
                  </Table>
                </Form>
              </>
            )
          ) : null}
          <div
            style={{
              display: "flex",
              justifyContent: "right",
              position: "relative",
              width: "90%",
            }}
          >
            <input
              type="button"
              id="prevBtn"
              value="Prev"
              onClick={() => Previous()}
            />
            &nbsp;&nbsp;&nbsp;
            <input
              type="button"
              id="nextBtn"
              value="Next"
              hidden={
                currentStep === 5
                  ? listBeneficiarie.length === 0
                    ? false
                    : true
                  : false
              }
              onClick={() => Next()}
            />
            {currentStep === 5 ? (
              listBeneficiarie.length === 0 ? (
                ""
              ) : (
                <Controls.Button
                  size="small"
                  type="submit"
                  text="Submit"
                  onClick={(e) => dispatcher(e)}
                />
              )
            ) : null}
          </div>
        </Paper>
      </div>
    </>
  );
}
