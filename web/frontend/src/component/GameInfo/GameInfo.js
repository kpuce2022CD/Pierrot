import "./GameInfo.css";
import React from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../../Layout/Layout";

function GameInfo() {
  const navigate = useNavigate();
  const goGraph = (id) => {
    console.log(id);
    navigate(`/graph/${id}`);
  };

  // db 연동 전 테스트
  // const games = [
  //   {
  //     id: 0,
  //     title: "정왕동",
  //     player: "kim",
  //     day: "2022-02-10",
  //   },
  //   {
  //     id: 1,
  //     title: "정왕동",
  //     player: "lee",
  //     day: "2022-02-11",
  //   },
  //   {
  //     id: 2,
  //     title: "정왕동",
  //     player: "park",
  //     day: "2022-02-12",
  //   },
  //   {
  //     id: 3,
  //     title: "정왕동",
  //     player: "han",
  //     day: "2022-02-13",
  //   },
  //   {
  //     id: 4,
  //     title: "정왕동",
  //     player: "kim",
  //     day: "2022-02-14",
  //   },
  // ];
  const game = localStorage.getItem("game");
  const games = [
    {
      id: 1,
      day: JSON.parse(game)[0].date,
      player: JSON.parse(game)[0].opponent,
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
            {/* title:{game.id} */}
            {/* {game.title} */}
            day : {game.day}
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
