// import "heatmap.js";

import React from "react";
import Layout from "../../Layout/Layout";
import "./Graph.css";

import BounceGraph from "./BounceGraph";
import PlyaerHeatmap from "./PlyaerHeatmap";

const Graph = () => {
  // 추출한 데이터의 x, y좌표와 그려줄 x, y좌표 변환 필요
  // 추출했을 당시 세로, 그려줄 좌표는 가로
  // width: 450, height: 271
  // 0번 데이터를 프론트선수로

  return (
    <Layout>
      <div className="graph">
        <PlyaerHeatmap />
        {/* <div className="player-heatmap"></div> */}
        <div className="graph-info">
          <div>
            <h2>총 이동 거리</h2>
            <p>000m</p>
          </div>
          <div>
            <h2>총 000</h2>
            <p>000</p>
          </div>
        </div>
        <BounceGraph />
        <div className="bounce"></div>
      </div>

      {/* <div>
        <Bar
          data={gamescoreData}
          width={450}
          height={271}
          options={gamescoreoptions}
        />
      </div>
      <div>
        <Line
          data={serveceonfig}
          width={450}
          height={271}
          options={serveOptions}
        />
      </div>
      <div>
        <Bar
          data={gamescoreData}
          width={450}
          height={271}
          options={gamescoreoptions}
        />
      </div>
      <div>
        <Line
          data={serveceonfig}
          width={450}
          height={271}
          options={serveOptions}
        />
      </div> */}
    </Layout>
  );
};

export default Graph;

// TODO
// 현재 front, backPlyaer 의 정보 정의 필요
// 크기 조정 -> 경기장 이미지 좀 더 큰걸로 구할 필요 현재 이미지(width: 450, height=271)
