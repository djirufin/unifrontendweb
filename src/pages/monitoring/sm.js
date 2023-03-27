/* eslint-disable no-unused-vars */
import { makeStyles, TableBody, TableCell, TableRow } from "@material-ui/core";
import { GetApp } from "@material-ui/icons";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { CSVLink } from "react-csv";
import Controls from "../../components/controls/Controls";
import useTable from "../../components/useTable";
import { smList } from "../../services/monitoringService";

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
  { id: "region", label: "Region Name" },
  { id: "district", label: "District Name" },
  { id: "establishment", label: "Establishment Name" },
  { id: "createBy", label: "Create By", disableSorting: true },
];

function Sm(props) {
  const [recordForEdit, setRecordForEdit] = useState(null);
  const [records, setRecords] = useState([]);
  const [filterFn, setFilterFn] = useState({
    fn: (records) => {
      return records;
    },
  });

  const allSM = () => {
    smList().then((res) => {
      setRecords(res.data);
    });
  };
  useEffect(() => {
    allSM();
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
              <TableCell>{sm.region}</TableCell>
              <TableCell>{sm.district}</TableCell>
              <TableCell>{sm.establishment}</TableCell>
              <TableCell>{sm.nameCreateBy}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </TblContainer>
      <TblPagination />
    </div>
  );
}

export default Sm;
