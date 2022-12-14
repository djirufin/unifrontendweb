import React, {useEffect, useState } from 'react'
import { Paper, makeStyles, TableBody, TableRow, TableCell, Toolbar, InputAdornment } from '@material-ui/core';
import * as adminService from "../../services/adminService";
import Controls from "../../components/controls/Controls";
import { Search } from "@material-ui/icons";
import AddIcon from '@material-ui/icons/Add';
import Popup from "../../components/Popup";
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import Header from '../../components/Header';
import useTable from '../../components/useTable';
import RegionForm from './RegionForm';

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
    }
}))


const headCells = [
    { id: 'region', label: 'Région' },
    { id: 'cota', label: 'Montant Cotisation' },
    { id: 'versement', label: 'Versement' },
    { id: 'dateVersement', label: 'Date' },
    { id: 'actions', label: 'Action', disableSorting: true }
]

export default function Region() {

    const classes = useStyles();
    const [recordForEdit, setRecordForEdit] = useState(null)
    const [records, setRecords] = useState([]);

    const getAll = () => {
        adminService.getAllRegion()
        .then((res) => {
            setRecords(res.data)
        });
    }
    
    useEffect(() => {
        getAll();
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
    } = useTable(records, headCells, filterFn);

    const handlSearch = e => {
        let target = e.target;
        setFilterFn({
            fn: records => {
                if (target.value === "")
                    return records;
                else
                    return records.filter(x => x.region.toLowerCase().includes(target.value))
            }
        })
    }

    const addOrEdit = (fe, resetForm) => {
        {(fe.id) ?
            (adminService.updateAdmin(fe.id, fe)) :
            fe.id = 0 

            console.log(fe)
            console.log(fe.id)
        }
        if(fe.id === 0) {
            adminService.insertAdmin(fe)
        console.log(fe)
        console.log(fe.id)
        }
        resetForm()
       // window.location.reload()
        setRecordForEdit(null)
        setOpenPopup(false)
        getAll()
    }

    const openInPopup = fe => {
        setRecordForEdit(fe)
        setOpenPopup(true)
    }

    return (
        <>
            <Header />
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
                        onChange={handlSearch}
                    />
                    <Controls.Button
                        text="Ajouter"
                        variant="outlined"
                        startIcon={<AddIcon />}
                        className={classes.newButton}
                        onClick={() => { setOpenPopup(true); setRecordForEdit(null); }}
                    />
                </Toolbar>
                <TblContainer>
                    <TblHead />
                    <TableBody>
                        {
                            recordsAfterPagingAndSorting().map(fe =>
                                (<TableRow key={fe.id}>
                                    <TableCell>{fe.eglise}</TableCell>
                                    <TableCell>{fe.cota}</TableCell>
                                    <TableCell>{fe.versement}</TableCell>
                                    <TableCell>{fe.creationdate}</TableCell>
                                    <TableCell>
                                        <Controls.ActionButton
                                            color="primary"
                                            onClick={() => { openInPopup(fe) }}>
                                            <EditOutlinedIcon fontSize="small" />
                                        </Controls.ActionButton>
                                    </TableCell>
                                </TableRow>)
                            )
                        }
                    </TableBody>
                </TblContainer>
                <TblPagination />
            </Paper>
            <Popup
                title="Formulaire Région"
                openPopup={openPopup}
                setOpenPopup={setOpenPopup}
            >
                <RegionForm
                    recordForEdit={recordForEdit}
                    addOrEdit={addOrEdit} />
            </Popup>
        </>
    )
}
