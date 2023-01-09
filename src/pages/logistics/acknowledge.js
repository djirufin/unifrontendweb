/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { makeStyles, Paper, TableBody, TableCell, TableRow } from '@material-ui/core';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import Controls from '../../components/controls/Controls';
import Header from '../../components/Header';
import useTable from '../../components/useTable';
import * as authService from '../../services/authService';
import * as logisticService from "../../services/logisticService";

const useStyles = makeStyles((theme) => ({
    pageContent: {
      margin: theme.spacing(0.4),
      padding: theme.spacing(1),
    },
    qty: {
      width: "30%",
      left: "0rem",
    },
    newButton: {
        position: 'absolute',
        right: '10px'
    }
  }));
  
  const headCells = [
    { id: "waybill", label: "Waybill Number" },
    { id: "material_description", label: "Material Description" },
    { id: "quantity", label: "RO Quantity" },
    {id: "quantity_Report", label: "Quantity Report"}
  ];

export default function Acknowledge(props) {
    const classes = useStyles();
    const [records, setRecords] = useState([]);
    const [filterFn, setFilterFn] = useState({ fn: records => { return records; } });
    const [currentUser, setCurrentUser] = useState(authService.getCurrentUser());

    const acknowledge = () => {
        ((currentUser) ? (currentUser.roles.toString() === "ROLE_IPADMIN") ?
        (logisticService.acknowledge(currentUser.organisation, "P")) : logisticService.getMaterial() : logisticService.getMaterial())
        .then((res) => {
            setRecords(res.data)
        });
    }
    
    useEffect(() => {
        acknowledge();
    }, []);

    const {
        TblContainer,
        TblHead,
        TblPagination,
        recordsAfterPagingAndSorting
    } = useTable(records, headCells, filterFn);
    //console.log("ACKNOWLEDGE ", currentUser.organisation)
    return (
        <>
            <Header />
            <Paper className={classes.pageContent}>
                <TblContainer>
                    <TblHead />
                    <TableBody>
                        {
                            recordsAfterPagingAndSorting().map(user =>
                                (<TableRow key={user.id}>
                                    <TableCell>{user["Waybill Number"]}</TableCell>
                                    <TableCell>{user["Material Description"]}</TableCell>
                                    <TableCell>{user["RO Quantity"]}</TableCell>
                                    <TableCell>
                                        <Controls.Input
                                            name="qtyReport"
                                            size="small"
                                            className={classes.qty}
                                        />
                                    </TableCell>
                                </TableRow>)
                            )
                        }
                    </TableBody>
                </TblContainer>
                {/* <TblPagination /> */}
            </Paper>
        </>
    );
}