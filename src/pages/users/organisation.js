/* eslint-disable no-unused-vars */
import { InputAdornment, makeStyles, Paper, TableBody, TableCell, TableRow, Toolbar } from '@material-ui/core';
import { Add, EditOutlined, Search } from '@material-ui/icons';
import React, { useEffect } from 'react';
import { useState } from 'react';
import * as managementService from "../../services/managementService"
import Controls from '../../components/controls/Controls';
import Header from '../../components/Header';
import useTable from '../../components/useTable';

const useStyles = makeStyles(theme => ({
    pageContent: {
        margin: theme.spacing(0.5),
        padding: theme.spacing(0)
    },
    searchInput: {
        width: '70%',
        left: '0rem'
    },
    newButton: {
        position: 'absolute',
        right: '10px'
    }
}))

const headCells = [
    { id: 'name', label: 'Organisation Name' },
    { id: 'type', label: 'Organisation Type' },
    { id: 'action', label: 'Action' },
]

export default function Organisation(props) {
    const classes = useStyles();
    const [recordForEdit, setRecordForEdit] = useState(null)
    const [records, setRecords] = useState([]);
    const [filterFn, setFilterFn] = useState({ fn: records => { return records; } })
    
    const getOrganisation = () => {
        managementService.getOrganisation()
        .then((res) => {
            setRecords(res.data)
        });
    }
    
    useEffect(() => {
        getOrganisation();
    }, [recordForEdit]);

    const handleSearch = e => {
        let target = e.target;
        setFilterFn({
            fn: records => {
                if (target.value === "")
                    return records;
                else
                    return records.filter(x => x.name.toLowerCase().includes(target.value))
            }
        })
    }

    const {
        TblContainer,
        TblHead,
        TblPagination,
        recordsAfterPagingAndSorting
    } = useTable(records, headCells, filterFn);
    return (
        <>
           <Header />
           <Paper className={classes.pageContent}>

                <Toolbar>
                    <Controls.Input
                        label="Pesquisar"
                        className={classes.searchInput}
                        InputProps={{
                            startAdornment: (<InputAdornment position="start">
                                <Search />
                            </InputAdornment>)
                        }}
                        onChange={handleSearch}
                    />
                    <Controls.Button
                        text="Add"
                        startIcon={<Add />}
                        variant="outlined"
                        className={classes.newButton}
                        // onClick={() => { setOpenPopup(true); setRecordForEdit(null); }}
                    />
                </Toolbar>
                <TblContainer>
                    <TblHead />
                    <TableBody>
                        {
                            recordsAfterPagingAndSorting().filter((i) => i.name!== "Undefined").map(user =>
                                (<TableRow key={user.id}>
                                    <TableCell>{user.name}</TableCell>
                                    <TableCell>{user.type}</TableCell>
                                    <TableCell>
                                        <Controls.ActionButton
                                            color="primary"
                                            // onClick={() => { openInPopup(user) }}
                                        >
                                            <EditOutlined fontSize="small" />
                                        </Controls.ActionButton>
                                    </TableCell>
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