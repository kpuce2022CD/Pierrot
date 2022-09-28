import BounceInfo from "Components/BounceInfo";
import HeatmapInfo from "Components/HeatmapInfo";
import VideoInfo from "Components/VideoInfo";
import Layout from "Layout/Layout";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "Styles/Game.css";

const Game = () => {
  const { id } = useParams();
  const [rally, setRally] = useState();
  const [info, setInfo] = useState({
    position: "center",
    distance: 100,
    kcal: 100.3,
  });
  const [bounceInfo, setBounceInfo] = useState({});
  useEffect(() => {
    console.log(id);
  }, []);
  return (
    <Layout>
      <div className="game-page">
        <VideoInfo id={id} />
        <HeatmapInfo id={id} />
        <BounceInfo id={id} />
      </div>
    </Layout>
  );
};

export default Game;
