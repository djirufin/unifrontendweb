/* eslint-disable no-unused-vars */
import React, {useEffect, useState } from 'react'
import { Paper, makeStyles, TableBody, TableRow, TableCell,Grid } from '@material-ui/core';
import * as logisticService from '../../services/logisticService';
import * as manageService from "../../services/managementService"
import Controls from "../../components/controls/Controls";
import useTable from '../../components/useTable';
import Header from '../../components/Header';
import { Form } from '../../components/useForm';

const useStyles = makeStyles(theme => ({
    pageContent: {
        margin: theme.spacing(0.4),
        padding: theme.spacing(1)
    },
    searchInput: {
        width: '70%',
        left: '0rem'
    },
}))

const headCells = [
    { id: 'release_order', label: 'Release Order' },
    { id: 'waybill', label: 'Waybill Number' },
    { id: 'material', label: 'Material' },
    { id: 'material_description', label: 'Material Description' },
]

const listType = [
    { id: 'zrost', title: 'ZROST' },
    { id: 'ddel', title: 'DDEL' },
]

const logisticTypeSelect = [
    { id: 'waybill', title: 'WayBill'},
    { id: 'release_order', title: 'Release Order' },
]

const logisticTypeSelect2 = [
    { id: 'purchase_order', title: 'Purchase Order'},
    { id: 'sales_order', title: 'Sales Order' },
]

export default function NewOrder() {
    const classes = useStyles();

    const [recordForEdit, setRecordForEdit] = useState(null)
    const [filterFn, setFilterFn] = useState({ fn: records => { return records; } })
    const [orgByType, setOrgByType] = useState([])
    const [searchText, setSearchText] = useState("");
    const [result, setResult] = useState([]);
    const [selectedOption, setSelectedOption] = useState("waybill");
    const [selectedOption2, setSelectedOption2] = useState("purchase_order");
    const [logisticType, setLogisticType] = useState("zrost");

    const handleSearchChange = (e) => {
        if(selectedOption) {
            if(searchText.length > 3) {
                logisticService.searchMaterial(selectedOption, searchText)
                .then((response) => {  
                    setResult(response.data)
                });
            } else {
                setResult([])
            }
        }
        
        console.log("result", result)
        e.preventDefault()
    }

    const getOrgByType = () => {
        manageService.getOrgByType("SUPPLIER")
        .then((res) => {
            setOrgByType(res.data)
        });
    }
    
    useEffect(() => {
        getOrgByType();
    }, []);

    const supplier = [
        orgByType.map
    ]

    const {
        TblContainer,
        TblHead,
        TblPagination,
        recordsAfterPagingAndSorting
    } = useTable(result, headCells, filterFn);

    const changeLogisticType = (e) => {
        setLogisticType(e.target.value)
    }

    const handletInput = (e) => {
        setSearchText(e.target.value)
    }

    const onChangeSearch = (e) => {
        setSelectedOption(e.target.value)
    }
    console.log("SUPPLIER", orgByType)
    return (
        <>
            <Header />
            <Paper className={classes.pageContent}>
                <Form onSubmit={handleSearchChange}>
                    <Grid container>
                        <Grid item xs={6}>
                            <Controls.Select
                            value={logisticType}
                            onChange={changeLogisticType}
                            options={listType}
                            />
                            <Controls.Input
                            label="Search"
                            name="searchText"
                            onChange={handletInput}
                            value={searchText}
                            className={classes.searchInput}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <Controls.Select
                                value={logisticType==="zrost" ? selectedOption : selectedOption2}
                                onChange={onChangeSearch}
                                options={logisticType==="zrost" ? logisticTypeSelect : logisticTypeSelect2}
                            />
                            <Controls.Button
                                text="Submit"
                                type="submit"
                            />
                        </Grid>
                    </Grid>
                </Form>
            </Paper>
            {(result !== []) ? (<Paper className={classes.pageContent}>
                <TblContainer>
                    <TblHead />
                    <TableBody>
                        {
                            recordsAfterPagingAndSorting().map(user =>
                                (<TableRow key={user.id}>
                                    <TableCell>{user["Release Order Number"]}</TableCell>
                                    <TableCell>{user["Waybill Number"]}</TableCell>
                                    <TableCell>{user["Material"]}</TableCell>
                                    <TableCell>{user["Material Description"]}</TableCell>
                                </TableRow>)
                            )
                        }
                    </TableBody>
                </TblContainer>
                {/* <p>Authorized person : <strong>{(result[0]["Authorized Person"])}</strong></p>
                <p>IP : <strong>{result[0]["Consignee Name"]}</strong></p> */}
                <Form>
                    <Grid item xs={6}>
                        <select>
                            {orgByType.map(type => (
                                <option id={type.id}> {type.name} </option>
                            ) )}
                        </select>
                    </Grid>
                </Form>
            </Paper>)
            : null
            }            
        </>
    )
}
