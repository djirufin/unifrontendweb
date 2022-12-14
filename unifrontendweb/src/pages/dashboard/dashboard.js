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
                <div className='dash'> 
                    <div className='widgets'>
                        <Widget 
                            redirect='/transaction' 
                            title='S & L' 
                            link='Supply and Logistics'
                            icon={(
                                    <LocalShipping
                                        className="icon"
                                        fontSize='large'
                                        style={{
                                        backgroundColor: "rgba(160, 160, 160, 0.349)",
                                        }}
                                    />
                                )} 
                        />
                        <Widget 
                            redirect='/eum'
                            title='EUM'
                            link='End User Monitoring'
                            icon={(
                                    <LiveHelp
                                        className="icon"
                                        fontSize='large'
                                        style={{
                                        backgroundColor: "rgba(160, 160, 160, 0.349)",
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
                            icon={ (
                                    <LeakAdd
                                        className="icon"
                                        fontSize='large'
                                        style={{ backgroundColor: "rgba(160, 160, 160, 0.349)",}}
                                    />
                                )}
                        />
                        <Widget 
                            redirect='/setting'
                            title='Settings'
                            link='Configuration the application'
                            icon={(
                                <Settings
                                    className="icon"
                                    style={{
                                    backgroundColor: "rgba(160, 160, 160, 0.349)",
                                    }}
                                    fontSize='large'
                                />
                                )}
                        />
                    </div>
                </div> 
            </>
        )
    }
        
}