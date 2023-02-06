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
import { Add, CloseOutlined, EditOutlined, Search } from "@material-ui/icons";
import React from "react";
import { useState } from "react";
import Controls from "../../components/controls/Controls";
import Header from "../../components/Header";
import * as userService from "../../services/userService";
import { useEffect } from "react";
import Popup from "../../components/Popup";
import AddUserForm from "./add";
import useTable from "../../components/useTable";
import Notification from "../../components/Notification";
import ConfirmDialog from "../../components/ConfirmDialog";

const useStyles = makeStyles((theme) => ({
  pageContent: {
    margin: theme.spacing(2),
    padding: theme.spacing(1),
  },
  searchInput: {
    width: "50%",
  },
  newButton: {
    position: "absolute",
    right: "10px",
  },
}));

const headCells = [
  { id: "firstname", label: "First Name" },
  { id: "lastname", label: "Last Name" },
  { id: "email", label: "Email" },
  { id: "actions", label: "Action", disableSorting: true },
];

function Users(props) {
  const classes = useStyles();
  const [recordForEdit, setRecordForEdit] = useState(null);
  const [records, setRecords] = useState([]);
  const [currentUser, setCurrentUser] = useState(userService.getCurrentUser());
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

  const allUsers = () => {
    userService.listUsers().then((res) => {
      setRecords(res.data);
    });
  };

  useEffect(() => {
    allUsers();
  }, []);

  const [filterFn, setFilterFn] = useState({
    fn: (records) => {
      return records;
    },
  });

  const handleSearch = (e) => {
    let target = e.target;
    setFilterFn({
      fn: (records) => {
        if (target.value === "") return records;
        else
          return records.filter(
            (x) => x.firstname.toLowerCase() === target.value
          );
      },
    });
  };

  const addOrEdit = (user, resetForm) => {
    // eslint-disable-next-line no-lone-blocks
    {
      if (user.id) {
        userService.updateUser(user.id, user).then((res) => {
          console.log(res.data);
          setNotify({
            isOpen: true,
            message: "Update Successfully",
            type: "success",
          });
          resetForm();
          setRecordForEdit(null);
          setOpenPopup(false);
          allUsers();
        });
      }
    }
    if (!user.id) {
      userService.addUuser(user).then((res) => {
        console.log(res.data);
        setNotify({
          isOpen: true,
          message: res.data,
          type: "success",
        });
        resetForm();
        setRecordForEdit(null);
        setOpenPopup(false);
        allUsers();
      });
    }
  };
  const onDelete = (id) => {
    setConfirmDialog({
      ...confirmDialog,
      isOpen: false,
    });
    userService.deleteuser(id).then((res) => {
      console.log(res.data);
      const newRecords = records.filter((t) => t.id !== id);
      setRecords(newRecords);
      setNotify({
        isOpen: true,
        message: res.data,
        type: "error",
      });
    });
  };

  const openInPopup = (user) => {
    setRecordForEdit(user);
    setOpenPopup(true);
  };

  const { TblContainer, TblHead, TblPagination, recordsAfterPagingAndSorting } =
    useTable(records, headCells, filterFn);

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
          <Controls.Button
            text="Add"
            variant="outlined"
            startIcon={<Add />}
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
            {recordsAfterPagingAndSorting().map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.firstname}</TableCell>
                <TableCell>{user.lastname}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>
                  <Controls.ActionButton
                    color="primary"
                    onClick={() => {
                      openInPopup(user);
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
                          onDelete(user.id);
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
        <Popup
          title="User Form"
          openPopup={openPopup}
          setOpenPopup={setOpenPopup}
        >
          <AddUserForm recordForEdit={recordForEdit} addOrEdit={addOrEdit} />
        </Popup>
        <Notification notify={notify} setNotify={setNotify} />
        <ConfirmDialog
          confirmDialog={confirmDialog}
          setConfirmDialog={setConfirmDialog}
        />
      </Paper>
    </>
  );
}

export default Users;
