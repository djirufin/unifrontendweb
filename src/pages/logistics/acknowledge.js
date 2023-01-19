/* eslint-disable array-callback-return */
/* eslint-disable react/jsx-pascal-case */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import {
  Box,
  Collapse,
  makeStyles,
  Paper,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@material-ui/core";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Table } from "react-bootstrap";
import Controls from "../../components/controls/Controls";
import Header from "../../components/Header";
import { Form } from "../../components/useForm";
import useTable from "../../components/useTable";
import * as authService from "../../services/authService";
import * as logisticService from "../../services/logisticService";

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
  qty: {
    width: "30%",
  },
  newButton: {
    position: "absolute",
    right: "10px",
  },
}));

const headCells = [
  { id: "date", label: "Date Transfer" },
  { id: "waybill", label: "Waybill Number" },
  { id: "drivername", label: "Driver Name" },
  { id: "phoneDriver", label: "Phone Driver" },
  { id: "mlleVehicule", label: "Vehicle Number" },
];

export default function Acknowledge(props) {
  const classes = useStyles();
  const [records, setRecords] = useState([]);
  const [filterFn, setFilterFn] = useState({
    fn: (records) => {
      return records;
    },
  });
  const [currentUser, setCurrentUser] = useState(authService.getCurrentUser());
  const [open, setOpen] = useState(false);
  const [qtyReport, setQtyReport] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [contenuDetails, setContenuDetails] = useState([]);

  const acknowledge = () => {
    (currentUser
      ? currentUser.roles.toString() === "ROLE_IPADMIN"
        ? logisticService.acknowledge(currentUser.organisation, "P")
        : logisticService.getMaterial()
      : logisticService.getMaterial()
    ).then((res) => {
      console.log(res.data);
      setRecords(res.data);
    });
  };

  useEffect(() => {
    acknowledge();
  }, []);

  const report = (e) => {
    e.preventDefault();
    //console.log(e.target[0].name);
    //const nbre = contenuDetails.length;
    var arrayItem = [];
    contenuDetails.forEach((item, index) => {
      item.qtyReport = e.target[index].value;
      if (item.qtyReport !== item["RO Quantity"]) {
        item.alertIssues = true;
      } else {
        item.alertIssues = false;
      }
      item.receivedStatus = "C";
      item["Pick Status"] = "C";
      item["Transportation Planning Status"] = "C";
      item.dateTransferUpdate = new Date().toLocaleString();
      item.receiverName = currentUser.firstname + " " + currentUser.lastname;
      item.receiverPhone = currentUser.telephone;
      item.receiverEmail = currentUser.email;
      arrayItem.push(item);
      console.log(item.qtyReport, item["RO Quantity"]);
    });
    logisticService.loadZrost(arrayItem).then((response) => {
      console.log(response.data);
    });
  };

  const { TblContainer, TblHead, TblPagination, recordsAfterPagingAndSorting } =
    useTable(records, headCells, filterFn);
  var uniqueZrost = [];

  const loadDetails = (zrost) => {
    setContenuDetails(
      records.filter(
        (item) => item["Waybill Number"] === zrost["Waybill Number"]
      )
    );
  };
  return (
    <>
      <Header />
      <div className={classes.page}>
        <Paper className={classes.pageContent}>
          <TblContainer>
            <TblHead />
            <TableBody>
              {" "}
              {recordsAfterPagingAndSorting().map((zrost) => {
                var findItem = uniqueZrost.find(
                  (x) => x["Waybill Number"] === zrost["Waybill Number"]
                );
                if (!findItem) {
                  uniqueZrost.push(zrost);
                  return (
                    <TableRow key={zrost.id} onClick={() => loadDetails(zrost)}>
                      <TableCell>{zrost.dateTransfer}</TableCell>
                      <TableCell>{zrost["Waybill Number"]}</TableCell>
                      <TableCell>{zrost.supplierdriver}</TableCell>
                      <TableCell>{zrost.phoneDriver}</TableCell>
                      <TableCell>{zrost.mlleVehicule}</TableCell>
                    </TableRow>
                  );
                }
              })}
            </TableBody>
          </TblContainer>
          <div id="idDetails">
            {contenuDetails.length > 0 && (
              <Form onSubmit={(e) => report(e)}>
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell>
                        <strong>Material</strong>
                      </TableCell>
                      <TableCell align="center">
                        <strong>Description</strong>
                      </TableCell>
                      <TableCell>
                        <strong>RO Quantity</strong>
                      </TableCell>
                      <TableCell>
                        <strong>Report Quantity</strong>
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {contenuDetails.map((item, index) => {
                      return (
                        <TableRow>
                          <TableCell>{item["Material"]}</TableCell>
                          <TableCell>{item["Material Description"]}</TableCell>
                          <TableCell>{item["RO Quantity"]}</TableCell>
                          <TableCell>
                            <Controls.textField
                              name={"qtyReport" + index}
                              id={"qtyReport" + index}
                              size="small"
                              className={classes.qty}
                            />
                            {qtyReport > item["RO Quantity"] ? "Bonjour" : null}
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                  <TableRow>
                    <TableCell />
                    <TableCell />
                    <TableCell />
                    <TableCell>
                      <Controls.Button type="submit" text="Submit" />
                    </TableCell>
                  </TableRow>
                </Table>
              </Form>
            )}
          </div>
          {/* <TblPagination /> */}
        </Paper>
      </div>
    </>
  );
}
