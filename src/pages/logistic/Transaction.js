import React from 'react';
import Widget from '../dashboard/Widget';
import Header from '../../components/Header'

function Transaction(props) {
    return (
        <>
            <Header />
            <div className='dash'> 
                <div className='widgets'>
                    <Widget 
                        redirect='/transfer' 
                        title='TRANSFER' 
                        link='Transfer from IP'
                        color= '#fff'
                        backgroundColor= '#d25f20'
                        icon={(
                                <img
                                    src='transfer.png'
                                    alt=''
                                    className="icon"
                                    style={{
                                        backgroundColor: "rgba(219, 211, 211, 0.705)",
                                        color: '#fff',
                                        width:  40,
                                        borderRadius: 60
                                    }}
                                />
                            )} 
                    />
                    <Widget 
                        title='TRANSPORT' 
                        link='Transport to IP'
                        backgroundColor='#046350'
                        color='#fff'
                        icon={(
                                <img
                                    src='transport.png'
                                    alt=''
                                    className="icon"
                                    style={{
                                        backgroundColor: "rgba(219, 211, 211, 0.705)",
                                        color: '#fff',
                                        width:  40,
                                        borderRadius: 60
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
                                <img
                                    src='available.png'
                                    alt=''
                                    className="icon"
                                    style={{
                                        backgroundColor: "rgba(219, 211, 211, 0.705)",
                                        color: '#fff',
                                        width:  40,
                                        borderRadius: 60
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
                                <img
                                    src='ipdispatch.png'
                                    alt=''
                                    className="icon"
                                    style={{
                                        backgroundColor: "rgba(219, 211, 211, 0.705)",
                                        color: '#fff',
                                        width:  40,
                                        borderRadius: 60
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
                                <img
                                    src='ack.png'
                                    alt=''
                                    className="icon"
                                    style={{
                                        backgroundColor: "rgba(219, 211, 211, 0.705)",
                                        color: '#fff',
                                        width:  40,
                                        borderRadius: 60
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
                                <img
                                    src='trace.png'
                                    alt=''
                                    className="icon"
                                    style={{
                                        backgroundColor: "rgba(219, 211, 211, 0.705)",
                                        color: '#fff',
                                        width:  40,
                                        borderRadius: 60
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
                                <img
                                    src='quality.png'
                                    alt=''
                                    className="icon"
                                    style={{
                                        backgroundColor: "rgba(219, 211, 211, 0.705)",
                                        color: '#fff',
                                        width:  40,
                                        borderRadius: 60
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
                                <img
                                    src='inventory.png'
                                    alt=''
                                    className="icon"
                                    style={{
                                        backgroundColor: "rgba(219, 211, 211, 0.705)",
                                        color: '#fff',
                                        width:  40,
                                        borderRadius: 60
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