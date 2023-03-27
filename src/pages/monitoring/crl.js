/* eslint-disable no-unused-vars */
import { makeStyles, TableBody, TableCell, TableRow } from "@material-ui/core";
import { GetApp } from "@material-ui/icons";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { CSVLink } from "react-csv";
import Controls from "../../components/controls/Controls";
import useTable from "../../components/useTable";
import { crlList, smList } from "../../services/monitoringService";

const useStyles = makeStyles((theme) => ({
  pageContent: {
    margin: theme.spacing(2),
    padding: theme.spacing(1),
  },
  searchInput: {
    width: "30%",
  },
  newButton: {
    position: "absolute",
    right: "10px",
    top: 10,
  },
}));

const headCells = [
  { id: "isThereCurrentPlan", label: "Is there a current..." },
  { id: "hasAMetting", label: "Has a meeting..." },
  { id: "isTheRegionCovered", label: "Is the region..." },
  { id: "whichOnes", label: "Were campaign..." },
  { id: "createBy", label: "Create By", disableSorting: true },
];

function Crl(props) {
  const [records, setRecords] = useState([]);
  const [filterFn, setFilterFn] = useState({
    fn: (records) => {
      return records;
    },
  });

  const allCRL = () => {
    crlList().then((res) => {
      setRecords(res.data);
    });
  };
  useEffect(() => {
    allCRL();
  }, []);

  const { TblContainer, TblHead, TblPagination, recordsAfterPagingAndSorting } =
    useTable(records, headCells, filterFn);

  return (
    <div>
      <TblContainer>
        <TblHead />
        <TableBody>
          {recordsAfterPagingAndSorting().map((sm) => (
            <TableRow key={sm.id}>
              <TableCell>{sm.isThereCurrentPlan}</TableCell>
              <TableCell>{sm.hasAMetting}</TableCell>
              <TableCell>{sm.isTheRegionCovered}</TableCell>
              <TableCell>{sm.whichOnes}</TableCell>
              <TableCell>{sm.nameCreateBy}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </TblContainer>
      <TblPagination />
    </div>
  );
}

export default Crl;
