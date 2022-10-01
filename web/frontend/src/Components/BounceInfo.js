import Bounce from "Components/Chart/Bounce";
import { useState } from "react";

const BounceInfo = (props) => {
  const { id } = props;
  const [bounceInfo, setBounceInfo] = useState({
    DueceSide_Right: [1, 10],
    DueceSide_Center: [2, 20],
    DueceSide_Left: [3, 30],
    Adside_Right: [4, 40],
    Adside_Center: [5, 50],
    Adside_Left: [6, 60],
  });

  return (
    <div className="bounce-info-component">
      <div className="game-chart">{/* <Bounce /> */}</div>
      <div>
        <div className="bounce-item-list">
          {Object.keys(bounceInfo).map((v, i) => (
            <div key={`bounce-info-${i}`} className="bounce-item">
              <span>{v}</span>
              <span>{bounceInfo[v][0]}</span>
              <span>{bounceInfo[v][1]}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BounceInfo;
