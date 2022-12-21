/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, {useEffect, useState } from 'react'
import { Paper, makeStyles, Grid } from '@material-ui/core';
import * as adminService from "../../../services/adminService";
import Popup from "../../../components/Popup";
import TransferForm from './TransferForm';
import useTableAdmin from '../../../components/useTableAdmin';
import Header from '../../../components/Header'
import Controls from '../../../components/controls/Controls';
import { Add } from '@material-ui/icons';

const useStyles = makeStyles(theme => ({
    pageContent: {
        margin: theme.spacing(1),
        padding: theme.spacing(1), 
        
    },
    searchInput: {
        width: '50%',
        right: '1rem'
    },
    qty: {
        width: '20%',
    },
}))


const headCells = [
    { id: 'eglise', label: 'Eglise Local' },
    { id: 'cota', label: 'Montant Cotisation' },
    { id: 'versement', label: 'Versement' },
    { id: 'dateVersement', label: 'Date' },
    { id: 'actions', label: 'Action', disableSorting: true }
]

export default function Transfer() {

    const classes = useStyles();
    const [recordForEdit, setRecordForEdit] = useState(null)
    const [records, setRecords] = useState([]);
    const [currentUser, setCurrentUser] = useState(adminService.getCurrentUser());

    const getAlladmin = () => {
        (currentUser ? (currentUser.roles.toString() === "ROLE_ZONE") ? 
        (adminService.getAllLocal(currentUser.eglise)) : (adminService.getAllZone(currentUser.eglise)) : (adminService.getAllZone(currentUser.eglise)))
        .then((res) => {
            setRecords(res.data)
        });
    }
    
    useEffect(() => {
        getAlladmin();
    }, []);

    const [filterFn, setFilterFn] = useState({ fn: records => { return records; } })
    const [openPopup, setOpenPopup] = useState(false)
    // const [notify, setNotify] = useState({ isOpen: false, message: '', type: '' })
    // const [confirmDialog, setConfirmDialog] = useState({ isOpen: false, title: '', subTitle: '' })

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
                    return records.filter(x => x.eglise.toLowerCase().includes(target.value))
            }
        })
    }

    const addOrEdit = (user, resetForm) => {
        // eslint-disable-next-line no-lone-blocks
        {(user.id) ?
            adminService.updateAdmin(user.id, user) :

            console.log(user)
            console.log(user.id)
        }
        if(!user.id) {
            adminService.insertAdmin(user);
            console.log(user)
            console.log(user.id)
        }
        // setNotify({
        //     isOpen: true,
        //     message: 'Submit Successfully',
        //     type: 'success'
        // })
        resetForm()
        setRecordForEdit(null)
        setOpenPopup(false)
        getAlladmin()
    }

    const openInPopup = user => {
        setRecordForEdit(user)
        setOpenPopup(true)
    }

    return (
        <>
            <Header />
            <Grid >
                <Paper className={classes.pageContent}>
                    <div>
                        <TransferForm />
                    </div>
                </Paper>
                <Paper className={classes.pageContent}>
                    <p>idProduit : </p>
                    <p>Agent : </p>
                    <p>Telephone : </p>
                </Paper>
            </Grid>
            <Popup
                title="Formulaire Eglise"
                openPopup={openPopup}
                setOpenPopup={setOpenPopup}
            >
                <TransferForm
                    recordForEdit={recordForEdit}
                    addOrEdit={addOrEdit} />
            </Popup>
            {/* <Notification
                notify={notify}
                setNotify={setNotify}
            /> */}
        </>
    )
}
