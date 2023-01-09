/* eslint-disable react/jsx-pascal-case */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { Grid,Paper } from '@material-ui/core'
import Controls from '../../components/controls/Controls';
import { useFormL, Form } from '../../components/useFormL';
import { CircularProgress } from '@material-ui/core';
import * as authService from '../../services/authService'

const initialValues = {
    username: '',
    password: '',
    loading: false,
    message: '',
    checkedB: false

}

export default function Login(props) {
    //const { addOrEdit, recordForEdit } = props

    const validate = (fieldValues = values) => {
        let temp = { ...errors }
        if ('username' in fieldValues)
            temp.username = fieldValues.username ? "" : "This field is required."
        if ('password' in fieldValues)
            temp.password = fieldValues.password ? "" : "This field is required."
        setErrors({
            ...temp
        })

        if (fieldValues === values)
            return Object.values(temp).every(x => x === "")
    }

    const handleSubmit = e => {
        e.preventDefault();

        if (validate()) {
            values.loading = true
                authService.login(values.username, values.password)
                    .then(() => {
                            props.history.push("/users")
                        
                        window.location.reload();
                    },
                    error => {
                        const resMessage = (error.response && 
                            error.response.data && 
                            error.response.data.message) || 
                            error.message || 
                            error.toString();
                            
                        setValues(
                            values.message = resMessage,
                            values.loading = false
                        )
                        
                        
                    }
                );
        }
    }

    const {
        values,
        setValues,
        errors,
        setErrors,
        handleInputChange,
        resetForm
    } = useFormL(initialValues, true, validate);

    // useEffect(() => {
    //     if (recordForEdit !== null)
    //         setValues({
    //             ...recordForEdit
    //         })
    // }, [recordForEdit])

    const gridStyle = { margin:'0px'}
    const img = {position:'center', padding:'0px', height: '90px', margin:'0rem'};
    const paperStyle={ padding:'20px', height:'85vh', width:350, margin:"50px"}
    const btnstyle={margin:'8px 0'}

    return (
        <>
            <Form onSubmit={handleSubmit}>
                <Grid style={gridStyle}>
                    <Paper style={paperStyle}>
                        <Grid align='center'>
                            <img style={img} src='logoUni.jpg' alt=''/>
                            <h2>CONNEXION</h2>
                        </Grid>
                        {values.message && (
                            <div className='form-group'>
                                <div className='alert alert-danger' role='alert'>
                                    {values.message}
                                </div>
                            </div>)
                        }
                        <Controls.textField
                            label='Username' 
                            placeholder='Nom utilisateur' 
                            name='username'
                            fullWidth
                            value={values.username}
                            onChange={handleInputChange}
                            error={errors.username}
                        /><br/><br/>
                        <Controls.textField 
                            label='Password' 
                            placeholder='Mot de passe'
                            type='password' 
                            name='password' 
                            fullWidth
                            value={values.password}
                            onChange={handleInputChange}
                            error={errors.password} 
                        />
                        <br/><br/>
                        <Controls.Checkbox 
                        name='checkedB'
                        label="Se souvenir"
                        checked={values.checkedB}
                        onChange={handleInputChange}
                        value={values.checkedB}
                        ref={c => {
                            values.checkedB = c;
                        }}
                        /><br/><br/>
                        <div style={btnstyle}>
                            <Controls.Button
                                type='submit' 
                                variant="contained" 
                                text={ values.loading ? (<CircularProgress />) : 'CONNEXION'}
                                disabled={values.loading}
                                fullWidth
                            />
                        </div>
                    </Paper>
                </Grid>
            </Form>
        </>
    );
}