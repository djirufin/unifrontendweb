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
    handleNext() {
        <Redirect to={'/transaction'} />
    }

    render() {
        if(this.state.redirect) {
            return <Redirect to={this.state.redirect} />
        }

        const { currentUser, userReady } = this.state;
        
        return(
            <>
                <Header />
                <div className='dash'> 
                    <div className='widgets'>
                        <Widget 
                            redirect='/unifrontendweb/logistics' 
                            title='S & L' 
                            link='Supply and Logistics'
                            backgroundColor= '#d25f20'
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
                            backgroundColor='#20b0d2'
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
                            backgroundColor='#046350'
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
                            backgroundColor='#98face'
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