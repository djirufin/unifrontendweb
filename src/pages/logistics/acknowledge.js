/* eslint-disable no-unused-vars */
import { InputAdornment, makeStyles, Paper, TableBody, TableCell, TableRow, Toolbar } from '@material-ui/core';
import { Search } from '@material-ui/icons';
import React from 'react';
import { useState } from 'react';
import Controls from '../../components/controls/Controls';
import useTable from '../../components/useTable';

const useStyles = makeStyles((theme) => ({
    pageContent: {
      margin: theme.spacing(0.4),
      padding: theme.spacing(1),
    },
    searchInput: {
      width: "70%",
      left: "0rem",
    },
    newButton: {
        position: 'absolute',
        right: '10px'
    }
  }));
  
  const headCells = [
    { id: "release_order", label: "Release Order" },
    { id: "waybill", label: "Waybill Number" },
    { id: "material", label: "Material" },
    { id: "material_description", label: "Material Description" },
    { id: "quantity", label: "RO Quantity" },
  ];

export default function Acknowledge(props) {
    const classes = useStyles();
    const [records, setRecords] = useState([]);
    const [filterFn, setFilterFn] = useState({ fn: records => { return records; } })

    const {
        TblContainer,
        TblHead,
        TblPagination,
        recordsAfterPagingAndSorting
    } = useTable(records, headCells, filterFn);
    return (
        <>
            <Paper className={classes.pageContent}>
                <Toolbar>
                    <Controls.Input
                        label="Recherche"
                        className={classes.searchInput}
                        InputProps={{
                            startAdornment: (<InputAdornment position="start">
                                <Search/>
                            </InputAdornment>)
                        }}
                        // onChange={handleSearch}
                    />
                    {/* <Controls.Button
                        text="Ajouter"
                        variant="outlined"
                        startIcon={<Add />}
                        className={classes.newButton}
                        onClick={() => { setOpenPopup(true); setRecordForEdit(null); }}
                    /> */}
                </Toolbar>
                <TblContainer>
                    <TblHead />
                    <TableBody>
                        {
                            recordsAfterPagingAndSorting().map(user =>
                                (<TableRow key={user.id}>
                                    <TableCell>{user.firstname}</TableCell>
                                    <TableCell>{user.lastname}</TableCell>
                                    <TableCell>{user.email}</TableCell>
                                    {/* <TableCell>
                                        <Controls.ActionButton
                                            color="primary"
                                            onClick={() => { openInPopup(user) }}>
                                            <EditOutlined fontSize="small" />
                                        </Controls.ActionButton>
                                    </TableCell> */}
                                </TableRow>)
                            )
                        }
                    </TableBody>
                </TblContainer>
                <TblPagination />
            </Paper>
        </>
    );
}