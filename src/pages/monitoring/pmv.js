import {
  InputAdornment,
  makeStyles,
  Paper,
  TableBody,
  TableCell,
  TableRow,
  Toolbar,
} from "@material-ui/core";
import { CloseOutlined, EditOutlined, Search } from "@material-ui/icons";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import ConfirmDialog from "../../components/ConfirmDialog";
import Controls from "../../components/controls/Controls";
import Header from "../../components/Header";
import Notification from "../../components/Notification";
import Popup from "../../components/Popup";
import useTable from "../../components/useTable";
import {
  deletePmv,
  pmvList,
  updatePmv,
} from "../../services/monitoringService";
import PmvForm from "./pmvForm";

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
  { id: "officeLocation", label: "Office Location" },
  { id: "geoLocation", label: "Office Geo-Location" },
  { id: "designation", label: "Designation Or title" },
  { id: "taNumber", label: "TA Number" },
  { id: "actions", label: "Action", disableSorting: true },
];

export default function Pmv(props) {
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

  const allPMV = () => {
    pmvList().then((res) => {
      setRecords(res.data);
    });
  };

  useEffect(() => {
    allPMV();
  }, []);

  const handleSearch = (e) => {
    let target = e.target;
    setFilterFn({
      fn: (records) => {
        if (target.value === "") return records;
        else
          return records.filter(
            (x) => x.taNumber.toLowerCase() === target.value
          );
      },
    });
  };

  const { TblContainer, TblHead, TblPagination, recordsAfterPagingAndSorting } =
    useTable(records, headCells, filterFn);

  const openInPopup = (pmv) => {
    setRecordForEdit(pmv);
    setOpenPopup(true);
  };

  const addOrEdit = (pmv, resetForm) => {
    // eslint-disable-next-line no-lone-blocks
    {
      if (pmv.id) {
        updatePmv(pmv.id, pmv).then((res) => {
          console.log(res.data);
          setNotify({
            isOpen: true,
            message: "Update Successfully",
            type: "success",
          });
          resetForm();
          setRecordForEdit(null);
          setOpenPopup(false);
          allPMV();
        });
      }
    }
  };
  const onDelete = (id) => {
    setConfirmDialog({
      ...confirmDialog,
      isOpen: false,
    });
    deletePmv(id).then((res) => {
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
            {recordsAfterPagingAndSorting().map((pmv) => (
              <TableRow key={pmv.id}>
                <TableCell>{pmv.officeLocation}</TableCell>
                <TableCell>{pmv.officeGeoLocation}</TableCell>
                <TableCell>{pmv.designationOrTitle}</TableCell>
                <TableCell>{pmv.taNumber}</TableCell>
                <TableCell>
                  <Controls.ActionButton
                    color="primary"
                    onClick={() => {
                      openInPopup(pmv);
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
                          onDelete(pmv.id);
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
          title="PMV Form"
          openPopup={openPopup}
          setOpenPopup={setOpenPopup}
        >
          <PmvForm recordForEdit={recordForEdit} addOrEdit={addOrEdit} />
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
