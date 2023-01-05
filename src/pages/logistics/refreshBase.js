/* eslint-disable react-hooks/exhaustive-deps */
import { Grid } from '@material-ui/core';
import React from 'react';
import { useEffect } from 'react';
import Controls from '../../components/controls/Controls';
import { Form, useForm } from '../../components/useForm';

const initialeValues = {
    refresh: ''
}

export default function RefreshBase(props) {

    const { addOrEdit, recordForEdit } = props;
    
    const validate = (fieldValues = values) => {
        let temp = { ...errors }
        if ('refresh' in fieldValues)
            temp.refresh = fieldValues.refresh ? "" : "This field is required."
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
    } = useForm(initialeValues, true, validate);

    useEffect(() => {
        if (recordForEdit !== null)
            setValues({
                ...recordForEdit
            })
    }, [recordForEdit])

    return (
        <>
            <Form onSubmit={handleSubmit}>
                <Grid container>
                    <Grid item xs={14}>
                        <Controls.Input
                            name="refresh"
                            type='file'
                            accept=".csv"
                            value={values.refresh}
                            onChange={handleInputChange}
                            // error={errors.refresh}
                        />
                        <div>
                            <Controls.Button
                                type="submit"
                                text="Submit" />
                        </div>
                    </Grid>
                </Grid>
            </Form>
        </>
    );
}