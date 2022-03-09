import React, { Component } from "react";
import "./Main.css";
import Footer from "../../Layout/Footer";
import { Link, useNavigate } from "react-router-dom";
import Sidebar from "../../Layout/Sidebar";
import Layout from "../../Layout/Layout";

const Main = () => {
  const navigate = useNavigate();
  // const goPlayerInfoPage = () => {
  //   navigate("/playerinfo");
  // };
  // const goGameInfoPage = () => {
  //   navigate("/gameinfo");
  // };

  const pageChange = (page) => {
    navigate("/" + page);
  };

  const card = [
    { id: "playerinfo", title: "Player", image: "\\image\\player.png" },
    { id: "gameinfo", title: "Game", image: "\\image\\playImage.jpg" },
  ];
  return (
    <Layout>
      <div className="mainpage">
        <div className="title">
          <h1>Tennis</h1>
          <div className="card">
            <figure>
              <Link to="/playerinfo">
                <img src="./image/player.png" />
                <figcaption>
                  <div className="line">
                    <span>
                      <p>Player</p>
                    </span>
                  </div>
                </figcaption>
              </Link>
            </figure>
            <figure>
              <Link to="/gameinfo">
                <img src="./image/playImage.jpg" />
                <figcaption>
                  <div className="line">
                    <span>
                      <p>Game</p>
                    </span>
                  </div>
                </figcaption>
              </Link>
            </figure>
          </div>
        </div>

        {/* <div className="title">
          <h1>Tennis</h1>
          <figure>
            {card.map((card) => (
              <div
                className="card"
                onClick={() => pageChange(card.id)}
                key={card.id}
              >
                <img src={card.image}></img>
                <span>
                  <h4>{card.title}</h4>
                </span>
              </div>
            ))}
          </figure>
        </div> */}
      </div>
    </Layout>
  );
};

export default Main;
