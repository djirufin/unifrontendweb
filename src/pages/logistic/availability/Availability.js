/* eslint-disable no-unused-vars */
import { makeStyles, Paper, TableBody, Toolbar } from '@material-ui/core';
import React from 'react';
import { useState } from 'react';
import Controls from '../../../components/controls/Controls';
import useTableMembre from '../../../components/useTableMembre';
import Header from '../../../components/Header'


const useStyles = makeStyles(theme => ({
    pageContent: {
        margin: theme.spacing(1),
        padding: theme.spacing(1)
    },
    searchInput: {
        width: '50%',
        right: '1rem'
    },
    newButton: {
        position: 'absolute',
        right: '10px'
    },
    newButton1: {
        position: 'absolute',
        right: '9rem'
    },
    head: {
        position: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        padding: 1
    },
    paragraph: {
    }
}))


const headCells = [
    { id: 'firstName', label: 'First Name' },
    { id: 'lastName', label: 'Last Name' },
    { id: 'batchNumber', label: 'Batch Number' },
    { id: 'material', label: 'Material' },
    { id: 'description', label: 'Material Description' },
    { id: 'qtyStock', label: 'Stock Quantity', disableSorting: true }
]

function Availability(props) {

    const classes = useStyles();
    const [records, setRecords] = useState([]);
    const [filterFn, setFilterFn] = useState({ fn: records => { return records; } })

    const {
        TblContainer,
        TblHead,
        TblPagination,
        recordsAfterPagingAndSorting
    } = useTableMembre(records, headCells, filterFn);

    return (
        <>
            <Header />
            <Paper className={classes.pageContent}>   
                <TblContainer>
                    <TblHead />
                    <TableBody>
                        
                    </TableBody>
                </TblContainer>
                <TblPagination />
            </Paper>
        </>
    );
}

export default Availability;