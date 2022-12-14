/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useEffect } from "react";
import { useFormAdmin, Form } from "../../../components/useFormAdmin";
import { Grid, } from '@material-ui/core';
import Controls from "../../../components/controls/Controls";
import * as adminService from "../../../services/adminService";
import { useState } from "react";

const initialeValues = {
    product: '',
    qantity:'',
    agent:'',
    staff:'',

}

export default function DispatchForm(props) {
    const { addOrEdit, recordForEdit } = props;
    const [currentUser, setCurrentUser] = useState(adminService.getCurrentUser());
    
    const validate = (fieldValues = values) => {
        let temp = { ...errors }
        if ('product' in fieldValues)
            temp.product = fieldValues.product ? "" : "This field is required."
        if ('quantity' in fieldValues)
            temp.quantity = fieldValues.quantity ? "" : "This field is required."
        // if ('agent' in fieldValues)
        //     temp.agent = fieldValues.agent ? "" : "This field is required."
        // if ('staff' in fieldValues)
        //     temp.staff = fieldValues.staff ? "" : "This field is required."
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
                        name="product"
                        label="Select product"
                        value={values.product}
                        onChange={handleInputChange}
                        error={errors.product}
                    />
                    {/* <Controls.Select
                        label="Select partner"
                        name="partner"
                        value={values.partner}
                        onChange={handleInputChange}
                        options={adminService.getAutorisation()}
                        error={errors.partner}
                    /> */}
                </Grid>
                <Grid item xs={6}>
                    <Controls.Input
                        name="quantity"
                        label="Quantity"
                        value={values.quantity}
                        onChange={handleInputChange}
                        error={errors.quantity}
                    />
                    {/* <Controls.Input
                        name="staff"
                        label="Select staff"
                        value={values.staff}
                        onChange={handleInputChange}
                        error={errors.staff}
                    /> */}
                </Grid>
            </Grid>
        </Form>
    )
}