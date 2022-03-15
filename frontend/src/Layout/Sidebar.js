import { NavLink } from "react-router-dom";
import React, { Component } from "react";
import SidebarItem from "./SidebarItem";
import "./Layout.css";

const Sidebar = () => {
  const menus = [
    { name: "Main", path: "/main" },
    { name: "Profile", path: "/playerinfo" },
    { name: "game", path: "/gameinfo" },
    { name: "Guide", path: "/guide" },
    { name: "logout", path: "/" },
  ];

  return (
    <div className="Sidebar">
      <img className="profile" src="../image/profile.png" />
      {menus.map((menu, index) => {
        return (
          <NavLink className={"Sidebar-menu"} to={menu.path} key={index}>
            <SidebarItem menu={menu} />
          </NavLink>
        );
      })}
    </div>
  );
};

export default Sidebar;
