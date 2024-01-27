import React from "react";
import { Outlet } from "react-router-dom";
import Headers from "../../components/Headers.jsx";
import "./adminRoot.css";

const AdminRoot = () => {
  return (
    <>
      <Headers />
      <div className="adminViewContainer">
        <Outlet />
      </div>
    </>
  );
};

export default AdminRoot;
