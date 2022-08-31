// import "heatmap.js";

import React, { useEffect, useState } from "react";
import Layout from "../../Layout/Layout";
import "./Graph.css";

import BounceGraph from "./BounceGraph";
import PlyaerHeatmap from "./PlyaerHeatmap";
import ReactPlayer from "react-player/lazy";

const Graph = () => {
  const jsonData1 = require("../../tempData/1.json");
  const jsonData2 = require("../../tempData/2.json");
  const jsonData3 = require("../../tempData/3.json");
  const jsonData4 = require("../../tempData/4.json");
  const jsonData5 = require("../../tempData/5.json");
  const [rally, setRally] = useState([1, 3, 7, 1, 7]);
  const [videoUrl, setVideoUrl] = useState([]);
  const [videoIndex, setVideoIndex] = useState(0);
  const [setNum, setSetNum] = useState(0);

  // y, x, name, idx
  const [bounce, setBounce] = useState([]);
  const [position, setPosition] = useState([]);
  const [player2, setPlayer2] = useState([]);

  const getPosition = () => {
    const game = localStorage.getItem("game");
    const gameJSON = JSON.parse(game);
    console.log("!!!!!!!!!!!", gameJSON[0].bounce[0].idx);
    if (setNum === 0) {
      const tmp = gameJSON[0].bounce.map((v) => {
        return [v.y, v.x, v.court_name, v.idx];
      });
      console.log("tmptmptmptmpt", tmp);
      setBounce(tmp);
      setPosition(gameJSON[0].player_position.user);
      setPlayer2(gameJSON[0].player_position.opponent);
    } else if (setNum === 1) {
      const tmp = gameJSON[1].bounce.map((v) => [
        v.y,
        v.x,
        v.court_name,
        v.idx,
      ]);
      setBounce(tmp);
      setPosition(gameJSON[1].player_position.user);
      setPlayer2(gameJSON[1].player_position.opponent);
    } else if (setNum === 2) {
      const tmp = gameJSON[2].bounce.map((v) => [
        v.y,
        v.x,
        v.court_name,
        v.idx,
      ]);
      setBounce(tmp);
      setPosition(gameJSON[2].player_position.user);
      setPlayer2(gameJSON[2].player_position.opponent);
    } else if (setNum === 3) {
      const tmp = gameJSON[3].bounce.map((v) => [
        v.y,
        v.x,
        v.court_name,
        v.idx,
      ]);
      setBounce(tmp);
      setPosition(gameJSON[3].player_position.user);
      setPlayer2(gameJSON[3].player_position.opponent);
    } else if (setNum === 4) {
      const tmp = gameJSON[4].bounce.map((v) => [
        v.y,
        v.x,
        v.court_name,
        v.idx,
      ]);
      setBounce(tmp);
      setPosition(gameJSON[4].player_position.user);
      setPlayer2(gameJSON[4].player_position.opponent);
    } else if (setNum === 5) {
      const tmp = gameJSON[5].bounce.map((v) => [
        v.y,
        v.x,
        v.court_name,
        v.idx,
      ]);
      setBounce(tmp);
      setPosition(gameJSON[5].player_position.user);
      setPlayer2(gameJSON[5].player_position.opponent);
    } else if (setNum === 6) {
      const tmp = gameJSON[6].bounce.map((v) => [
        v.y,
        v.x,
        v.court_name,
        v.idx,
      ]);
      setBounce(tmp);
      setPosition(gameJSON[6].player_position.user);
      setPlayer2(gameJSON[6].player_position.opponent);
    }
  };

  // 렐리 구하기
  // y: 513
  const getRally = () => {
    console.log("rally");
    const rallyArray = [jsonData1, jsonData2, jsonData3, jsonData4, jsonData5];
    const array = [];
    for (let i = 0; i < 5; i++) {
      const item = rallyArray[i];
      let position = item[0].y > 513 ? "up" : "down";
      let cnt = 0;
      for (let i = 0; i < item.length; i++) {
        if (position === "up" && item[i].y <= 513) {
          cnt++;
          position = "down";
        } else if (position === "down" && item[i].y > 513) {
          cnt++;
          position = "up";
        }
      }
      // setRally([...rally, cnt]);
      array.push(cnt);
      console.log(rally, cnt);
      console.log([...rally, cnt]);
    }
    // setRally(array);
  };
  const getVideo = () => {
    setVideoUrl([
      "../video/score1.mp4",
      "../video/score2.mp4",
      "../video/score3.mp4",
      "../video/score4.mp4",
      "../video/score5.mp4",
    ]);
  };
  const changeVideo = (e) => {
    console.log(e.target, e.target.innerText);
    setVideoIndex(+e.target.innerText - 1);
  };

  useEffect(() => {
    getRally();
    getVideo();
    getPosition();
  }, [setNum]);

  useEffect(() => {
    console.log("user position: ", position);
    console.log("user bounce: ", bounce);
  }, [position, bounce]);

  return (
    <Layout>
      <div className="graph">
        <div className="graph-set">
          <button onClick={() => setSetNum(0)}>1</button>
          <button onClick={() => setSetNum(1)}>2</button>
          <button onClick={() => setSetNum(2)}>3</button>
          <button onClick={() => setSetNum(3)}>4</button>
          <button onClick={() => setSetNum(4)}>5</button>
          <button onClick={() => setSetNum(5)}>6</button>
          <button onClick={() => setSetNum(6)}>7</button>
        </div>
        <div className="graph-game">
          <ReactPlayer url={videoUrl[videoIndex]} controls={true}></ReactPlayer>
          <div className="graph-rally">
            <p>총 게임</p>
            <div>1</div>
            <p>게임 별 렐리 횟수</p>
            {rally.map((v, i) => (
              <div key={i} className="graph-rally-button">
                <div>{v}</div>
                <button onClick={changeVideo}>{i + 1}</button>
              </div>
            ))}
          </div>
        </div>
        <PlyaerHeatmap data={position} />

        <BounceGraph data={bounce} player={position} player2={player2} />
      </div>
    </Layout>
  );
};

export default Graph;

// TODO
// 현재 front, backPlyaer 의 정보 정의 필요
// 크기 조정 -> 경기장 이미지 좀 더 큰걸로 구할 필요 현재 이미지(width: 450, height=271)
