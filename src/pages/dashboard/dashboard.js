/* eslint-disable no-unused-vars */
import { KeyboardArrowUp, LeakAdd, LiveHelp, LocalShipping, Settings } from '@material-ui/icons';
import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Header from '../../components/Header';
import * as authService from '../../services/authService';
import './dashboard.css'
import Widget from './Widget';

export default class dashboard extends Component {
    constructor(props){
        super(props);

        this.state = {
            redirect: null,
            userReady: true,
            currentUser: ""
        }
    }

    componentDidMount() {
        const currentUser = authService.getCurrentUser();

        if(!currentUser) {
            this.setState({ redirect : "/"});
            this.setState({ currentUser: currentUser, userReady: false})
        }
    }

    render() {

        const { currentUser, userReady } = this.state;
        
        return(
            <>
                <Header />
                <div className='dash'> 
                    <div className='widgets'>
                        <Widget 
                            redirect='/logistics' 
                            title='S & L' 
                            link='Supply and Logistics'
                            backgroundColor= 'rgb(216, 27, 96)' 
                            color= '#fff'
                            icon={(
                                    <LocalShipping
                                        className="icon"
                                        fontSize='large'
                                        style={{
                                            backgroundColor: "rgba(219, 211, 211, 0.705)",
                                            color: '#fff'
                                        }}
                                    />
                                )} 
                        />
                        <Widget 
                            redirect='/eum'
                            title='EUM'
                            link='End User Monitoring'
                            backgroundColor='rgb(26, 115, 232)'
                            color='#fff'
                            icon={(
                                    <LiveHelp
                                        className="icon"
                                        fontSize='large'
                                        style={{
                                            backgroundColor: "rgba(219, 211, 211, 0.705)",
                                            color: '#fff'
                                        }}
                                    />
                                )}
                        />
                    </div>
                    <div className='widgets'>
                        <Widget 
                            redirect='/pmv'
                            title='PMV'
                            link='Performance Monitoring Visit'
                            backgroundColor= 'rgb(52, 71, 103)'
                            color='#fff'
                            icon={ (
                                    <LeakAdd
                                        className="icon"
                                        fontSize='large'
                                        style={{ 
                                            backgroundColor: "rgba(219, 211, 211, 0.705)",
                                            color: '#fff'
                                        }}
                                    />
                                )}
                        />
                        <Widget 
                            redirect='/setting'
                            title='Settings'
                            link='Configuration the application'
                            backgroundColor='rgb(67, 160, 71)'
                            color='#fff'
                            icon={(
                                <Settings
                                    className="icon"
                                    fontSize='large'
                                    style={{
                                        backgroundColor: "rgba(219, 211, 211, 0.705)",
                                        color: '#fff'
                                    }}
                                />
                                )}
                        />
                    </div>
                </div> 
            </>
        )
    }
        
}