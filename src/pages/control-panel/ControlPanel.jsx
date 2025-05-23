import React from "react";
import { Outlet } from "react-router-dom";
import "./ControlPanel.css";
import Navbar from "../../components/navbar/Navbar";

const ControlPanel = () => {
  return (
    <div className="background">
      <Navbar />
      <Outlet />
    </div>
  );
};

export default ControlPanel;
