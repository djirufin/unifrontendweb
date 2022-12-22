/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useEffect } from "react";
import { useFormAdmin, Form } from "../../../components/useFormAdmin";
import { Grid, InputAdornment, makeStyles, } from '@material-ui/core';
import Controls from "../../../components/controls/Controls";
import * as adminService from "../../../services/adminService";
import { useState } from "react";
import { Search } from "@material-ui/icons";
import classNames from "classnames";
import DataListInput from "react-datalist-input";

const initialeValues = {
    logistic_type: '',
    partner:'',
    agent:'',
    staff:'',
    disabled: true

}

const useStyles = makeStyles(theme => ({
    searchInput: {
        width: '90%',
    },
}))

export default function TransferForm(props) {
    const { addOrEdit, recordForEdit, handleSearch, items, searchby } = props;
    const [search, setSearch] = useState(null);
    const [currentUser, setCurrentUser] = useState(adminService.getCurrentUser());
    
    const validate = (fieldValues = values) => {
        let temp = { ...errors }
        if ('logistic_type' in fieldValues)
            temp.logistic_type = fieldValues.logistic_type ? "" : "This field is required."
        if ('partner' in fieldValues)
            temp.partner = fieldValues.partner ? "" : "This field is required."
        if ('agent' in fieldValues)
            temp.agent = fieldValues.agent ? "" : "This field is required."
        if ('staff' in fieldValues)
            temp.staff = fieldValues.staff ? "" : "This field is required."
        setErrors({
            ...temp
        })

        if (fieldValues === values)
            return Object.values(temp).every(x => x === "")
    }

    const handleSubmit = e => {
        e.preventDefault()
        if (validate()) {
            addOrEdit(values, resetForm);
        }
    }

    const {
        values,
        setValues,
        errors,
        setErrors,
        handleInputChange,
        resetForm
    } = useFormAdmin(initialeValues, true, validate);

    useEffect(() => {
        if (recordForEdit !== null)
            setValues({
                ...recordForEdit
            })
    }, [recordForEdit])

    const classes = useStyles();

    return (
        <Form onSubmit={handleSubmit}>
            <Grid >
                <Grid item xs={6}>
                    <Controls.RadioGroup
                        label='Search By'
                        name="searchby"
                        value={values.searchby}
                        onChange={handleInputChange}
                        items={items}
                    />
                    <Controls.Input
                        DataListInput='data'
                        InputProps={{
                            startAdornment: (<InputAdornment position="start">
                                <Search />
                            </InputAdornment>)
                        }}
                        className={classes.searchInput}
                        disabled={(!values.searchby) ? true : false}
                        onChange={handleSearch}
                    />
                    <datalist id="data">
                        <option>One</option>
                        <option>Two</option>
                        <option>Three</option>
                        <option>Four</option>
                        <option>Five</option>
                    </datalist>
                    {/* <div> 
                        <Controls.Button
                            type="submit"
                            text="Search" 
                            disabled={(!values.searchby) ? true : false}
                        />
                    </div> */}
                </Grid>
            </Grid>
        </Form>
    )
}