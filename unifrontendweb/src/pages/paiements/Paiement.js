import React, {useEffect, useState } from 'react'
import { Paper, makeStyles, TableBody, TableRow, TableCell, Toolbar, InputAdornment } from '@material-ui/core';
import * as membreService from "../../services/membreService";
import Controls from "../../components/controls/Controls";
import { HowToRegOutlined, Search } from "@material-ui/icons";
import AddIcon from '@material-ui/icons/Add';
import Popup from "../../components/Popup";
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import MembreForm from './PaiementForm';
import useTableMembre from '../../components/useTableMembre';
import SideMenu from '../../components/SideMenu';
import Header from '../../components/Header';
import $ from 'jquery'

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
    }
}))


const headCells = [
    <Controls.Checkbox/>,
    { id: 'deposant', label: 'Nom & prenom' },
    { id: 'telephone', label: 'Telephone' },
    { id: 'local', label: 'Eglise' },
    { id: 'montant', label: 'Montant' },
    { id: 'actions', label: 'Action', disableSorting: true }
]

export default function Paiement() {

    const classes = useStyles();
    const [recordForEdit, setRecordForEdit] = useState(null)
    const [records, setRecords] = useState([]);
    const [currentUser, setCurrentUser] = useState(membreService.getCurrentUser());

    const getmembre = () => {
        (currentUser ? (currentUser.roles.toString() === "ROLE_ZONE") ? 
        (membreService.getMembre(currentUser.eglise)) : (membreService.getAllMembre()) : (membreService.getAllMembre()))
        .then((res) => {
            setRecords(res.data)
        });
    }
    
    useEffect(() => {
        getmembre();
    }, []);
    const [filterFn, setFilterFn] = useState({ fn: records => { return records; } })
    const [openPopup, setOpenPopup] = useState(false)
    // const [notify, setNotify] = useState({ isOpen: false, message: '', type: '' })
    // const [confirmDialog, setConfirmDialog] = useState({ isOpen: false, title: '', subTitle: '' })
    const [MasterChecked, setMasterChecked] = useState(false);
    const [List, setList] = useState([]);
    const [Message, setMessage] = useState("")

    const {
        TblContainer,
        TblHead,
        TblPagination,
        recordsAfterPagingAndSorting
    } = useTableMembre(records, headCells, filterFn);

    const handleSearch = e => {
        let target = e.target;
        setFilterFn({
            fn: records => {
                if (target.value === "")
                    return records;
                else
                    return records.filter(x => x.deposant.toLowerCase().includes(target.value))
            }
        })
    }

    const onMasterCheck = (e, item) => {
        let target = e.target;
        records.map((membre) => {
            if(membre.id === item.id) {
                setMasterChecked(target.checked)
                console.log(membre, MasterChecked)
            }
            return membre;
        })
        
        
    }

    const validPayer = (e, list) => {
        e.preventDefault()
        let text = "Aucun payeur choisit";
        if(list){
            setMessage("test")
        } else {
            setMessage(text)
        }
        console.log(Message+" "+List)
        setList([])
    }

    const addOrEdit = (membre, resetForm) => {
        // eslint-disable-next-line no-lone-blocks
        {(membre.id) ? 
            membreService.updateMembre(membre.id, membre) :
            console.log(membre)
            console.log(membre.id)
        } 
        if(!membre.id) {
            membreService.insertMembre(membre);
            console.log(membre)
            console.log(membre.id)
        }
        // setNotify({
        //     isOpen: true,
        //     message: 'Submit Successfully',
        //     type: 'success'
        // })
        resetForm()
        setRecordForEdit(null)
        setOpenPopup(false)
        getmembre()
        console.log(membre.id)
    }

    const openInPopup = membre => {
        setRecordForEdit(membre)
        setOpenPopup(true)
    }
    return (
        <>
        
            <Header />
            <Paper className={classes.pageContent}>
                {(currentUser ? (currentUser.roles.toString() === "ROLE_LOCAL") ? 
                
                (<MembreForm 
                 addOrEdit={addOrEdit} />) :

                (<div> 
                    <Toolbar>
                        <Controls.Input
                            label="Recherche"
                            className={classes.searchInput}
                            InputProps={{
                                startAdornment: (<InputAdornment position="start">
                                    <Search />
                                </InputAdornment>)
                            }}
                            onChange={handleSearch}
                        />
                        <div>{List}</div>
                        <Controls.Button
                            text="Valider"
                            variant="outlined"
                            className={classes.newButton1}
                            onClick={(e) => {validPayer(e, List)}}
                            disabled={List ? true : false}
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
                                recordsAfterPagingAndSorting().map(membre =>
                                    (<TableRow key={membre.id}>
                                        {/* <script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min.js"></script> */}
                                        <TableCell><Controls.Checkbox
                                            name={membre.id}
                                            checked={MasterChecked}
                                            onChange={(e) => {onMasterCheck(e, membre)}}
                                            /></TableCell>
                                        <TableCell>{membre.deposant}</TableCell>
                                        <TableCell>{membre.telephone}</TableCell>
                                        <TableCell>{membre.local}</TableCell>
                                        <TableCell>{membre.montant}</TableCell>
                                        <TableCell>
                                            <Controls.ActionButton
                                                color="primary"
                                                onClick={() => { openInPopup(membre) }}>
                                                <EditOutlinedIcon 
                                                    fontSize="small" />
                                            </Controls.ActionButton>
                                            {/* <Controls.ActionButton
                                                color="default">
                                                <HowToRegOutlined  
                                                    fontSize="small" />
                                            </Controls.ActionButton> */}
                                        </TableCell>
                                    </TableRow>)
                                )
                            }
                        </TableBody>
                    </TblContainer>
                    <TblPagination />
                </div>) 
                : null)}
            </Paper>
            <Popup
                title="Formulaire paiement"
                openPopup={openPopup}
                setOpenPopup={setOpenPopup}
            >
                <MembreForm
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
// $("tbody").on("click", "tr", function() {     
        //     $(this)
        //        .toggleClass("selected")
        //        .siblings(".selected")
        //            .removeClass("selected");
        // });