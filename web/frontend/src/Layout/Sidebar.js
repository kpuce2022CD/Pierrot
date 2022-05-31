import { NavLink, useNavigate } from "react-router-dom";
import React, { Component } from "react";
import SidebarItem from "./SidebarItem";
import "./Layout.css";
import { logout } from "../apis";

const Sidebar = () => {
  const navigate = useNavigate();

  const clickItem = (e) => {
    console.log(e.target.innerText);
    navigate(`/${e.target.innerText}`);
  };

  const clicklogout = async (e) => {
    const res = await logout();
    if (res.success) {
      console.log("성공", res);
      navigate("/");
    } else {
      alert("로그아웃 오류");
      navigate("/");
    }
  };

  return (
    <div className="Sidebar">
      <img className="profile" src="../image/profile.png" />
      <div className="sidebar-menu">
        <div className="sidebar-item" onClick={clickItem}>
          Main
        </div>
        <div className="sidebar-item" onClick={clickItem}>
          Profile
        </div>
        <div className="sidebar-item" onClick={clickItem}>
          game
        </div>
        <div className="sidebar-item" onClick={clickItem}>
          upload
        </div>
        <div className="sidebar-item" onClick={clickItem}>
          Guide
        </div>
        <div className="sidebar-item" onClick={clicklogout}>
          logout
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
