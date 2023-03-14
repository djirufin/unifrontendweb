import {
  InputAdornment,
  makeStyles,
  Paper,
  TableBody,
  TableCell,
  TableRow,
  Toolbar,
} from "@material-ui/core";
import { CloseOutlined, Search } from "@material-ui/icons";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import ConfirmDialog from "../../components/ConfirmDialog";
import Controls from "../../components/controls/Controls";
import Header from "../../components/Header";
import Notification from "../../components/Notification";
import useTable from "../../components/useTable";
import { deletesupply, listSupply } from "../../services/userService";

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
  { id: "companyName", label: "Company Name" },
  { id: "email", label: "E-mail" },
  { id: "telephone", label: "Telephone" },
  { id: "address", label: "Address" },
  { id: "activitySector", label: "Activity Sector" },
  { id: "actions", label: "Action", disableSorting: true },
];

export default function Supply(props) {
  const classes = useStyles();
  const [records, setRecords] = useState([]);
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
  const [confirmDialog, setConfirmDialog] = useState({
    isOpen: false,
    title: "",
    subTitle: "",
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
              x.companyName.toLowerCase().includes(target.value) ||
              x.email.toLowerCase().includes(target.value)
          );
        }
      },
    });
  };

  //Delete supply
  const onDelete = (id) => {
    setConfirmDialog({
      ...confirmDialog,
      isOpen: false,
    });
    deletesupply(id).then((res) => {
      console.log(res.data);
      const newRecords = records.filter((x) => x.id !== id);
      setRecords(newRecords);
      setNotify({
        isOpen: true,
        message: res.data,
        type: "error",
      });
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
                  <TableCell>{sup.telephone1}</TableCell>
                  <TableCell>{sup.address}</TableCell>
                  <TableCell>{String(sup.activitySector)}</TableCell>
                  <TableCell>
                    <Controls.ActionButton
                      color="secondary"
                      onClick={() => {
                        setConfirmDialog({
                          isOpen: true,
                          title: "Are you sure to delete this record?",
                          subTitle: "You can't undo this operation",
                          onConfirm: () => {
                            onDelete(sup.id);
                          },
                        });
                      }}
                    >
                      <CloseOutlined fontSize="small" />
                    </Controls.ActionButton>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </TblContainer>
        <TblPagination />
      </Paper>
      <Notification notify={notify} setNotify={setNotify} />
      <ConfirmDialog
        confirmDialog={confirmDialog}
        setConfirmDialog={setConfirmDialog}
      />
    </>
  );
}
