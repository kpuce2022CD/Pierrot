import React, { Component } from "react";
import "./Main.css";
import Footer from "../../Layout/Footer";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../Layout/Sidebar";
import Layout from "../../Layout/Layout";

const Main = () => {
  const image = {
    margin: "10px",
  };

  const navigate = useNavigate();
  const goPlayerInfoPage = () => {
    navigate("/playerinfo");
  };
  const goGameInfoPage = () => {
    navigate("/gameinfo");
  };
  return (
    <Layout>
      <div className="card">
        <div style={image} onClick={goPlayerInfoPage}>
          <img src="\image\player.png" width="200px" height="450px"></img>
          <h4>선수 정보보기</h4>
        </div>
        <div style={image} onClick={goGameInfoPage}>
          <img src="\image\playImage.jpg" width="200px" height="450px"></img>
          <h4>경기 정보보기</h4>
        </div>
      </div>
    </Layout>
  );
};

export default Main;
