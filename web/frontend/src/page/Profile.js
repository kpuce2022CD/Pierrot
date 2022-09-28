import Layout from "Layout/Layout";
import { useState } from "react";
import "Styles/ProfilePage.css";

const Profile = () => {
  const [userInfo, setUserInfo] = useState({
    name: "홍길동",
    age: 44,
    team: "tuk",
    heigth: 70,
    weight: 170,
  });
  const [opponent, setOpponent] = useState([
    { name: "aaaa", total: 11, rate: 90 },
    { name: "bbb", total: 11, rate: 90 },
    { name: "vvv", total: 11, rate: 90 },
    { name: "ddd", total: 11, rate: 20 },
  ]);
  const [gameInfo, setGameInfo] = useState({
    totalGame: 10,
    winRate: 10,
    opsition: "주로00에 위치",
  });
  return (
    <Layout>
      <div className="profile-page">
        <div className="profile-user-info">
          {Object.keys(userInfo).map((v, i) => (
            <div className="item" key={i}>
              <span>{v}</span>
              <span>{userInfo[v]}</span>
            </div>
          ))}
        </div>
        <div className="profile-calendar">
          <div>달력위치</div>
          <div>도넛차트 위치</div>
        </div>
        <div className="profile-opponent">
          <table>
            <thead>
              <tr>
                <td>name</td>
                <td>total play</td>
                <td>win rate</td>
              </tr>
            </thead>
            <tbody>
              {opponent.map((v, i) => (
                <tr>
                  <td>{v.name}</td>
                  <td>{v.total}</td>
                  <td>{v.rate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="profile-game-info">
          {Object.keys(gameInfo).map((v, i) => (
            <div className="item">
              <span>{v}</span>
              <span>{gameInfo[v]}</span>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Profile;
