import React from 'react';
import './eum.css'

function Cards({redirect, title, icon, link, color, backgroundImage}) {
  const back = {backgroundImage:backgroundImage, backgroundSize:'100%', flexDirection: 'row', alignItems: 'flex-end'}
  const foot = {backgroundColor: '#6dcee672', width:'100%', height:50, borderEndEndRadius: 20, borderEndStartRadius: 20 }
  const footDiv = {padding: 13, alignItems:'baseline'}
    return (
        <a href={redirect} style={back} className='card'>
          <div style={foot} >
            <div style={footDiv}>
              {link}
            </div>
          </div> 
        </a>
    );
}

export default Cards;