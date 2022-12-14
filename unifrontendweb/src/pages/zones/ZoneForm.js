import React, { useEffect } from 'react'
import { Grid, } from '@material-ui/core';
import Controls from "../../components/controls/Controls";
import { FormF, useFormF } from '../../components/useFormF';
import * as feeService from '../../services/feeService'


const initialFValues = {
    eglise:'',
    region:'',
    cota:'',
    name: '',
    telephone: '',
    username: '',
    password: '',
    autorisation: '',
}

export default function ZoneForm(props) {
    const { addOrEdit, recordForEdit } = props

    const validate = (fieldValues = values) => {
        let temp = { ...errors }
        if ('eglise' in fieldValues)
            temp.eglise = fieldValues.eglise ? "" : "This field is required."
        if ('region' in fieldValues)
            temp.region = fieldValues.region ? "" : "This field is required."
        if ('cota' in fieldValues)
            temp.cota = fieldValues.cota ? "" : "This field is required."
        if ('name' in fieldValues)
            temp.name = fieldValues.name ? "" : "This field is required."
        if ('telephone' in fieldValues)
            temp.telephone = fieldValues.telephone.length > 9 ? "" : "Minimum 10 numbers required."
        if ('username' in fieldValues)
            temp.username = fieldValues.username ? "" : "Email is not valid."
        if ('password' in fieldValues)
            temp.password = fieldValues.password ? "" : "This field is required."
        if ('autorisation' in fieldValues)
            temp.autorisation = fieldValues.autorisation ? "" : "This field is required."
        setErrors({
            ...temp
        })

        if (fieldValues === values)
            return Object.values(temp).every(x => x === "")
    }

    const {
        values,
        setValues,
        errors,
        setErrors,
        handleInputChange,
        resetForm
    } = useFormF(initialFValues, true, validate);

    const handleSubmit = e => {
        e.preventDefault()
        if (validate()) {
            addOrEdit(values, resetForm);
        }
    }

    useEffect(() => {
        if (recordForEdit !== null)
            setValues({
                ...recordForEdit
            })
    }, [recordForEdit])

    return (
        <FormF onSubmit={handleSubmit}>
            <Grid container>
            <Grid item xs={6}>
                    <Controls.Input
                        name="eglise"
                        label="Zone"
                        value={values.eglise}
                        onChange={handleInputChange}
                        error={errors.eglise}
                    />
                    <Controls.Input
                        label="Montant Cotisation"
                        name="cota"
                        value={values.cota}
                        onChange={handleInputChange}
                        error={errors.cota}
                    />
                    <Controls.Input
                        label="Nom & prenom"
                        name="name"
                        value={values.name}
                        onChange={handleInputChange}
                        error={errors.name}
                    />
                    <Controls.Input
                        name="telephone"
                        label="Telephone"
                        value={values.telephone}
                        onChange={handleInputChange}
                        error={errors.telephone}
                    />
                </Grid>
                <Grid item xs={6}>
                    <Controls.Input
                        name="username"
                        label="Nom utilisateur"
                        value={values.username}
                        onChange={handleInputChange}
                        error={errors.username}
                    />
                    <Controls.Input
                        name="password"
                        type="password"
                        label="Mot de passe"
                        value={values.password}
                        onChange={handleInputChange}
                        error={errors.password}
                    />
                    <Controls.Input
                        name="region"
                        label="Region"
                        value={values.region}
                        onChange={handleInputChange}
                        error={errors.region}
                    />
                    <Controls.Select
                        label="Role"
                        name="autorisation"
                        value={values.autorisation}
                        onChange={handleInputChange}
                        options={feeService.getAutorisation()}
                        error={errors.autorisation}
                    />
                    <div>
                        <Controls.Button
                            type="submit"
                            text="VALIDATION" />
                        <Controls.Button
                            text="REDEFINIR"
                            color="default"
                            onClick={resetForm} />
                    </div>
                </Grid>
            </Grid>
        </FormF>
    )
}
