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
import { useEffect } from "react";
import { useState } from "react";
import Controls from "../../components/controls/Controls";
import Header from "../../components/Header";
import useTable from "../../components/useTable";
import {
  listDispatch,
  updateBeneficiary,
} from "../../services/logisticService";

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
  { id: "name", label: "Name" },
  { id: "telephone", label: "Telephone" },
  { id: "batch", label: "Batch Number" },
  { id: "material_description", label: "Material Description" },
  { id: "quantity", label: "Quantity" },
  { id: "status", label: "Status" },
  { id: "actions", label: "Action", disableSorting: true },
];

export default function Withdrawal(props) {
  const classes = useStyles();
  const [records, setRecords] = useState([]);
  const [filterFn, setFilterFn] = useState({
    fn: (records) => {
      return records;
    },
  });
  const [saveData, setSaveData] = useState([]);
  const { TblContainer, TblHead, TblPagination, recordsAfterPagingAndSorting } =
    useTable(records, headCells, filterFn);

  const handleSearch = (e) => {
    let target = e.target;
    setFilterFn({
      fn: (records) => {
        if (target.value === "") return records;
        else {
          return records.filter((x) => x.token === target.value);
        }
      },
    });
  };

  //Call funciton allDispatch
  const allDispatch = () => {
    listDispatch().then((response) => {
      setSaveData(response.data);
      //filter response.data
      let arr = response.data;
      let beneficiaries = [];
      var array = [];
      arr.map((i) => array.push(...i.beneficiaries));
      beneficiaries = array;
      setRecords(beneficiaries.filter((r) => r.status === "PENDING"));
    });
  };
  useEffect(() => {
    allDispatch();
  }, []);

  //Valid Withdrawal
  const authorize = (index, endBeneficiary) => {
    endBeneficiary.status = "COMPLETED";
    saveData[index]["beneficiaries"] = records;
    console.log("test ", saveData[index]);
    updateBeneficiary(saveData[index].id, endBeneficiary)
      .then((response) => {
        console.log(response.data);
        const newRecords = records.filter(
          (x) => x.token !== endBeneficiary.token
        );
        setRecords(newRecords);
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <Header />
      <div className={classes.page}>
        <Paper className={classes.pageContent}>
          <Toolbar>
            <Controls.Input
              label="Search By Token"
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
              {recordsAfterPagingAndSorting().map((endBeneficiary, index) => {
                return (
                  <TableRow key={index}>
                    <TableCell>{endBeneficiary.name}</TableCell>
                    <TableCell>{endBeneficiary.telephone}</TableCell>
                    <TableCell>{endBeneficiary.batch}</TableCell>
                    <TableCell>{endBeneficiary.material_description}</TableCell>
                    <TableCell>{endBeneficiary.quantity}</TableCell>
                    <TableCell>{endBeneficiary.status}</TableCell>
                    <TableCell>
                      <Controls.Button
                        id={"valid" + endBeneficiary.token}
                        size="small"
                        text="VALID"
                        type="submit"
                        onClick={(e) => {
                          authorize(index, endBeneficiary);
                        }}
                      />
                    </TableCell>
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
