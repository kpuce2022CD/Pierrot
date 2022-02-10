import React from "react";

const header = {
  float: "right",
};

const Header = () => {
  return (
    <div className="header">
      tennis
      <div style={header}>
        <button className="button">로그아웃</button>
      </div>
    </div>
  );
};
export default Header;
