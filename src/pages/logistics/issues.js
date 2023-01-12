/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import {
  InputAdornment,
  makeStyles,
  Paper,
  TableBody,
  TableCell,
  TableRow,
  Toolbar,
} from "@material-ui/core";
import * as logisticService from "../../services/logisticService";
import Controls from "../../components/controls/Controls";
import Header from "../../components/Header";
import useTable from "../../components/useTable";
import { useEffect } from "react";
import { Search } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  pageContent: {
    margin: theme.spacing(1),
    padding: theme.spacing(0),
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
  { id: "reference", label: "Reference" },
  { id: "batch", label: "Batch" },
  { id: "sender", label: "Sender" },
  { id: "receiver", label: "Receiver" },
  { id: "material_description", label: "Material Description" },
  { id: "delivery_quantity ", label: "Delivery Quantity" },
  { id: "QtyReport ", label: "Report Quantity" },
];

export default function Issues(props) {
  const classes = useStyles();
  const [recordForEdit, setRecordForEdit] = useState(null);
  const [records, setRecords] = useState([]);
  const [filterFn, setFilterFn] = useState({
    fn: (records) => {
      return records;
    },
  });

  const getMaterial = () => {
    logisticService.getMaterial().then((res) => {
      setRecords(res.data);
    });
  };

  useEffect(() => {
    getMaterial();
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
                <TableCell>{user.Material}</TableCell>
                <TableCell>{user.Material_Description}</TableCell>
                <TableCell>{user.RO_Quantity}</TableCell>
                <TableCell>{user.Warehouse_Number}</TableCell>
                <TableCell>{user.Pick_Status}</TableCell>
                <TableCell>{user.Waybill_Number}</TableCell>
                {/* <TableCell>
                                        <Controls.ActionButton
                                            color="primary"
                                            onClick={() => { openInPopup(user) }}>
                                            <EditOutlined fontSize="small" />
                                        </Controls.ActionButton>
                                    </TableCell> */}
              </TableRow>
            ))}
          </TableBody>
        </TblContainer>
        {/* <TblPagination /> */}
      </Paper>
    </>
  );
}
