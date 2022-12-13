import React, { useEffect } from "react";
import { Grid, } from '@material-ui/core';
import Controls from "../../components/controls/Controls";
import * as adminService from "../../services/adminService";
import { useFormMembre, Form } from "../../components/useFormMembre";
import { useState } from "react";


// const genderItems = [
//     { id: 'action_sur_admins', title: 'Crer et modifier sous-admin' },
//     { id: 'action_sur_associations', title: 'Creer et modifier association' },
//     { id: 'action_sur_membres', title: 'Creer et modifier membre-association' },
// ]

const initialValues = {
    deposant: '',
    telephone: '',
    local: '',
    zone:'',
    region:'',
    montant: '',
    preuve: '',
    statut: '',
    // creationdatetime: new Date()

}

export default function MembreForm(props) {
    const { addOrEdit, recordForEdit } = props

    const [currentUser, setCurrentUser] = useState(adminService.getCurrentUser());

    const validate = (fieldValues = values) => {
        let temp = { ...errors }
        if ('deposant' in fieldValues)
            temp.deposant = fieldValues.deposant ? "" : "This field is required."
        if ('telephone' in fieldValues)
            temp.telephone = fieldValues.telephone.length > 9 ? "" : "Minimum 10 numbers required."
        if ('local' in fieldValues)
            temp.local = fieldValues.local ? "" : "This field is required."
        if ('zone' in fieldValues)
            temp.zone = fieldValues.zone ? "" : "This field is required."
        if ('region' in fieldValues)
            temp.region = fieldValues.region ? "" : "This field is required."
        if ('montant' in fieldValues)
            temp.montant = fieldValues.montant ? "" : "This field is required."
        if ('statut' in fieldValues)
            temp.statut = fieldValues.statut.length !== 0 ? "" : "This field is required."
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
    } = useFormMembre(initialValues, true, validate);

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
                        label="Nom & prenom"
                        name="deposant"
                        value={values.deposant}
                        onChange={handleInputChange}
                        error={errors.deposant}
                    />
                    <Controls.Input
                        name="telephone"
                        label="Telephone"
                        value={values.telephone}
                        onChange={handleInputChange}
                        error={errors.telephone}
                    />
                    <Controls.Input
                        label="Eglise Local"
                        name="local"
                        value={values.local}
                        onChange={handleInputChange}
                        error={errors.local}
                    />
                    <Controls.Input
                        name="zone"
                        label="Zone"
                        value={values.zone}
                        onChange={handleInputChange}
                        error={errors.zone}
                    />
                    {/* {(currentUser.roles.toString() === "ROLE_ADMIN") ? 
                    <Controls.Select
                        label="Statut"
                        name="statut"
                        value={values.statut}
                        onChange={handleInputChange}
                        options={adminService.getStatus()}
                        error={errors.statut}
                    /> : null} */}
                </Grid>
                <Grid item xs={6}>
                    <Controls.Input
                        name="region"
                        label="Region"
                        value={values.region}
                        onChange={handleInputChange}
                        error={errors.region}
                    />
                    <Controls.Input
                        name="montant"
                        label="Montant"
                        value={values.montant}
                        onChange={handleInputChange}
                        error={errors.montant}
                    />
                    <Controls.Input
                        name="preuve"
                        label="Preuve"
                        value={values.preuve}
                        onChange={handleInputChange}
                        error={errors.preuve}
                    />
                    <div>
                        <Controls.Button
                            type="submit"
                            text="VALIDER" />
                        <Controls.Button
                            text="REDEFINIR"
                            color="default"
                            onClick={resetForm} />
                    </div>
                </Grid>
            </Grid>
        </Form>
    )
}