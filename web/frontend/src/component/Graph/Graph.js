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
  }, []);

  return (
    <Layout>
      <div className="graph">
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
        <PlyaerHeatmap />

        <BounceGraph />
      </div>
    </Layout>
  );
};

export default Graph;

// TODO
// 현재 front, backPlyaer 의 정보 정의 필요
// 크기 조정 -> 경기장 이미지 좀 더 큰걸로 구할 필요 현재 이미지(width: 450, height=271)
