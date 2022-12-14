/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import { Grid, makeStyles, Paper, Toolbar } from '@material-ui/core';
import React from 'react';
import { useEffect } from 'react';
import Controls from '../../../components/controls/Controls';
import { Form, useFormAdmin } from '../../../components/useFormAdmin';


const useStyles = makeStyles(theme => ({
    pageContent: {
        margin: theme.spacing(2),
        padding: theme.spacing(1),
        
    },
    head: {
        color: 'gray',

    }
}))

const initialeValues = {
    product: '',
    qantity:'',
    agent:'',
    staff:'',

}

function Dispatch(props) {
    const classes = useStyles();
    const { addOrEdit, recordForEdit } = props;

    const validate = (fieldValues = values) => {
        let temp = { ...errors }
        if ('product' in fieldValues)
            temp.product = fieldValues.product ? "" : "This field is required."
        if ('quantity' in fieldValues)
        
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
        <>
            <Form onSubmit={handleSubmit}>
                <Paper className={classes.pageContent}>
                    <Grid container>
                        <Grid item xs={6}>
                            <Controls.Input
                                name="product"
                                label="Select product"
                                value={values.product}
                                onChange={handleInputChange}
                                error={errors.product}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <Controls.Input
                                name="quantity"
                                label="Quantity"
                                value={values.quantity}
                                onChange={handleInputChange}
                                error={errors.quantity}
                            />
                        </Grid>
                    </Grid>
                </Paper>
                <Paper className={classes.pageContent}>
                    <Toolbar>
                        <p style={{color: 'gray', paddingRight: '2px'}}>Preview Dispatch</p>
                    </Toolbar>
                    <Grid className={classes.head} container>
                        <Grid item xs={4}>
                            <div>
                                <p>Batch number : {}</p>
                                <p>Reference : {}</p>
                                <p>Waybill number : {}</p>
                            </div>
                        </Grid>
                        <Grid item xs={4}>
                            <div>
                                <p>Sender First name : {}</p>
                                <p>Sender Last name : {}</p>
                                <p>Sender Phone : {}</p>
                                <p>Sender Email : {}</p>
                            </div>
                        </Grid>
                        <Grid item xs={4}>
                            <div>
                                <p>Receiver First name : {}</p>
                                <p>Receiver Last name : {}</p>
                                <p>Receiver Phone : {}</p>
                                <p>Receiver Email : {}</p>
                            </div>
                            <br />
                            <Controls.Button 
                                type='submit'
                                text='DISPATCH'
                            />
                        </Grid>
                    </Grid>
                </Paper>
            </Form>
        </>
    );
}

export default Dispatch;