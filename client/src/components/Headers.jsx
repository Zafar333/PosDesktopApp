import React from "react";
import "./headers.css";
import { NavLink } from "react-router-dom";

const Headers = () => {
  return (
    <div className="headerContainer">
      <ul className="menus">
        <NavLink to="/userOrder" className="menuText">
          Users Order
        </NavLink>
        <NavLink to="/adminRoot/dashboard" className="menuText">
          Dashboard
        </NavLink>
      </ul>
    </div>
  );
};

export default Headers;
