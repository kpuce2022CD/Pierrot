import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="footer">
      <Link to={"/guide"} style={{ color: "gray" }}>
        가이드
      </Link>
    </div>
  );
};

export default Footer;
