import { NavLink, useNavigate } from "react-router-dom";
import React, { Component } from "react";
import SidebarItem from "./SidebarItem";
import "./Layout.css";
import { logout } from "../apis";

const Sidebar = () => {
  const navigate = useNavigate();
  const clicklogout = async (e) => {
    console.log(e);
    const res = await logout();
    if (res.success) {
      // navigate()
    }
  };
  const clickitem = (e) => {
    console.log(e);
  };
  const menus = [
    {
      name: "Main",
      path: "/main",
      fun: function () {
        navigate("/main");
      },
    },
    {
      name: "Profile",
      path: "/playerinfo",
      fun: function () {
        console.log(this.path);
        navigate("/main");
      },
    },
    {
      name: "game",
      path: "/gameinfo",
      fun: function () {
        console.log(this.path);
        navigate("/main");
      },
    },
    {
      name: "upload",
      path: "/videoupload",
      fun: function () {
        console.log(this.path);
        navigate("/main");
      },
    },
    {
      name: "Guide",
      path: "/guide",
      fun: function () {
        console.log(this.path);
        navigate("/main");
      },
    },
    {
      name: "logout",
      path: "/",
      fun: function () {
        console.log(this.path);
        navigate("/main");
      },
    },
  ];

  return (
    <div className="Sidebar">
      <img className="profile" src="../image/profile.png" />
      {menus.map((menu, i) => (
        <div className="Sidebar-menu" onClick={menu.fun} key={i}>
          <p className="sidebar-item">{menu.name}</p>
        </div>
      ))}
      {/* {menus.map((menu, index) => {
        return (
          <NavLink className={"Sidebar-menu"} to={menu.path} key={index}>
            <SidebarItem menu={menu} />
          </NavLink>
        );
      })} */}
    </div>
  );
};

export default Sidebar;
