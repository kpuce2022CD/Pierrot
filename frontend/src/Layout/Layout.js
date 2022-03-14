import Sidebar from "./Sidebar";
import React, { Component, useState, useEffect } from "react";

const Layout = (props) => {
  return (
    <div className="layout">
      <Sidebar />
      {props.children}
    </div>
  );
};

export default Layout;
