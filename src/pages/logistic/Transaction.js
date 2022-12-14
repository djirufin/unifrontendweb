import { Assignment, CheckCircle, DirectionsBus, EventNote, LocalShipping, Search, SendSharp } from '@material-ui/icons';
import React from 'react';
import Widget from '../dashboard/Widget';

function Transaction(props) {
    return (
        <>
            <div className='dash'> 
                <div className='widgets'>
                    <Widget 
                        redirect='/transfer' 
                        title='TRANSFER' 
                        link='Transfer from IP'
                        color= '#fff'
                        backgroundColor= '#d25f20'
                        icon={(
                                <SendSharp
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
                        redirect='/transport' 
                        title='TRANSPORT' 
                        link='Transport to IP'
                        backgroundColor='#046350'
                        color='#fff'
                        icon={(
                                <DirectionsBus
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
                        redirect='/availability' 
                        title='AVAILABILITY' 
                        link='Monitoring availability of products'
                        backgroundColor='#20b0d2'
                        color='#fff'
                        icon={(
                                <CheckCircle
                                    className="icon"
                                    fontSize='large'
                                    style={{
                                        backgroundColor: "rgba(219, 211, 211, 0.705)",
                                        color: '#5bf54d'
                                    }}
                                />
                            )} 
                    />
                    <Widget 
                        redirect='/dispatch' 
                        title='IP DISPATCH' 
                        link='Implementing partner dispatch'
                        backgroundColor='#98face'
                        color='#fff'
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
                </div>
                <div className='widgets'>
                    <Widget 
                        redirect='/acknowledge' 
                        title='ACKNOWLEDGE' 
                        link='Acknowledge product from warehouse'
                        backgroundColor='#20b0d2'
                        color='#fff'
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
                        redirect='/trace' 
                        title='TRACE' 
                        link='Trace product by batch number'
                        backgroundColor='#98face'
                        color='#fff'
                        icon={(
                                <Search
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
                        redirect='/issues' 
                        title='ISSUES' 
                        link='Monitoring the quality of products'
                        color= '#fff'
                        backgroundColor= '#d25f20'
                        icon={(
                                <Assignment
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
                        redirect='/inventory' 
                        title='IP INVENTORY' 
                        link='Implementing partner inventory'
                        backgroundColor='#046350'
                        color='#fff'
                        icon={(
                                <EventNote
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
    );
}

export default Transaction;