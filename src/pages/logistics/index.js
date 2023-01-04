/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { InputAdornment, makeStyles, Paper, TableBody, TableCell, TableRow, Toolbar } from '@material-ui/core';
import * as logisticService from '../../services/logisticService'
import Controls from '../../components/controls/Controls';
import Header from '../../components/Header';
import useTable from '../../components/useTable';
import { useEffect } from 'react';
import { Search } from '@material-ui/icons';


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
    { id: 'material_name', label: 'Material Name' },
    { id: 'description', label: 'Description' },
    { id: 'quantite', label: 'Quantity' },
    { id: 'warehouse', label: 'Warehouse' },
    { id: 'pick_status', label: 'Pick Status' },
    { id: 'waybill ', label: 'Waybill' },
]

export default function Logistics(props) {
    const classes = useStyles();
    const [recordForEdit, setRecordForEdit] = useState(null)
    const [records, setRecords] = useState([]);
    const [filterFn, setFilterFn] = useState({ fn: records => { return records; } })
    
    const getMaterial = () => {
        logisticService.getMaterial()
        .then((res) => {
            setRecords(res.data)
        });
    }
    
    useEffect(() => {
        getMaterial();
    }, [recordForEdit]);

    const handleSearch = e => {
        let target = e.target;
        setFilterFn({
            fn: records => {
                if (target.value === "")
                    return records;
                else
                    return records.filter(x => x.Material.toLowerCase().includes(target.value))
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
                        text="RefreshBase"
                        variant="outlined"
                        className={classes.newButton}
                        // onClick={() => { setOpenPopup(true); setRecordForEdit(null); }}
                    />
                </Toolbar>
                <TblContainer>
                    <TblHead />
                    <TableBody>
                        {
                            recordsAfterPagingAndSorting().map(user =>
                                (<TableRow key={user.id}>
                                    <TableCell>{user.Material}</TableCell>
                                    <TableCell>{user.Material_Description}</TableCell>
                                    <TableCell>{user.RO_Quantity}</TableCell>
                                    <TableCell>{user.Warehouse_Number}</TableCell>
                                    <TableCell>{user.Pick_Status}</TableCell>
                                    <TableCell>{user.Waybill_Number}</TableCell>
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