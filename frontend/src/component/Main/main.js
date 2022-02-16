import React, { Component } from "react";
import "./Main.css";
import Header from "../../Layout/Header";
import Footer from "../../Layout/Footer";
import { useNavigate } from "react-router-dom";

function Main() {
  const image = {
    margin: "10px",
  };

  const zoomIn = (e) => {
    e.target.style.width = "250px";
    e.target.style.height = "500px";
    // o.5초 동안 서서히 움직이도록
    e.target.style.transition = "all 0.5s";
  };
  const zoomOut = (e) => {
    e.target.style.width = "200px";
    e.target.style.height = "450px";
    e.target.style.transition = "all 0.5s";
  };

  const navigate = useNavigate();
  const goPlayerInfoPage = () => {
    navigate("/playerinfo");
  };
  const goGameInfoPage = () => {
    navigate("/gameinfo");
  };
  return (
    <div className="test">
      <Header />
      <div className="card">
        <div style={image} onClick={goPlayerInfoPage}>
          <img src="\image\player.png" width="200px" height="450px"></img>
          <h4>선수 정보보기</h4>
        </div>
        <div style={image} onClick={goGameInfoPage}>
          <img src="\image\playImage.jpg" width="200px" height="450px"></img>
          <h4>경기 정보보기</h4>
        </div>
        <div style={image}>
          <img src="\image\video.png" width="200px" height="450px"></img>
          <h4>video 업로드</h4>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Main;
