/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, {useEffect, useState } from 'react'
import { Paper, makeStyles, Grid, TableBody, TableRow, TableCell, ButtonGroup } from '@material-ui/core';
import * as adminService from "../../../services/adminService";
import TransferForm from './TransferForm';
import useTableAdmin from '../../../components/useTableAdmin';
import Header from '../../../components/Header'
import Controls from '../../../components/controls/Controls';
import { Add, Remove } from '@material-ui/icons';

const useStyles = makeStyles(theme => ({
    pageContent: {
        margin: theme.spacing(1),
        padding: theme.spacing(1), 
        
    },
    searchInput: {
        width: '50px',
        right:'2px',
    },
    qty: {
        width: '20%',
    },
}))


const headCells = [
    { id: 'waybill_number', label: 'WayBill Number' },
    { id: 'material_name', label: 'Material Name' },
    { id: 'reference_material', label: 'Reference Material' },
    { id: 'quantity', label: 'Quantity Material' },
    { id: 'actions', label: 'Action', disableSorting: true }
]

export default function Transfer() {

    const classes = useStyles();
    const [recordForEdit, setRecordForEdit] = useState(null)
    const [records, setRecords] = useState([]);
    const [currentUser, setCurrentUser] = useState(adminService.getCurrentUser());

    const getAllTransfer = () => {
        adminService.getAllTransfer()
        .then((res) => {
            setRecords(res.data)
        });
    }
    
    useEffect(() => {
        getAllTransfer();
    }, []);

    const [filterFn, setFilterFn] = useState({ fn: records => { return records; } })
    const [openPopup, setOpenPopup] = useState(false)

    const {
        TblContainer,
        TblHead,
        TblPagination,
        recordsAfterPagingAndSorting
    } = useTableAdmin(records, headCells, filterFn);

    const handleSearch = e => {
        let target = e.target;
        setFilterFn({
            fn: records => {
                if (target.value === "")
                    return records;
                else
                    return records.filter(x => x.reference_material.toLowerCase().includes(target.value))
            }
        })
    }

    const openInPopup = user => {
        setRecordForEdit(user)
        setOpenPopup(true)
    }

    const [itemCount, setItemCount] = useState(1);

    return (
        <>
            <Header />
            <Grid >
                <Paper className={classes.pageContent}>
                    <div>
                        <TransferForm 
                            handleSearch={handleSearch}
                            items={adminService.searchBy()}
                        />
                    </div>
                </Paper>
                <Paper >
                    <TblContainer>
                    <TblHead />
                    <TableBody>
                        {
                            recordsAfterPagingAndSorting().map(transfer =>
                                (<TableRow key={transfer.id}>
                                    <TableCell>{transfer.waybill_number}</TableCell>
                                    <TableCell>{transfer.material_name}</TableCell>
                                    <TableCell>{transfer.reference_material}</TableCell>
                                    <TableCell>
                                        <ButtonGroup>
                                            <Controls.Button
                                                onClick={() => {
                                                setItemCount(Math.max(itemCount - 1, 0));
                                                }}
                                                startIcon={<Remove />}
                                                size='small'
                                                style={{backgroundColor: 'rgb(216, 27, 96)'}}
                                            />
                                            <Controls.Input
                                                value={itemCount}
                                                className={classes.searchInput}
                                                size='small'
                                            />
                                            <Controls.Button
                                                onClick={() => {
                                                setItemCount(itemCount + 1);
                                                }}
                                                startIcon={<Add />}
                                                size='small'
                                                style={{backgroundColor: 'rgb(26, 115, 232)'}}
                                            />
                                        </ButtonGroup>
                                    </TableCell>
                                    <TableCell>
                                        <Controls.Button
                                            style={{backgroundColor:"rgb(67, 160, 71)"}}
                                            startIcon={<Add />}
                                            text='Add'
                                        />
                                    </TableCell>
                                </TableRow>)
                            )
                        }
                    </TableBody>
                </TblContainer>
                </Paper>
            </Grid>
        </>
    )
}
