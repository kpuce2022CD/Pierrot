import React, { component, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

const Abcd = () => {
  const navigate = useNavigate();
  const gogogo = () => {
    navigate("/loginForm");
  };
  return (
    <div>
      hello
      <button onClick={gogogo}>login</button>
    </div>
  );
};

export default Abcd;
