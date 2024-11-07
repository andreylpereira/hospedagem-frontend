import React from "react";
import { Outlet } from 'react-router-dom';
import "./Control-Panel.css";
import Navbar from "../../components/navbar/Navbar"

const ControlPanel = () => {

  return (
    <>
  <Navbar/>
  <br />
  <br />
  <br />
  <br />
  <Outlet />
    </>
  );
};

export default ControlPanel;
