import React, { useEffect } from "react";
import Headers from "../components/Headers";
import "./homePage.css";
import { Outlet, useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();
  useEffect(() => {
    navigate("/userOrder");
  }, []);
  return (
    <div className="heroSection">
      <Headers />
      <div className="viewContainer">
        <Outlet />
      </div>
    </div>
  );
};

export default HomePage;
