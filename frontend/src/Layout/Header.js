import React from "react";
import { Link } from "react-router-dom";
import "./Layout.css";

const Header = () => {
  return (
    <div className="header">
      <Link
        to={"/main"}
        style={{
          background: "#3d414c",
          color: "#fff",
          padding: "0px 0px 0px 10px",
        }}
      >
        tennis
      </Link>

      <button className="logoutButton">로그아웃</button>
    </div>
  );
};
export default Header;
