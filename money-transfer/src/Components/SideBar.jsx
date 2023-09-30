/* eslint-disable no-unused-vars */
import React from "react";
import "../Styles/SideBar.css";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="sidebar-container">
      <div className="sidebar-content">
        <h2>Dashboard</h2>
        <button className="nav-btn">Bank Account</button>
        <button className="nav-btn">Vodafone Cash</button>
      </div>
    </div>
  );
};

export default Sidebar;
