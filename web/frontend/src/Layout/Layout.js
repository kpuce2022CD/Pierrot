import Sidebar from "./Sidebar";
import React, { Component, useState, useEffect } from "react";

const Layout = (props) => {
  return (
    <div className="layout">
      {/* {props.main ? <></> : <Sidebar></Sidebar>} */}
      <Sidebar />
      {props.children}
    </div>
  );
};

export default Layout;
