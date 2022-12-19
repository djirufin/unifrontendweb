/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-pascal-case */
/* eslint-disable jsx-a11y/alt-text */
import React from 'react';
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
                        props.history.push("/unifrontendweb/dashboard")
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
    const img = {position:'center', height: '80px'};
    const paperStyle={ padding:'15px', height:'75vh', width:250, margin:"3rem", justifyContent: 'center', flex:1}
    const btnstyle={margin:'8px 0'}

    return (
        <>
            <Form onSubmit={handleSubmit}>
                <div align='center'>
                    <Paper style={paperStyle}>
                        <Grid align='center'>
                            <img style={img} src={'logoUni.jpg'} />
                            <h4>LOGIN IN</h4>
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
                        label="Remember"
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
                                text={ values.loading ? (<CircularProgress />) : 'LOGIN'}
                                disabled={values.loading}
                                fullWidth
                            />
                        </div>
                    </Paper>
                </div>
            </Form>
        </>
    );
}