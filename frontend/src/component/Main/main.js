import React, { Component } from "react";
import "./Main.css";
import Header from "../../Layout/Header";
import Footer from "../../Layout/Footer";

class Main extends Component {
  render() {
    return (
      <div className="test">
        <Header />
        <div className="card">
          <div style={{ margin: "10px" }}>
            <img src="\image\player.png" width="200px" height="450px"></img>
            <h4>선수 정보보기</h4>
          </div>
          <div style={{ margin: "10px" }}>
            <img src="\image\playImage.jpg" width="200px" height="450px"></img>
            <h4>경기 정보보기</h4>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

export default Main;
