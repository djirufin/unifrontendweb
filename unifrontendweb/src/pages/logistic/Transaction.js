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
                        icon={(
                                <SendSharp
                                    className="icon"
                                    fontSize='large'
                                    style={{
                                        backgroundColor: "rgba(160, 160, 160, 0.349)",
                                        
                                    }}
                                />
                            )} 
                    />
                    <Widget 
                        redirect='/transport' 
                        title='TRANSPORT' 
                        link='Transport to IP'
                        icon={(
                                <DirectionsBus
                                    className="icon"
                                    fontSize='large'
                                    style={{
                                    backgroundColor: "rgba(160, 160, 160, 0.349)",
                                    }}
                                />
                            )} 
                    />
                    <Widget 
                        redirect='/availability' 
                        title='AVAILABILITY' 
                        link='Monitoring availability of products'
                        icon={(
                                <CheckCircle
                                    className="icon"
                                    fontSize='large'
                                    style={{
                                    backgroundColor: "rgba(160, 160, 160, 0.349)",
                                    }}
                                />
                            )} 
                    />
                    <Widget 
                        redirect='/dispatch' 
                        title='IP DISPATCH' 
                        link='Implementing partner dispatch'
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
                </div>
                <div className='widgets'>
                    <Widget 
                        redirect='/acknowledge' 
                        title='ACKNOWLEDGE' 
                        link='Acknowledge product from warehouse'
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
                        redirect='/trace' 
                        title='TRACE' 
                        link='Trace product by batch number'
                        icon={(
                                <Search
                                    className="icon"
                                    fontSize='large'
                                    style={{
                                    backgroundColor: "rgba(160, 160, 160, 0.349)",
                                    }}
                                />
                            )} 
                    />
                    <Widget 
                        redirect='/issues' 
                        title='ISSUES' 
                        link='Monitoring the quality of products'
                        icon={(
                                <Assignment
                                    className="icon"
                                    fontSize='large'
                                    style={{
                                    backgroundColor: "rgba(160, 160, 160, 0.349)",
                                    }}
                                />
                            )} 
                    />
                    <Widget 
                        redirect='/inventory' 
                        title='IP INVENTORY' 
                        link='Implementing partner inventory'
                        icon={(
                                <EventNote
                                    className="icon"
                                    fontSize='large'
                                    style={{
                                    backgroundColor: "rgba(160, 160, 160, 0.349)",
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