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
                        backgroundColor= 'rgb(236, 64, 122)'
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
                        backgroundColor= 'rgb(73, 163, 241)'
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
                        backgroundColor='rgb(52, 71, 103)'
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
                        backgroundColor='rgb(102, 187, 106)'
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
                        backgroundColor='rgb(66, 66, 74)'
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
                        backgroundColor='rgb(67, 160, 71)'
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
                        backgroundColor= 'rgb(216, 27, 96)'
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
                        backgroundColor='rgb(26, 115, 232)'
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