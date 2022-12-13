import React, { useState } from 'react'
import { AppBar, Toolbar, Grid, InputBase, IconButton, Badge, makeStyles } from '@material-ui/core'
import NotificationsNoneIcon from '@material-ui/icons/NotificationsNone';
import ChatBubbleOutlineIcon from '@material-ui/icons/ChatBubbleOutline';
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';
import SearchIcon from '@material-ui/icons/Search';
import * as authService from '../services/authService'
import { Redirect } from 'react-router-dom';
import { CollectionsOutlined, Person } from '@material-ui/icons';
import SideMenu from './SideMenu';


const useStyles = makeStyles(theme => ({
    root: {
        backgroundColor: '#fff',
        
    },
    searchInput: {
        opacity: '0.6',
        padding: `0px ${theme.spacing(1)}px`,
        fontSize: '1rem',
        '&:hover': {
            backgroundColor: '#f2f2f2'
        },
        '& .MuiSvgIcon-root': {
            marginRight: theme.spacing(1)
        }
    }
}))

export default function Header(props) {
    const [redirect, setRedirect] = useState(null);
    const [currentUser, setCurrentUser] = useState(authService.getCurrentUser());
    
    const classes = useStyles();
    const logOut = () => {
        localStorage.clear();
        window.location.reload();
        setRedirect("/")
    } 
 
    // if(redirect) {
    //     return <Redirect to={redirect} />
    // }
    return (
        <>
        <SideMenu />
        <AppBar position="static" className={classes.root}>
            <Toolbar>
                <Grid container
                    alignItems="center">
                    <Grid item>
                        <InputBase
                            placeholder={currentUser ? currentUser.eglise : ""}
                            className={classes.searchInput}
                            startAdornment={<Person fontSize="small" />}
                        />
                    </Grid>
                    <Grid item sm></Grid>
                    <Grid item>
                        {currentUser ? 
                        <IconButton>
                            <PowerSettingsNewIcon 
                                fontSize="small"
                                onClick={() =>logOut()} 
                            />
                        </IconButton> :
                        (<div><Redirect to='/' /></div>)}
                    </Grid>
                </Grid>
            </Toolbar>
        </AppBar>
        </>
    )
}
