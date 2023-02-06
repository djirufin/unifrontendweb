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
  pageContent: {
    margin: theme.spacing(2),
    padding: theme.spacing(1),
  },
  qty: {
    width: 10,
  },
  newButton: {
    position: "absolute",
    right: "10px",
  },
}));

const headCells = [
  { id: "date", label: "Date Trace" },
  { id: "batch", label: "Batch Number" },
  { id: "consigneeTracer", label: "Tracer Name" },
  { id: "phoneTracer", label: "Phone Tracer" },
  { id: "emailTracer", label: "Email Tracer" },
];

export default function TraceFound(props) {
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

  const traceProduct = () => {
    (currentUser
      ? logisticService.tracerList(true)
      : logisticService.materialIP()
    ).then((res) => {
      console.log(res.data);
      setRecords(res.data);
    });
  };

  useEffect(() => {
    traceProduct();
  }, []);

  const report = (e) => {
    e.preventDefault();
    //console.log(e.target[0].name);
    //const nbre = contenuDetails.length;
    var arrayItem = [];
    contenuDetails.forEach((item, index) => {
      item.qtyReport = e.target[index].value;
      item["Pick Status"] = "C";
      item["Transportation Planning Status"] = "C";
      item.dateTransferUpdate = new Date().toLocaleString();
      arrayItem.push(item);
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
      records.filter((item) => item["Batch"] === zrost["Batch"])
    );
  };
  return (
    <>
      <Header />
      <Paper className={classes.pageContent}>
        <TblContainer>
          <TblHead />
          <TableBody>
            {" "}
            {recordsAfterPagingAndSorting().map((zrost) => {
              var findItem = uniqueZrost.find(
                (x) => x["Batch"] === zrost["Batch"]
              );
              if (!findItem) {
                uniqueZrost.push(zrost);
                return (
                  <TableRow key={zrost.id} onClick={() => loadDetails(zrost)}>
                    <TableCell>{zrost.dateTraceUpdate}</TableCell>
                    <TableCell>{zrost["Batch"]}</TableCell>
                    <TableCell>{zrost.consigneeTracer}</TableCell>
                    <TableCell>{zrost.phoneTracer}</TableCell>
                    <TableCell>{zrost.emailTracer}</TableCell>
                  </TableRow>
                );
              }
            })}
          </TableBody>
        </TblContainer>
        <div id="idDetails">
          {contenuDetails.length > 0 ? (
            <Form
              style={{ paddingLeft: "7em", margin: "1em" }}
              onSubmit={(e) => report(e)}
            >
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
                        <TableCell align="center">
                          {item["RO Quantity"]}
                        </TableCell>
                        <TableCell>
                          <Controls.textField
                            name={"qtyReport" + index}
                            id={"qtyReport" + index}
                            size="small"
                            className={classes.qty}
                          />
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
          ) : null}
        </div>
        {/* <TblPagination /> */}
      </Paper>
    </>
  );
}
