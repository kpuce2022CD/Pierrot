import h337 from "heatmap.js";
import "heatmap.js";
import React, { Component, useState, useEffect } from "react";
import Layout from "../../Layout/Layout";
import "./Graph.css";

const Graph = () => {
  // 추출한 데이터의 x, y좌표와 그려줄 x, y좌표 변환 필요
  // 추출했을 당시 세로, 그려줄 좌표는 가로
  // width: 450, height: 271
  const points = [];
  const jsonData = require("../../tempData/playerCoords.json");
  // console.log(jsonData);
  jsonData.forEach((data) => {
    const point = {
      x: parseInt(data.y_0),
      y: parseInt(data.x_0),
      value: 1,
    };
    points.push(point);
  });

  const max = 50;
  const data = {
    max: max,
    data: points,
  };

  useEffect(() => {
    const heatmapInstance = h337.create({
      container: document.querySelector(".heatmap"),
      opacity: "0.3",
    });
    console.log(data);
    console.log(heatmapInstance);
    heatmapInstance.setData(data);
  }, []);

  return (
    <Layout>
      <div className="graph">
        <div className="heatmap"></div>
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
      </div>
    </Layout>
  );
};

export default Graph;
