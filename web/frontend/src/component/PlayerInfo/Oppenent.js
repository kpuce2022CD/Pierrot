import { useParams } from "react-router-dom";
import Layout from "../../Layout/Layout";
import "./Oppenent.css";

const Oppenent = () => {
  const { id } = useParams();
  const player = {
    id: id,
    winrate: "10%",
    total: 10,
  };
  return (
    <Layout>
      <div className="oppenet-page">
        <div className="oppenet-header">
          <div>id</div>
          <span>{player.id}</span>
          <div>win rate</div>
          <span>{player.winrate}</span>
          <div>total play</div>
          <span>{player.total}</span>
        </div>
        <div className="oppent-graph">
          <div className="winrate-grapht"></div>
        </div>
      </div>
    </Layout>
  );
};

export default Oppenent;
