/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { Form, useForm } from '../../components/useForm';
import * as adminService from "../../services/adminService";
import { Grid, Paper } from '@material-ui/core';
import Controls from '../../components/controls/Controls';

const initialFValues = {
    office_location: '',
    staff_name:'',
    designation:'',
    ta_number:'',
    pmv_date_travel: '',
    email: '',
    telephone: '',
    initial_name: '',
    date_by_traveller: '',
    comment_by_supervisor: '',
    capture_image: ''
}

function Pmv(props) {
    const { addOrEdit, recordForEdit } = props;
    const [currentUser, setCurrentUser] = useState(adminService.getCurrentUser());
    
    const validate = (fieldValues = values) => {
        let temp = { ...errors }
        if ('office_location' in fieldValues)
            temp.office_location = fieldValues.office_location ? "" : "This field is required."
        if ('staff_name' in fieldValues)
            temp.staff_name = fieldValues.staff_name ? "" : "This field is required."
        if ('designation' in fieldValues)
            temp.designation = fieldValues.designation ? "" : "This field is required."
        if ('ta_number' in fieldValues)
            temp.ta_number = fieldValues.ta_number ? "" : "This field is required."
        if ('pmv_date_travel' in fieldValues)
            temp.pmv_date_travel = fieldValues.pmv_date_travel ? "" : "This field is required."
        if ('email' in fieldValues)
            temp.email = fieldValues.email ? "" : "This field is required."
        if ('telephone' in fieldValues)
            temp.telephone = fieldValues.telephone ? "" : "This field is required."
        if ('initial_name' in fieldValues)
            temp.initial_name = fieldValues.initial_name ? "" : "This field is required."
        if ('date_by_traveller' in fieldValues)
            temp.date_by_traveller = fieldValues.date_by_traveller ? "" : "This field is required."
        if ('comment_by_supervisor' in fieldValues)
            temp.comment_by_supervisor = fieldValues.comment_by_supervisor ? "" : "This field is required."
        if ('capture_image' in fieldValues)
            temp.capture_image = fieldValues.capture_image ? "" : "This field is required."
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
    } = useForm(initialFValues, true, validate);

    useEffect(() => {
        if (recordForEdit !== null)
            setValues({
                ...recordForEdit
            })
    }, [recordForEdit])

    return (
        <>
            <Paper>
                <Form onSubmit={handleSubmit}>
                    <Grid container>
                        <Grid item xs={6}>
                            <Controls.Input
                                name="office_location"
                                label="Office Location"
                                value={values.office_location}
                                onChange={handleInputChange}
                                error={errors.office_location}
                            />
                            <Controls.Select
                                label="Staff Name"
                                name="staff_name"
                                value={values.staff_name}
                                onChange={handleInputChange}
                                options={adminService.getAutorisation()}
                                error={errors.staff_name}
                            />
                            <Controls.DatePicker 
                                label="PMV Date Travel"
                                name="pmv_date_travel"
                                value={values.pmv_date_travel}
                                onChange={handleInputChange}
                            />
                            <Controls.Input 
                                label="telephone"
                                name="telephone"
                                value={values.telephone}
                                onChange={handleInputChange}
                                error={errors.telephone}
                            />
                            <Controls.DatePicker 
                                label="Date by Traveller"
                                name="date_by_traveller"
                                value={values.date_by_traveller}
                                onChange={handleInputChange}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <Controls.Input
                                name="designation"
                                label="Designation or Title"
                                value={values.designation}
                                onChange={handleInputChange}
                                error={errors.designation}
                            />
                            <Controls.Input
                                name="ta_number"
                                label="TA Number"
                                value={values.ta_number}
                                onChange={handleInputChange}
                                error={errors.ta_number}
                            />
                            <Controls.Input
                                name="ta_nuemailmber"
                                label="Email address"
                                value={values.email}
                                onChange={handleInputChange}
                                error={errors.email}
                            />
                            <Controls.Input
                                name="initial_name"
                                label="Name Initial"
                                value={values.initial_name}
                                onChange={handleInputChange}
                                error={errors.initial_name}
                            />
                            <Controls.Input
                                name="comment_by_supervisor"
                                label="Comments by supervisor "
                                value={values.comment_by_supervisor}
                                onChange={handleInputChange}
                                error={errors.comment_by_supervisor}
                            />
                            <Controls.Button
                                type="submit"
                                text="Transfer" />
                        </Grid>
                    </Grid>
                </Form> 
            </Paper>
        </>
    );
}

export default Pmv;