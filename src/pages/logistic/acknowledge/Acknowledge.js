/* eslint-disable no-unused-vars */
import { InputAdornment, makeStyles, Paper, TableBody, Toolbar } from '@material-ui/core';
import {  Search } from '@material-ui/icons';
import React, { useState } from 'react';
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
    { id: 'sn', label: 'S/N' },
    { id: 'description', label: 'Material Description' },
    { id: 'quantity', label: 'Quantity' },
    { id: 'qtyReceive', label: 'Quantity Received' },
    { id: 'evidence', label: 'Evidence picture' },
    { id: 'actions', label: 'Action', disableSorting: true }
]

function Acknowledge(props) {
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
                <div className={classes.head}>
                    <h3>Acknowledgement</h3> 
                    <p>Confirm quantity and capture image</p>
                </div>
            </Paper>
            <Paper className={classes.pageContent}> 
                    <Toolbar>
                        <Controls.Input
                            label="Recherche"
                            className={classes.searchInput}
                            InputProps={{
                                startAdornment: (<InputAdornment position="start">
                                    <Search />
                                </InputAdornment>)
                            }}
                        />
                    </Toolbar>  
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

export default Acknowledge;