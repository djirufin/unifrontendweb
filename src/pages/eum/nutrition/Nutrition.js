import { LiveHelp } from '@material-ui/icons';
import React from 'react';
import Header from '../../../components/Header';
import Widget from '../../dashboard/Widget';

function Nutrition(props) {
    return (
        <>
            <Header />
            <div className='logis'> 
                <div className='widgets'>
                    <Widget 
                        redirect='/adhoc' 
                        title='Adhoc' 
                        link='Adhoc and user monitoring'
                        backgroundColor= '#d25f20'
                        color='#fff'
                        icon={(
                                <LiveHelp
                                    className="icon"
                                    fontSize='large'
                                    style={{
                                        backgroundColor: "rgba(219, 211, 211, 0.705)",
                                        color: '#fff',
                                        borderRadius: 80
                                    }}
                                />
                            )} 
                    />
                    <Widget 
                        redirect='/regular'
                        title='Regular' 
                        link='Regular and user monitoring'
                        backgroundColor= '#d25f20'
                        color='#fff'
                        icon={(
                                <LiveHelp
                                    className="icon"
                                    fontSize='large'
                                    style={{
                                        backgroundColor: "rgba(219, 211, 211, 0.705)",
                                        color: '#fff',
                                        borderRadius: 80
                                    }}
                                />
                            )} 
                    />
                </div>
            </div> 
        </>
    );
}

export default Nutrition;