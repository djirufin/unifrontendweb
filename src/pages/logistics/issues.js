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
import Controls from "../../components/controls/Controls";
import Header from "../../components/Header";
import useTable from "../../components/useTable";
import { useEffect } from "react";
import { CloseOutlined, EditOutlined } from "@material-ui/icons";
import Popup from "../../components/Popup";
import IssueForm from "./issueForm";

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
  { id: "Action ", label: "Action" },
];

export default function Issues(props) {
  const classes = useStyles();
  const [recordForEdit, setRecordForEdit] = useState(null);
  const [records, setRecords] = useState([]);
  const [openPopup, setOpenPopup] = useState(false);
  const [filterFn, setFilterFn] = useState({
    fn: (records) => {
      return records;
    },
  });

  const getMaterial = () => {
    logisticService.issuesList(true).then((res) => {
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

  const addOrEdit = (issues, resetForm) => {
    // logisticService.updateAdmin(user.id, user);
    //   console.log(user.id);
    // // setNotify({
    // //     isOpen: true,
    // //     message: 'Submit Successfully',
    // //     type: 'success'
    // // })
    // resetForm();
    // setRecordForEdit(null);
    // setOpenPopup(false);
  };

  const openInPopup = (issues) => {
    setRecordForEdit(issues);
    setOpenPopup(true);
  };

  const { TblContainer, TblHead, TblPagination, recordsAfterPagingAndSorting } =
    useTable(records, headCells, filterFn);
  return (
    <>
      <Header />
      <div className={classes.page}>
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
              {recordsAfterPagingAndSorting().map((issues) => (
                <TableRow key={issues.id}>
                  <TableCell>{issues["Consignee Name"]}</TableCell>
                  <TableCell>{issues["Batch"]}</TableCell>
                  <TableCell>{issues.senderName}</TableCell>
                  <TableCell>{issues.receiverName}</TableCell>
                  <TableCell>{issues["Material Description"]}</TableCell>
                  <TableCell>{issues["RO Quantity"]}</TableCell>
                  <TableCell>{issues.qtyReport}</TableCell>
                  <TableCell>
                    <Controls.ActionButton
                      color="primary"
                      onClick={() => {
                        openInPopup(issues);
                      }}
                    >
                      <EditOutlined fontSize="small" />
                    </Controls.ActionButton>
                    {/* <Controls.ActionButton
                      color="secondary"
                      //onClick={() => { openInPopup(user) }}
                    >
                      <CloseOutlined fontSize="small" />
                    </Controls.ActionButton> */}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </TblContainer>
          {/* <TblPagination /> */}
        </Paper>
        <Popup
          title="User Form"
          openPopup={openPopup}
          setOpenPopup={setOpenPopup}
        >
          <IssueForm recordForEdit={recordForEdit} addOrEdit={addOrEdit} />
        </Popup>
      </div>
    </>
  );
}
