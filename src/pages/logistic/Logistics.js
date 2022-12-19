import { LocalShippingOutlined, Timeline } from '@material-ui/icons';
import React from 'react';
import Header from '../../components/Header';
import Widget from '../dashboard/Widget';

function Logistics(props) {
    return (
        <>
            <Header />
            <div className='logis'> 
                <div className='widgets'>
                    <Widget 
                        redirect='/transactions' 
                        title='Transactions' 
                        link='Logistics and supplies transactions'
                        backgroundColor= '#d25f20'
                        color='#fff'
                        icon={(
                                <LocalShippingOutlined
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
                        redirect='/kpi'
                        title='KPI' 
                        link='Key Performance Indicator'
                        backgroundColor='#20b0d2'
                        color='#fff'
                        icon={(
                                <Timeline
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

export default Logistics;