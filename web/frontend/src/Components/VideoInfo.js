import Layout from "Layout/Layout";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const VideoInfo = (props) => {
  const { id } = props;
  const [Rally, setRally] = useState([1, 2, 3, 4]);

  useEffect(() => {}, []);
  return (
    <div className="video-info-component">
      <div className="game-video">video</div>
      <div>
        <h1>Rally</h1>
        <div className="rally-item-list">
          {Rally.map((v, i) => (
            <div key={`rally-${i}`} className="rally-item">
              <span>{i + 1}</span>
              <span>{v}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default VideoInfo;
