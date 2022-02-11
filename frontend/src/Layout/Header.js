import React from "react";
import { Link } from "react-router-dom";

const header = {
  float: "right",
};

const Header = () => {
  return (
    <div className="header">
      <Link
        to={"/"}
        style={{
          background: "#3d414c",
          color: "#fff",
          padding: "0px 0px 0px 10px",
        }}
      >
        tennis
      </Link>
      <div style={header}>
        <button className="button">로그아웃</button>
      </div>
    </div>
  );
};
export default Header;
