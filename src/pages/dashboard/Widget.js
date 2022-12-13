import './dashboard.css'
import { LeakAdd, LiveHelp, LocalShipping, Settings } from "@material-ui/icons";
import * as membreService from '../../services/membreService';
import { useState } from 'react';
import { useEffect } from 'react';
import { Link, Redirect } from 'react-router-dom';

const Widget = ({ redirect, title, icon, link }) => {
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

     //temporary
  // switch (type) {
  //   case "user":
  //     data = {
  //       title: "S & L",
  //       link: "Supply and Logistics",
  //       icon: (
  //         <LocalShipping
  //           className="icon"
  //           fontSize='large'
  //           style={{
  //             backgroundColor: "rgba(160, 160, 160, 0.349)",
  //           }}
  //         />
  //       ),
  //     };
  //     break;
  //   case "order":
  //     data = {
  //       title: "EUM",
  //       link: "End User Monitoring",
  //       icon: (
  //         <LiveHelp
  //           className="icon"
  //           fontSize='large'
  //           style={{
  //             backgroundColor: "rgba(160, 160, 160, 0.349)",
  //           }}
  //         />
  //       ),
  //     };
  //     break;
  //   case "earning":
  //     data = {
  //       title: "PMV",
  //       link: "Performance Monitoring Visit",
  //       icon: (
  //         <LeakAdd
  //           className="icon"
  //           fontSize='large'
  //           style={{ backgroundColor: "rgba(160, 160, 160, 0.349)",}}
  //         />
  //       ),
  //     };
  //     break;
  //   case "balance":
  //     data = {
  //       title: "Settings",
  //       link: "Configure the application",
  //       icon: (
  //         <Settings
  //           className="icon"
  //           style={{
  //             backgroundColor: "rgba(160, 160, 160, 0.349)",
  //           }}
  //           fontSize='large'
  //         />
  //       ),
  //     };
  //     break;
  //   default:
  //     break;
  // }

    return (
        <div className='widget'>
          <a className='lien' href={redirect}>
            <div className='left'>
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