import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import "./Layout.css";
import { logout } from "../apis";
import { ICON } from "Constants/icons";

const Sidebar = () => {
  const navigate = useNavigate();
  const [items, setItems] = useState([
    {
      title: "GameList",
      icon: ICON.DASHBOAD,
      url: "/game",
      click: true,
    },
    {
      title: "Profile",
      icon: ICON.PROFILE,
      url: "/profile",
      click: false,
    },
    {
      title: "Upload",
      icon: ICON.UPLOAD,
      url: "/upload",
      click: false,
    },
    {
      title: "About",
      icon: ICON.ABOUT,
      url: "/about",
      click: false,
    },
    {
      title: "Setting",
      icon: ICON.SETTING,
      url: "/setting",
      click: false,
    },
  ]);
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
  const isMatch = (url) => {
    if (window.location.pathname.split("/").length > 2) {
      const urlArr = window.location.pathname.split("/");
      return url === `/${urlArr[1]}/${urlArr[2]}`;
    }
    return url === window.location.pathname;
  };

  return (
    <div className="SidebarContainer">
      <div className="logo">
        <img src={ICON.LOGO} />
        <div>A.Te.Co</div>
      </div>
      <div className="sidebar">
        {items.map((v, i) => (
          <div
            key={i}
            className={`sidebar-item ${isMatch(v.url) ? "sidebar-line" : ""}`}
            onClick={() => navigate(v.url)}
          >
            <img src={v.icon} />
            <div>{v.title}</div>
          </div>
        ))}
      </div>
      <div className="logout">
        <img src={ICON.LOGOUT} />
      </div>
    </div>
  );
};

export default Sidebar;
