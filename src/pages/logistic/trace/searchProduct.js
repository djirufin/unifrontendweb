import { InputAdornment, makeStyles, Paper, Toolbar } from '@material-ui/core';
import { Search } from '@material-ui/icons';
import { TimelineSeparator } from '@material-ui/lab';
import React from 'react';
import Controls from '../../../components/controls/Controls';


const Styles = makeStyles(theme => ({
    pageContent: {
        margin: theme.spacing(2),
        padding: theme.spacing(1)
    },
    searchInput: {
        width: '50%',
        right: '1rem'
    },
    head: {
        position: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        margin: 5,
        padding: 1,
        color: 'gray'
    }
}))

function searchProduct(props) {
    const classes = Styles()
    return (
        <>
            <Paper className={classes.pageContent}>
                <Toolbar>
                    <Controls.Input
                        label="Search batch number"
                        className={classes.searchInput}
                        InputProps={{
                            startAdornment: (<InputAdornment position="start">
                                <Search />
                            </InputAdornment>)
                        }}
                    />
                </Toolbar> 
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
            </Paper>
            
        </>
    );
}

export default searchProduct;