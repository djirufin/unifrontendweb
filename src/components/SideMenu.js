/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import { withStyles } from "@material-ui/core";
import "../App/App.css"
import { SideMenuData, SideMenuDataModerator, SideMenuDataRegion, SideMenuDataUser } from './SideMenuData';
import * as authService from '../services/authService'

// withStyles & makeStyles

const style = {
    sideMenu: {
        display: 'flex',
        flexDirection: 'column',
        position: 'absolute',
        left: '0px',
        width: '250px',
        height: '100%',
        backgroundColor: '#006a84',
        color: "white",
        
    },
    img: {
        position: 'center',
        padding: '0px',
        width: '150px',
        margin: '2rem'
        
    }
}

const SideMenu = (props) => {
    const { classes } = props;
    const [currentUser, setCurrentUser] = useState(authService.getCurrentUser());
  
    
    return (
        <div className={classes.sideMenu}>
            <img className={classes.img} src='lg.png' alt=''/>
            {(currentUser) ? 
                (currentUser.roles.toString() === "ROLE_USER") ? 
                <ul className='SibeMenuList'>
                    {SideMenuDataModerator.map((val, key) => {
                        return (
                            <li 
                                key={key} 
                                className='row'
                                id={window.location.pathname === val.link ? "active" : ""}
                                onClick={() => {
                                    window.location.pathname = val.link
                                }}>
                                <div id='icon'>{val.icon}</div>
                                <div id='title'>
                                    {val.title}
                                </div>
                            </li>
                        )
                    })}
                </ul> :
                (currentUser.roles.toString() === "ROLE_ZONE") ? 
                <ul className='SibeMenuList'>
                    {SideMenuDataUser.map((val, key) => {
                        return (
                            <li 
                                key={key} 
                                className='row'
                                id={window.location.pathname === val.link ? "active" : ""}
                                onClick={() => {
                                    window.location.pathname = val.link
                                }}>
                                <div id='icon'>{val.icon}</div>
                                <div id='title'>
                                    {val.title}
                                </div>
                            </li>
                        )
                    })}
                </ul> : 
                (currentUser.roles.toString() === "ROLE_REGION") ? 
                <ul className='SibeMenuList'>
                    {SideMenuDataRegion.map((val, key) => {
                        return (
                            <li 
                                key={key} 
                                className='row'
                                id={window.location.pathname === val.link ? "active" : ""}
                                onClick={() => {
                                    window.location.pathname = val.link
                                }}>
                                <div id='icon'>{val.icon}</div>
                                <div id='title'>
                                    {val.title}
                                </div>
                            </li>
                        )
                    })}
                </ul> : 
                (currentUser.roles.toString() === "ROLE_ADMIN") ? 
                <ul className='SibeMenuList'>
                    {SideMenuData.map((val, key) => {
                        return (
                            <li 
                                key={key} 
                                className='row'
                                id={window.location.pathname === val.link ? "active" : ""}
                                onClick={() => {
                                    window.location.pathname = val.link
                                }}>
                                <div id='icon'>{val.icon}</div>
                                <div id='title'>
                                    {val.title}
                                </div>
                            </li>
                        )
                    })}
                </ul> : null
            : null}           
        </div>
    )
}

export default withStyles(style)(SideMenu);
