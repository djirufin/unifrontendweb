/* eslint-disable no-unused-vars */
import { makeStyles, Paper, TableBody } from '@material-ui/core';
import React, { useState } from 'react';
import useTableMembre from '../../../components/useTableMembre';


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
    { id: 'material', label: 'Material Desc' },
    { id: 'qty', label: 'Quantity', disableSorting: true }
]

function Inventory(props) {

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

export default Inventory;