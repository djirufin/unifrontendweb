/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { withStyles } from "@material-ui/core";
import "../App/App.css";
import {
  SideMenuDataADMIN,
  SideMenuDataIPADMIN,
  SideMenuDataSUPPLIER,
} from "./SideMenuData";
import * as authService from "../services/authService";
import Sidebar from "./Sidebar";

const style = {
  sideMenu: {
    display: "flex",
    flexDirection: "column",
    position: "fixed",
    left: "0px",
    width: "20%",
    height: "100vh",
    backgroundColor: "#006a84",
    color: "white",
  },
  img: {
    padding: "1em",
    width: "200px",
    margin: "1em",
  },
};

const SideMenu = (props) => {
  const { classes } = props;
  const [currentUser, setCurrentUser] = useState(authService.getCurrentUser());

  return (
    <>
      <div className={classes.sideMenu}>
        <img className={classes.img} src="lg.png" alt="" />
        {currentUser ? (
          currentUser.roles.toString() === "ROLE_SUPPLIER" ? (
            <ul className="SibeMenuList">
              {SideMenuDataSUPPLIER.map((val, key) => (
                <Sidebar key={key} item={val} />
              ))}
            </ul>
          ) : currentUser.roles.toString() === "ROLE_IPADMIN" ? (
            <ul className="SibeMenuList">
              {SideMenuDataIPADMIN.map((val, key) => (
                <Sidebar key={key} item={val} />
              ))}
            </ul>
          ) : currentUser.roles.toString() === "ROLE_ADMIN" ? (
            <ul className="SibeMenuList">
              {SideMenuDataADMIN.map((val, key) => (
                <Sidebar key={key} item={val} />
              ))}
            </ul>
          ) : null
        ) : null}
      </div>
    </>
  );
};

export default withStyles(style)(SideMenu);
