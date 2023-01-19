import {
  InputAdornment,
  makeStyles,
  Paper,
  TableBody,
  TableCell,
  TableRow,
  Toolbar,
} from "@material-ui/core";
import { EditOutlined, Search } from "@material-ui/icons";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import Controls from "../../components/controls/Controls";
import Header from "../../components/Header";
import useTable from "../../components/useTable";
import { dispatchMaterial, listDispatch } from "../../services/logisticService";

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
  { id: "date", label: "Date Create" },
  { id: "reference", label: "Reference" },
  { id: "name", label: "Name" },
  { id: "telephone", label: "Telephone" },
  { id: "batch", label: "Material" },
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
  const { TblContainer, TblHead, TblPagination, recordsAfterPagingAndSorting } =
    useTable(records, headCells, filterFn);

  const handleSearch = (e) => {
    let target = e.target;
    //test
    records.map((i) => {
      console.log(i);
    });

    setFilterFn({
      fn: (records) => {
        if (target.value === "") return records;
        else {
          const { name } = records;
          console.log(name);
          return records.filter((x) => x.beneficiaries === target.value);
        }
      },
    });
  };

  //Call funciton allDispatch
  const allDispatch = () => {
    listDispatch().then((response) => {
      setRecords(response.data);
    });
  };
  useEffect(() => {
    allDispatch();
  }, []);

  //Valid Authorize
  const authorize = (e, endBeneficiary) => {
    endBeneficiary.status = "COMPLETED";
    console.log(endBeneficiary);
    dispatchMaterial(endBeneficiary).then((response) =>
      console.log(response.data)
    );
    //window.location.reload();
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
            {/* <Controls.Button text="Search" className={classes.newButton} /> */}
          </Toolbar>
          <TblContainer>
            <TblHead />
            <TableBody>
              {recordsAfterPagingAndSorting().map((user) =>
                user.beneficiaries.map((endBeneficiary, index) => {
                  return (
                    <TableRow key={index}>
                      <TableCell>{user.dateCreateDispatch}</TableCell>
                      <TableCell>{endBeneficiary.token}</TableCell>
                      <TableCell>{endBeneficiary.name}</TableCell>
                      <TableCell>{endBeneficiary.telephone}</TableCell>
                      <TableCell>{endBeneficiary.batch}</TableCell>
                      <TableCell>{endBeneficiary.quantity}</TableCell>
                      <TableCell>{endBeneficiary.status}</TableCell>
                      <TableCell>
                        <Controls.Button
                          id={"valid" + index}
                          size="small"
                          text="VALID"
                          type="submit"
                          onClick={(e) => {
                            authorize(e, endBeneficiary);
                          }}
                        />
                      </TableCell>
                    </TableRow>
                  );
                })
              )}
            </TableBody>
          </TblContainer>
          <TblPagination />
        </Paper>
      </div>
    </>
  );
}
