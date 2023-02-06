/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import {
  makeStyles,
  Paper,
  TableBody,
  TableCell,
  TableRow,
} from "@material-ui/core";
import * as logisticService from "../../services/logisticService";
import * as authService from "../../services/authService";
import Header from "../../components/Header";
import useTable from "../../components/useTable";
import { useEffect } from "react";

const useStyles = makeStyles((theme) => ({
  pageContent: {
    margin: theme.spacing(2),
    padding: theme.spacing(1),
  },
  searchInput: {
    width: "50%",
    padding: 2,
  },
  newButton: {
    position: "absolute",
    right: "10px",
  },
}));

const headCells = [
  { id: "batch", label: "Batch Number" },
  { id: "material", label: "Material" },
  { id: "description_material", label: "Description Material" },
  { id: "quantityUnicef", label: "Quantity Received" },
  { id: "quantity", label: "Stock Quantity" },
];

export default function Logistics(props) {
  const classes = useStyles();
  const [recordForEdit, setRecordForEdit] = useState(null);
  const [records, setRecords] = useState([]);
  const [currentUser, setCurrentUser] = useState(authService.getCurrentUser());
  const [filterFn, setFilterFn] = useState({
    fn: (records) => {
      return records;
    },
  });

  const materialIP = () => {
    if (currentUser) {
      logisticService.materialIP(currentUser.organisation).then((res) => {
        setRecords(res.data);
      });
    }
  };

  useEffect(() => {
    materialIP();
  }, [recordForEdit]);

  const handleSearch = (e) => {
    let target = e.target;
    setFilterFn({
      fn: (records) => {
        if (target.value === "") return records;
        else
          return records.filter((x) =>
            x.Material.toLowerCase().includes(target.value)
          );
      },
    });
  };

  const { TblContainer, TblHead, TblPagination, recordsAfterPagingAndSorting } =
    useTable(records, headCells, filterFn);
  return (
    <>
      <Header />
      <Paper className={classes.pageContent}>
        {/* <Toolbar>
          <Controls.Input
            label="Pesquisar"
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
        </Toolbar> */}
        <TblContainer>
          <TblHead />
          <TableBody>
            {recordsAfterPagingAndSorting().map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user["Batch"]}</TableCell>
                <TableCell>{user["Material"]}</TableCell>
                <TableCell>{user["Material Description"]}</TableCell>
                <TableCell>{user["RO Quantity"]}</TableCell>
                <TableCell>{user.qtyReport}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </TblContainer>
        <TblPagination />
      </Paper>
    </>
  );
}
