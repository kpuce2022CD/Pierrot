import Layout from "../../Layout/Layout";
import React, { useState } from "react";
import "./PlayerInfo.css";
import { useNavigate } from "react-router-dom";
import MyCalendar from "./MyCalendar";
import ProfileChart from "./ProflieChart";

const PlayerInfo = () => {
  // 임시
  const user = {
    name: "피에로",
    age: 27,
    height: 177,
    team: "tuk",
  };
  const game = {
    winrate: "70%",
    highestscore: "12",
    bbb: "10",
  };
  const opponent = [
    {
      name: "pierrot",
      total: "1",
      winrate: "20%",
    },
    {
      name: "earlybd",
      total: "3",
      winrate: "67%",
    },
    {
      name: "honey",
      winrate: "33%",
      total: "3",
    },
    {
      name: "butter",
      winrate: "50%",
      total: "4",
    },
  ];
  const navigate = useNavigate();
  const [date, setDate] = useState(new Date());

  const goGraph = (e) => {
    console.log(e);
    navigate(`/Profile/${e}`);
  };

  return (
    <Layout>
      <div className="playerinfopage">
        <div className="player-info-text">
          <div className="player-info">
            <div className="player-info-detail">
              <div className="profile-detail">
                <div>name</div>
                <span>{user.name}</span>
              </div>
              <div className="profile-detail">
                <div>age</div>
                <span>{user.age}</span>
              </div>
              <div className="profile-detail">
                <div>height</div>
                <span>{user.height}</span>
              </div>
              <div className="profile-detail">
                <div>team</div>
                <span>{user.team}</span>
              </div>
            </div>
          </div>
          <div className="game-info">
            <div className="game-info-detail">
              <div>win rate</div>
              <span>{game.winrate}</span>
            </div>
            <div className="game-info-detail">
              <div>highest score</div>
              <span>{game.highestscore}</span>
            </div>
            <div className="game-info-detail">
              <div>???</div>
              <span>{game.bbb}</span>
            </div>
          </div>
          <div className="opponent-info">
            <div className="opponent-info-detail">
              <div>name</div>
              <span>total play</span>
              <span>win rate</span>
            </div>
            <div className="line"></div>
            {opponent.map((v, i) => (
              <div
                className="opponent-info-detail"
                onClick={() => goGraph(v.name)}
                key={i}
              >
                <div>{v.name}</div>
                <span>{v.total}</span>
                <span>{v.winrate}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="playerinfo-graph">
          <div className="MyCalendar">
            <MyCalendar setDate={setDate} date={date} />
          </div>
          <div className="profile-chart">
            <ProfileChart date={date} />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default PlayerInfo;
