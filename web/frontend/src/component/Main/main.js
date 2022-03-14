import React, { Component } from "react";
import "./main.css";
import Header from "../../Layout/Header";
import Footer from "../../Layout/Footer";
import { useNavigate } from "react-router-dom";

function Main() {
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

  const govideoUploadPage = () => {
    navigate("/videoupload");
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
        <div style={image} onClick={govideoUploadPage}>
          <img src="\image\video.png" width="200px" height="450px"></img>
          <h4>video 업로드</h4>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Main;
