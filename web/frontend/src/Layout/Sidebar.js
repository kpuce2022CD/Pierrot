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
      url: "/game/list",
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
            className={`sidebar-item ${
              v.url === window.location.pathname ? "sidebar-line" : ""
            }`}
            onClick={() => navigate(v.url)}
          >
            {/* {v.url === window.location.pathname ? <div>||</div> : <></>} */}
            <img src={v.icon} />
            <div>{v.title}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
