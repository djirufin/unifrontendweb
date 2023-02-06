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
import React, { useEffect, useState } from "react";
import Controls from "../../components/controls/Controls";
import Header from "../../components/Header";
import useTable from "../../components/useTable";
import { inventoryList } from "../../services/logisticService";

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
  { id: "consignee", label: "Consignee" },
  { id: "consignee_name", label: "Consignee Name" },
  { id: "batch", label: "Batch Number" },
  { id: "material_description", label: "Material Description" },
  { id: "ro_quantity", label: "RO Quantity" },
  { id: "quantity_received", label: "Received Quantity" },
  // { id: "actions", label: "Action", disableSorting: true },
];

export default function Inventory(props) {
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
            (x) =>
              x["Consignee Name"].toLowerCase() === target.value ||
              x["Consignee"].toLowerCase() === target.value
          );
        }
      },
    });
  };

  //Call funciton allDispatch
  const allDispatch = () => {
    inventoryList("C").then((response) => {
      setRecords(response.data);
    });
  };
  useEffect(() => {
    allDispatch();
  }, []);

  return (
    <>
      <Header />
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
            {recordsAfterPagingAndSorting().map((material, index) => {
              return (
                <TableRow key={index}>
                  <TableCell>{material["Consignee"]}</TableCell>
                  <TableCell>{material["Consignee Name"]}</TableCell>
                  <TableCell>{material["Batch"]}</TableCell>
                  <TableCell>{material["Material Description"]}</TableCell>
                  <TableCell>{material["RO Quantity"]}</TableCell>
                  <TableCell>{material.qtyReport}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </TblContainer>
        <TblPagination />
      </Paper>
    </>
  );
}
