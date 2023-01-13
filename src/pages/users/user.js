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
import { Add, EditOutlined, Search } from "@material-ui/icons";
import React from "react";
import { useState } from "react";
import Controls from "../../components/controls/Controls";
import Header from "../../components/Header";
import * as userService from "../../services/userService";
import { useEffect } from "react";
import Popup from "../../components/Popup";
import AddUserForm from "./add";
import useTable from "../../components/useTableUser";

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
    width: "50%",
    right: "1rem",
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
  const [openPopup, setOpenPopup] = useState(false);

  const handleSearch = (e) => {
    let target = e.target;
    setFilterFn({
      fn: (records) => {
        if (target.value === "") return records;
        else
          return records.filter((x) =>
            x.eglise.toLowerCase().includes(target.value)
          );
      },
    });
  };

  const addOrEdit = (user, resetForm) => {
    // eslint-disable-next-line no-lone-blocks
    {
      user.id ? userService.updateAdmin(user.id, user) : console.log(user);
      console.log(user.id);
    }
    if (!user.id) {
      userService.addUuser(user);
      console.log(user);
      console.log(user.id);
    }
    // setNotify({
    //     isOpen: true,
    //     message: 'Submit Successfully',
    //     type: 'success'
    // })
    resetForm();
    setRecordForEdit(null);
    setOpenPopup(false);
    allUsers();
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
      <div className={classes.page}>
        <Paper className={classes.pageContent}>
          <Toolbar>
            {/* <Controls.Input
                        label="Recherche"
                        className={classes.searchInput}
                        InputProps={{
                            startAdornment: (<InputAdornment position="start">
                                <Search />
                            </InputAdornment>)
                        }}
                        onChange={handleSearch}
                    /> */}
            <Controls.Button
              text="Ajouter"
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
        </Paper>
      </div>
    </>
  );
}

export default Users;
