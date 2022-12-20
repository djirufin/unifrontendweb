import React from 'react';
import Header from '../../components/Header';
import Cards from './Cards';

function Eum(props) {
    return (
        <>
            <Header />
            <div className='logis'> 
                <div className='cards'>
                    <Cards 
                        redirect='/nutrition'
                        link='Nutrition'
                        backgroundImage="url(/unifrontendweb/nutrition.jpg)"
                        color='#fff' 
                    />
                    <Cards 
                        redirect='/wash'
                        link='Wash'
                        backgroundImage="url(/unifrontendweb/wash.jpg)"
                        color='#fff'
                    />
                    <Cards 
                        redirect='/education'
                        link='Education'
                        backgroundImage="url(/unifrontendweb/education.jpg)"
                        color='#fff'
                    />
                </div>
            </div>  
        </>
    );
}

export default Eum;