/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import { makeStyles, Paper } from '@material-ui/core';
import { TimelineSeparator } from '@material-ui/lab';
import React from 'react';
import Controls from '../../../components/controls/Controls';
import DispatchForm from './DispatchForm';


const useStyles = makeStyles(theme => ({
    pageContent: {
        margin: theme.spacing(4),
        padding: theme.spacing(3),
        with: '50%'
        
    },
    searchInput: {
        width: '50%',
        right: '1rem'
    },
    newButton: {
        position: 'absolute',
        right: '10px'
    },
    newButton1: {
        position: 'absolute',
        right: '9rem'
    },
    head: {
        position: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        margin: 5,
        padding: 1,
        color: 'gray',
        alignItem: 'center'
    }
}))

function Dispatch(props) {
    const classes = useStyles();

    return (
        <>
            <Paper className={classes.pageContent}>
                <DispatchForm />
            </Paper>
            <Paper className={classes.pageContent}>
                <div className={classes.head}>
                    <div>
                        <p>Batch number : {}</p>
                        <p>Reference : {}</p>
                        <p>Waybill number : {}</p>
                    </div>
                    <TimelineSeparator />
                    <div>
                        <p>Sender First name : {}</p>
                        <p>Sender Last name : {}</p>
                        <p>Sender Phone : {}</p>
                        <p>Sender Email : {}</p>
                    </div>
                    <TimelineSeparator />
                    <div>
                        <p>Receiver First name : {}</p>
                        <p>Receiver Last name : {}</p>
                        <p>Receiver Phone : {}</p>
                        <p>Receiver Email : {}</p>
                    </div>
                </div>
                <Controls.Button 
                    type='submit'
                    text='DISPATCH'
                />
            </Paper>
        </>
    );
}

export default Dispatch;