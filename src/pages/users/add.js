/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useEffect } from "react";
import { useForm, Form } from "../../components/useForm";
import { Grid, } from '@material-ui/core';
import Controls from "../../components/controls/Controls";
import * as userService from "../../services/userService";
import { useState } from "react";


// const genderItems = [
//     { id: 'action_sur_admins', title: 'Crer et modifier sous-admin' },
//     { id: 'action_sur_associations', title: 'Creer et modifier association' },
//     { id: 'action_sur_membres', title: 'Creer et modifier membre-association' },
// ]

const initialeValues = {
    firstname: '',
    lastname:'',
    username:'',
    email:'',
}

export default function AddUserForm(props) {
    const { addOrEdit, recordForEdit } = props;
    const [currentUser, setCurrentUser] = useState(userService.getCurrentUser());
    
    const validate = (fieldValues = values) => {
        let temp = { ...errors }
        if ('firstname' in fieldValues)
            temp.firstname = fieldValues.firstname ? "" : "This field is required."
        if ('lastname' in fieldValues)
            temp.lastname = fieldValues.lastname ? "" : "This field is required."
        if ('username' in fieldValues)
            temp.username = fieldValues.username.length > 3 ? "" : "Minimum 4 caracters required."
        if ('email' in fieldValues)
            temp.email = fieldValues.email ? "" : "Email is not valid."
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
        <Form onSubmit={handleSubmit}>
            <Grid container>
                <Grid item xs={6}>
                    <Controls.Input
                        name="firstname"
                        label="First Name"
                        value={values.firstname}
                        onChange={handleInputChange}
                        error={errors.firstname}
                    />
                    <Controls.Input
                        label="Last Name"
                        name="lastname"
                        value={values.lastname}
                        onChange={handleInputChange}
                        error={errors.lastname}
                    />
                </Grid>
                <Grid item xs={6}>
                    <Controls.Input
                        label="Username"
                        name="username"
                        value={values.username}
                        onChange={handleInputChange}
                        error={errors.username}
                    />
                    <Controls.Input
                        name="email"
                        label="Email"
                        value={values.email}
                        onChange={handleInputChange}
                        error={errors.email}
                    />
                    <div>
                        <Controls.Button
                            text="Close"
                            color="default"
                            onClick={resetForm} />
                        <Controls.Button
                            type="submit"
                            text="Confirmar" />
                    </div>
                </Grid>
            </Grid>
        </Form>
    )
}