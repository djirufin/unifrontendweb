import { Assignment, CheckCircle, DirectionsBus, EventNote, LocalShipping, Search, SendSharp } from '@material-ui/icons';
import React from 'react';
import Widget from '../../dashboard/Widget';

function Trace(props) {
    return ( 
        <> 
           <div className='dash'> 
                <div className='widgets'>
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
                        backgroundColor='#046350'
                        color='#fff'
                        icon={(
                                <CheckCircle
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

export default Trace;