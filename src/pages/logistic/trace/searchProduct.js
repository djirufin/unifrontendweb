import { Grid, InputAdornment, makeStyles, Paper, Toolbar } from '@material-ui/core';
import { Search } from '@material-ui/icons';
import React from 'react';
import Controls from '../../../components/controls/Controls';
import Header from '../../../components/Header';


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
        color: 'gray'
    }
}))

function searchProduct(props) {
    const classes = Styles()
    return (
        <>
            <Header />
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
                            text='SEARCH'
                        />
                    </Grid>
                </Grid>
            </Paper>
            
        </>
    );
}

export default searchProduct;