/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import {
  InputAdornment,
  makeStyles,
  Paper,
  TableBody,
  TableCell,
  TableRow,
  Toolbar,
} from "@material-ui/core";
import { Search } from "@material-ui/icons";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import Controls from "../../components/controls/Controls";
import Header from "../../components/Header";
import Notification from "../../components/Notification";
import useTable from "../../components/useTable";
import { getCurrentUser } from "../../services/authService";
import {
  listDispatch,
  updateBeneficiary,
} from "../../services/logisticService";

const useStyles = makeStyles((theme) => ({
  pageContent: {
    margin: theme.spacing(2),
    padding: theme.spacing(1),
  },
  searchInput: {
    width: "70%",
    right: "1rem",
  },
  newButton: {
    position: "absolute",
    right: "12em",
  },
}));

const headCells = [
  { id: "date", label: "Date Dispatch" },
  { id: "telephone", label: "Telephone" },
  { id: "batch", label: "Batch Number" },
  { id: "material_description", label: "Material Description" },
  { id: "quantity", label: "Quantity" },
];

export default function DispatchList(props) {
  const classes = useStyles();
  const [records, setRecords] = useState([]);
  const [currentUser, setCurrentUser] = useState(getCurrentUser());
  const [filterFn, setFilterFn] = useState({
    fn: (records) => {
      return records;
    },
  });
  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });
  const { TblContainer, TblHead, TblPagination, recordsAfterPagingAndSorting } =
    useTable(records, headCells, filterFn);

  const handleSearch = (e) => {
    let target = e.target;
    setFilterFn({
      fn: (records) => {
        if (target.value === "") return records;
        else {
          return records.filter((x) => x.beneficiaryPhone === target.value);
        }
      },
    });
  };

  //Call funciton allDispatch
  const allDispatch = () => {
    listDispatch(currentUser.email)
      .then((response) => {
        setRecords(response.data);
      })
      .catch((e) => {
        console.log(`Error dispatchlist ${e}`);
      });
  };
  useEffect(() => {
    if (currentUser) {
      allDispatch();
    }
  }, []);

  return (
    <>
      <Header />
      <Paper className={classes.pageContent}>
        <Toolbar>
          <Controls.Input
            label="Search By Telephone"
            className={classes.searchInput}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search />
                </InputAdornment>
              ),
            }}
            onChange={handleSearch}
          />
        </Toolbar>
        <TblContainer>
          <TblHead />
          <TableBody>
            {recordsAfterPagingAndSorting().map((endBeneficiary, index) => {
              return (
                <TableRow key={index}>
                  <TableCell>{endBeneficiary.dateCreateDispatch}</TableCell>
                  <TableCell>{endBeneficiary.beneficiaryPhone}</TableCell>
                  <TableCell>{endBeneficiary.batch}</TableCell>
                  <TableCell>{endBeneficiary.material_description}</TableCell>
                  <TableCell>{endBeneficiary.quantity}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </TblContainer>
        <TblPagination />
      </Paper>
      <Notification notify={notify} setNotify={setNotify} />
    </>
  );
}
