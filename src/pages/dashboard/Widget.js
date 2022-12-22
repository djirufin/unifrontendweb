/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import './dashboard.css'

const Widget = ({ redirect, title, icon, link, color, backgroundColor }) => {
    return (
        <div style={{backgroundColor: backgroundColor}} className='widget'>
          <a className='lien' href={redirect}>
            <div style={{color: color}} className='left'>
              <div className='duo'>
                <span className='title'>{icon}</span>
                <span className='counter'>{title} </span>
              </div>
              <div className='duoPlus'>
                <span className='bottom' />
                <span className='link'>{link}</span>
              </div>
            </div>
          </a>
        </div>
    );
  };
  
  export default Widget;