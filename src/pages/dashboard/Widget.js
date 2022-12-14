import './dashboard.css'
import { LeakAdd, LiveHelp, LocalShipping, Settings } from "@material-ui/icons";
import * as membreService from '../../services/membreService';
import { useState } from 'react';
import { useEffect } from 'react';
import { Link, Redirect } from 'react-router-dom';

const Widget = ({ redirect, title, icon, link, color, backgroundColor }) => {

const [sumMembre, setSumMembre] = useState([]);
const [currentUser, setCurrentUser] = useState(membreService.getCurrentUser());

const getmembre = () => {
  (currentUser ? (currentUser.roles.toString() === "ROLE_LOCAL") ? 
  (membreService.getSumMembre(currentUser.matricule)) : (membreService.getSum()) : membreService.getSum())
  .then((res) => {
    setSumMembre(res.data)
  });
}

useEffect(() => {
  getmembre();
}, []);

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