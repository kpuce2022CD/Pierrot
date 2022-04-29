import "./GameInfo.css";
import React, { Component } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../../Layout/Layout";

function GameInfo() {
  const navigate = useNavigate();
  const goGraph = (id) => {
    console.log(id);
    navigate("/graph");
  };

  const Game = ({ game }) => {
    return (
      <div className="gamelist" onClick={goGraph}>
        {game.title}
        {game.day}
      </div>
    );
  };

  // db 연동 전 테스트
  const games = [
    {
      id: 0,
      title: "정왕동",
      player: "kim",
      day: "2022-02-10",
    },
    {
      id: 1,
      title: "정왕동",
      player: "lee",
      day: "2022-02-11",
    },
    {
      id: 2,
      title: "정왕동",
      player: "park",
      day: "2022-02-12",
    },
    {
      id: 3,
      title: "정왕동",
      player: "han",
      day: "2022-02-13",
    },
    {
      id: 4,
      title: "정왕동",
      player: "kim",
      day: "2022-02-14",
    },
  ];

  return (
    <Layout>
      <div className="gamelist">
        {games.map((game) => (
          <div
            className="gamelist-item"
            onClick={() => goGraph(game.id)}
            key={game.id}
          >
            {game.id}
            {game.title}
            {game.day}
          </div>
          // <div key={game.id}>
          //   <Game game={game} />
          // </div>
        ))}
      </div>
    </Layout>
  );
}

export default GameInfo;
