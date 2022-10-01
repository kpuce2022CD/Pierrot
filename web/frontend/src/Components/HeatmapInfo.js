import { useState } from "react";
import Heatmap from "./Chart/Heatmap";

const HeatmapInfo = (props) => {
  const { id } = props;
  const [info, setInfo] = useState({
    posiiton: "center에 주로 위치",
    distance: `100 m`,
    kcal: `100.4 kcal`,
  });

  return (
    <div className="heapmap-info-component">
      <div className="game-chart">{/* <Heatmap /> */}</div>
      <div>
        <div className="heatmap-item-list">
          {Object.keys(info).map((v, i) => (
            <div key={`heatmap-info-${i}`} className="heatmap-item">
              <span>{v}</span>
              <span>{info[v]}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HeatmapInfo;
