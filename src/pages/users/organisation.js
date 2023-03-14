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
import { Add, CloseOutlined, EditOutlined, Search } from "@material-ui/icons";
import React, { useEffect } from "react";
import { useState } from "react";
import * as managementService from "../../services/managementService";
import Controls from "../../components/controls/Controls";
import Header from "../../components/Header";
import useTable from "../../components/useTable";
import Popup from "../../components/Popup";
import AddOrg from "./addOrg";
import ConfirmDialog from "../../components/ConfirmDialog";
import Notification from "../../components/Notification";

const useStyles = makeStyles((theme) => ({
  pageContent: {
    margin: theme.spacing(2),
    padding: theme.spacing(1),
  },
  searchInput: {
    width: "70%",
  },
  newButton: {
    position: "absolute",
    right: "10px",
  },
}));

const headCells = [
  { id: "name", label: "Organisation Name" },
  { id: "type", label: "Organisation Type" },
  { id: "action", label: "Action" },
];

export default function Organisation(props) {
  const classes = useStyles();
  const [recordForEdit, setRecordForEdit] = useState(null);
  const [records, setRecords] = useState([]);
  const [openPopup, setOpenPopup] = useState(false);
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

  const [filterFn, setFilterFn] = useState({
    fn: (records) => {
      return records;
    },
  });

  const getOrganisation = () => {
    managementService.getOrganisation().then((res) => {
      setRecords(res.data);
    });
  };

  useEffect(() => {
    getOrganisation();
  }, [recordForEdit]);

  const handleSearch = (e) => {
    let target = e.target;
    setFilterFn({
      fn: (records) => {
        if (target.value === "") return records;
        else
          return records.filter((x) =>
            x.name.toLowerCase().includes(target.value)
          );
      },
    });
  };

  const { TblContainer, TblHead, TblPagination, recordsAfterPagingAndSorting } =
    useTable(records, headCells, filterFn);

  const addOrEdit = (organisation, resetForm) => {
    if (organisation.id) {
      managementService.updateOrg(organisation.id, organisation).then((res) => {
        setNotify({
          isOpen: true,
          message: "Update Successfully",
          type: "success",
        });
        resetForm();
        setRecordForEdit(null);
        setOpenPopup(false);
        getOrganisation();
      });
    }
    if (!organisation.id) {
      managementService.addOrg(organisation).then((res) => {
        setNotify({
          isOpen: true,
          message: "Create Successfully",
          type: "success",
        });
        resetForm();
        setRecordForEdit(null);
        setOpenPopup(false);
        getOrganisation();
      });
    }
  };

  const openInPopup = (organisation) => {
    setRecordForEdit(organisation);
    setOpenPopup(true);
  };

  const onDelete = (id) => {
    setConfirmDialog({
      ...confirmDialog,
      isOpen: false,
    });
    managementService.deleteOrg(id).then((res) => {
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

  return (
    <>
      <Header />
      <Paper className={classes.pageContent}>
        <Toolbar>
          <Controls.Input
            label="Search By Organisation Name"
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
          <Controls.Button
            text="Add"
            startIcon={<Add />}
            variant="outlined"
            className={classes.newButton}
            onClick={() => {
              setOpenPopup(true);
              setRecordForEdit(null);
            }}
          />
        </Toolbar>
        <TblContainer>
          <TblHead />
          <TableBody>
            {recordsAfterPagingAndSorting()
              .filter((i) => i.name !== "Undefined")
              .map((organisation) => (
                <TableRow key={organisation.id}>
                  <TableCell>{organisation.name}</TableCell>
                  <TableCell>{organisation.type}</TableCell>
                  <TableCell>
                    <Controls.ActionButton
                      color="primary"
                      onClick={() => {
                        openInPopup(organisation);
                      }}
                    >
                      <EditOutlined fontSize="small" />
                    </Controls.ActionButton>
                    <Controls.ActionButton
                      color="secondary"
                      onClick={() => {
                        setConfirmDialog({
                          isOpen: true,
                          title: "Are you sure to delete this record?",
                          subTitle: "You can't undo this operation",
                          onConfirm: () => {
                            onDelete(organisation.id);
                          },
                        });
                      }}
                    >
                      <CloseOutlined fontSize="small" />
                    </Controls.ActionButton>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </TblContainer>
        <TblPagination />
      </Paper>
      <Popup
        title="Organisation Form"
        openPopup={openPopup}
        setOpenPopup={setOpenPopup}
      >
        <AddOrg recordForEdit={recordForEdit} addOrEdit={addOrEdit} />
      </Popup>
      <Notification notify={notify} setNotify={setNotify} />
      <ConfirmDialog
        confirmDialog={confirmDialog}
        setConfirmDialog={setConfirmDialog}
      />
    </>
  );
}
