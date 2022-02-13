import "./GameInfo.css";
import Layout from "../../Layout/Layout";
import { useNavigate } from "react-router-dom";

function GameInfo() {
  const navigate = useNavigate();
  const goGraph = (e) => {
    console.log(e);
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
    {
      id: 5,
      title: "정왕동",
      player: "kim",
      day: "2022-02-10",
    },
    {
      id: 6,
      title: "정왕동",
      player: "lee",
      day: "2022-02-11",
    },
    {
      id: 7,
      title: "정왕동",
      player: "park",
      day: "2022-02-12",
    },
    {
      id: 8,
      title: "정왕동",
      player: "han",
      day: "2022-02-13",
    },
    {
      id: 9,
      title: "정왕동",
      player: "kim",
      day: "2022-02-14",
    },
    {
      id: 10,
      title: "정왕동",
      player: "kim",
      day: "2022-02-10",
    },
    {
      id: 11,
      title: "정왕동",
      player: "lee",
      day: "2022-02-11",
    },
    {
      id: 12,
      title: "정왕동",
      player: "park",
      day: "2022-02-12",
    },
    {
      id: 13,
      title: "정왕동",
      player: "han",
      day: "2022-02-13",
    },
    {
      id: 14,
      title: "정왕동",
      player: "kim",
      day: "2022-02-14",
    },
    {
      id: 15,
      title: "정왕동",
      player: "kim",
      day: "2022-02-10",
    },
    {
      id: 16,
      title: "정왕동",
      player: "lee",
      day: "2022-02-11",
    },
    {
      id: 17,
      title: "정왕동",
      player: "park",
      day: "2022-02-12",
    },
    {
      id: 18,
      title: "정왕동",
      player: "han",
      day: "2022-02-13",
    },
    {
      id: 19,
      title: "정왕동",
      player: "kim",
      day: "2022-02-14",
    },
    {
      id: 20,
      title: "정왕동",
      player: "kim",
      day: "2022-02-10",
    },
    {
      id: 21,
      title: "정왕동",
      player: "lee",
      day: "2022-02-11",
    },
    {
      id: 22,
      title: "정왕동",
      player: "park",
      day: "2022-02-12",
    },
    {
      id: 23,
      title: "정왕동",
      player: "han",
      day: "2022-02-13",
    },
    {
      id: 24,
      title: "정왕동",
      player: "kim",
      day: "2022-02-14",
    },
  ];

  return (
    <div>
      <Layout>
        {games.map((game) => (
          <div key={game.id}>
            <Game game={game} />
          </div>
        ))}
      </Layout>
    </div>
  );
}

export default GameInfo;
