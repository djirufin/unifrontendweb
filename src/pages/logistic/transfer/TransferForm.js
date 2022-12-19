/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useEffect } from "react";
import { useFormAdmin, Form } from "../../../components/useFormAdmin";
import { Grid, } from '@material-ui/core';
import Controls from "../../../components/controls/Controls";
import * as adminService from "../../../services/adminService";
import { useState } from "react";

const initialeValues = {
    logistic_type: '',
    partner:'',
    agent:'',
    staff:'',

}

export default function TransferForm(props) {
    const { addOrEdit, recordForEdit } = props;
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


    return (
        <Form onSubmit={handleSubmit}>
            <Grid container>
                <Grid item xs={6}>
                    <Controls.Input
                        name="logistic_type"
                        label="Select Logistic type"
                        value={values.logistic_type}
                        onChange={handleInputChange}
                        error={errors.logistic_type}
                    />
                    <Controls.Select
                        label="Select partner"
                        name="partner"
                        value={values.partner}
                        onChange={handleInputChange}
                        options={adminService.getAutorisation()}
                        error={errors.partner}
                    />
                </Grid>
                <Grid item xs={6}>
                    <Controls.Input
                        name="agent"
                        label="Select Agent"
                        value={values.agent}
                        onChange={handleInputChange}
                        error={errors.agent}
                    />
                    <Controls.Input
                        name="staff"
                        label="Select staff"
                        value={values.staff}
                        onChange={handleInputChange}
                        error={errors.staff}
                    />
                        <Controls.Button
                            type="submit"
                            text="Transfer" />
                </Grid>
            </Grid>
        </Form>
    )
}