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
import { useState } from "react";
import { useEffect } from "react";
import Controls from "../../components/controls/Controls";
import Header from "../../components/Header";
import useTable from "../../components/useTable";
import { listSupply } from "../../services/userService";

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
    width: "70%",
    right: "1rem",
  },
  newButton: {
    position: "absolute",
    right: "12em",
  },
}));

const headCells = [
  { id: "companyName", label: "Company Name" },
  { id: "email", label: "E-mail" },
  { id: "acronym", label: "Acronym" },
  { id: "address", label: "Address" },
  { id: "city", label: "City" },
  { id: "activitySector", label: "Activity Sector" },
  // { id: "actions", label: "Action", disableSorting: true },
];

export default function Supply(props) {
  const classes = useStyles();
  const [records, setRecords] = useState([]);
  const [filterFn, setFilterFn] = useState({
    fn: (records) => {
      return records;
    },
  });
  const { TblContainer, TblHead, TblPagination, recordsAfterPagingAndSorting } =
    useTable(records, headCells, filterFn);

  const handleSearch = (e) => {
    let target = e.target;
    setFilterFn({
      fn: (records) => {
        if (target.value === "") return records;
        else {
          return records.filter(
            (x) => x.companyName === target.value || x.email === target.value
          );
        }
      },
    });
  };

  //Call funciton allDispatch
  const allDispatch = () => {
    listSupply().then((response) => {
      setRecords(response.data);
    });
  };
  useEffect(() => {
    allDispatch();
  }, []);

  return (
    <>
      <Header />
      <div className={classes.page}>
        <Paper className={classes.pageContent}>
          <Toolbar>
            <Controls.Input
              label="Search"
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
              {recordsAfterPagingAndSorting().map((sup, index) => {
                return (
                  <TableRow key={index}>
                    <TableCell>{sup.companyName}</TableCell>
                    <TableCell>{sup.email}</TableCell>
                    <TableCell>{sup.acronym}</TableCell>
                    <TableCell>{sup.address}</TableCell>
                    <TableCell>{sup.city}</TableCell>
                    <TableCell>{String(sup.activitySector)}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </TblContainer>
          <TblPagination />
        </Paper>
      </div>
    </>
  );
}
