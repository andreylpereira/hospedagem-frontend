import React from "react";
import { Outlet } from 'react-router-dom';
import "./Control-Panel.css";
import Navbar from "../../components/navbar/Navbar"

const ControlPanel = () => {

  return (
    <>
  <Navbar/>
  <Outlet />
    </>
  );
};

export default ControlPanel;
