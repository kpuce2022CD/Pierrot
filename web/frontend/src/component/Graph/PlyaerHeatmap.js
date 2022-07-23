import h337 from "heatmap.js";
import { useParams } from "react-router-dom";

import { forwardRef, useEffect, useRef, useState } from "react";
const PlyaerHeatmap = () => {
  // 추출한 데이터의 x, y좌표와 그려줄 x, y좌표 변환 필요
  // 추출했을 당시 세로, 그려줄 좌표는 가로
  // width: 450, height: 271
  // 0번 데이터를 프론트선수로
  const id = useParams();
  console.log("heatmap", id);
  const points = [];
  // 임시데이터 -> id 기반으로 가져와야함
  let position = 0;
  const [message, setMessage] = useState("");
  const jsonData = require("../../tempData/playerCoords.json");
  const ref = useRef();
  jsonData.forEach((data) => {
    const point = {
      x: parseInt(data.y_1),
      y: parseInt(data.x_1),
      value: 1,
    };
    position += data.x_1;
    points.push(point);
  });
  position = position / jsonData.length;

  const playerData = {
    max: 50,
    data: points,
  };

  useEffect(() => {
    const playerHeatmapInstance = h337.create({
      container: ref.current,
      opacity: "0.3",
    });
    playerHeatmapInstance.setData({
      max: 50,
      data: points,
    });
    if (position < 90) {
      setMessage("왼쪽에 오래 머물고 있습니다.");
    } else if (position > 180) {
      setMessage("오른쪽에 오래 머물고 있습니다.");
    } else {
      setMessage("중앙에 오래 머물고 있습니다.");
    }
    console.log(message);
  }, []);

  return (
    <div className="game-heatmap">
      <div className="player-heatmap" ref={ref}></div>
      <div className="graph-detail">
        <h2>평균 위치</h2>
        <p>{message}</p>
        <h2>총 이동 거리</h2>
        <p>375m</p>
        <h2>총 000</h2>
        <p>000</p>
      </div>
    </div>
  );
};
export default PlyaerHeatmap;
