import h337 from "heatmap.js";
import { useEffect } from "react";
const PlyaerHeatmap = () => {
  // 추출한 데이터의 x, y좌표와 그려줄 x, y좌표 변환 필요
  // 추출했을 당시 세로, 그려줄 좌표는 가로
  // width: 450, height: 271
  // 0번 데이터를 프론트선수로
  const points = [];
  // 임시데이터
  const jsonData = require("../../tempData/playerCoords.json");
  jsonData.forEach((data) => {
    const point = {
      x: parseInt(data.y_1),
      y: parseInt(data.x_1),
      value: 1,
    };
    points.push(point);
  });

  const playerData = {
    max: 50,
    data: points,
  };

  useEffect(() => {
    const playerHeatmapInstance = h337.create({
      container: document.querySelector(".player-heatmap"),
      opacity: "0.3",
    });
    playerHeatmapInstance.setData({
      max: 50,
      data: points,
    });
  }, []);

  return <div className="player-heatmap"></div>;
};
export default PlyaerHeatmap;
