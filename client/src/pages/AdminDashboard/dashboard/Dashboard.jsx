import React, { useEffect } from "react";
import "./dashboard.css";
import { NavLink, useNavigate } from "react-router-dom";
import dolaricon from "../../../assets/dollaricon.png";

const Dashboard = () => {
  const navigate = useNavigate();
  function gotoTodaySalesView() {
    console.log(" i am navigate");
    navigate("/adminRoot/dashboard/todaySales");
  }
  function gotoAllSales() {
    navigate("/adminRoot/dashboard/allSales");
  }

  return (
    <div>
      <div className="dashboardContainer">
        <div className="dashboardSectionView">
          <div className="dashboardTodayOrderCard" onClick={gotoTodaySalesView}>
            <NavLink className="dashboardOrderCardTitle">Today Orders</NavLink>
            <img src={dolaricon} style={{ width: "50px", height: "50px" }} />
          </div>
          <div className="dashboardMonthlyOrderCard" onClick={gotoAllSales}>
            <NavLink className="dashboardOrderCardTitle">All Orders</NavLink>
            <img src={dolaricon} style={{ width: "50px", height: "50px" }} />
          </div>
          <div className="dashboardWeeklyOrderCard">
            <NavLink className="dashboardOrderCardTitle">Weekly Orders</NavLink>
            <img src={dolaricon} style={{ width: "50px", height: "50px" }} />
          </div>
          <div className="dashboardProductCategoryCard">
            <NavLink className="dashboardOrderCardTitle">
              Product Category
            </NavLink>
            <img src={dolaricon} style={{ width: "50px", height: "50px" }} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
