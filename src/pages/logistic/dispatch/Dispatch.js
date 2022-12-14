/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import { Grid, makeStyles, Paper, Toolbar } from '@material-ui/core';
import { TimelineSeparator } from '@material-ui/lab';
import React from 'react';
import Controls from '../../../components/controls/Controls';
import DispatchForm from './DispatchForm';


const useStyles = makeStyles(theme => ({
    pageContent: {
        margin: theme.spacing(2),
        padding: theme.spacing(1),
        
    },
    head: {
        color: 'gray',

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
                {/* <div className={classes.head}>
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
                </div> */}
            </Paper>
        </>
    );
}

export default Dispatch;