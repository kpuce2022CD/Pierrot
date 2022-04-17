import { useState } from "react";
import LineChart from "./Chart/Line/LineChart.js";
import PieChart from "./Chart/Pie/Pie.js";
import {GameDistance} from "../GameData/GameData.js";

function Game() {
  const [GameDistance, setGameDistance] = useState({
    labels: GameDistance.map((data) => data.distance),
    datasets: [
        {
        label: "선수 이동거리",
        data: GameDistance.map((data) => data.distance),
        backgroundColor: ["red"],
        borderColor: "black",
        borderWidth: 2,
      },
    ],
  });

  return (
    <div className="Game">
      <div style={{ width: 700 }}>
        <LineChart chartData={GameDistance} />
      </div>
      <div style={{ width: 700 }}>
        <PieChart chartData={GameDistance} />
      </div>
    </div>
  );
}

export default Game;