/* eslint-disable no-unused-vars */
import { makeStyles, TableBody, TableCell, TableRow } from "@material-ui/core";
import { GetApp } from "@material-ui/icons";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { CSVLink } from "react-csv";
import Controls from "../../components/controls/Controls";
import useTable from "../../components/useTable";
import { crlList, pcList, smList } from "../../services/monitoringService";

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
  { id: "informVaccinationCampaign", label: "Have you been informed..." },
  { id: "communicationChannel", label: "Through which communication..." },
  { id: "quote", label: "Quote" },
  { id: "whatCovidIs", label: "Do you know...", disableSorting: true },
];

function Pc(props) {
  const [records, setRecords] = useState([]);
  const [filterFn, setFilterFn] = useState({
    fn: (records) => {
      return records;
    },
  });

  const allPC = () => {
    pcList().then((res) => {
      setRecords(res.data);
    });
  };
  useEffect(() => {
    allPC();
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
              <TableCell>{sm.informVaccinationCampaign}</TableCell>
              <TableCell>{sm.communicationChannel}</TableCell>
              <TableCell>{sm.quote}</TableCell>
              <TableCell>{sm.whatCovidIs}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </TblContainer>
      <TblPagination />
    </div>
  );
}

export default Pc;
