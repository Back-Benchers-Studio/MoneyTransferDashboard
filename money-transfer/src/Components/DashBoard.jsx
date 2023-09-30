/* eslint-disable no-unused-vars */
import React from 'react';
import BankAccount from './BankAccount';
import VodafoneCash from './VodafoneCash';
import "../Styles/DashBoard.css";
import Sidebar from './SideBar';


const Dashboard = () => {
  return (
    <div className='dashboard-container'>
        <Sidebar/>
    </div>
  );
};

export default Dashboard;