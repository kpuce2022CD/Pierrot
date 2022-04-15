import h337 from "heatmap.js";
import "heatmap.js";
import React, { Component, useState, useEffect } from "react";
import Layout from "../../Layout/Layout";
import "./Graph.css";
import { Chart as ChartJS, registerables } from 'chart.js';
import { Chart, Bubble, Line } from 'react-chartjs-2'
ChartJS.register(...registerables);

const Graph = () => {
  // 추출한 데이터의 x, y좌표와 그려줄 x, y좌표 변환 필요
  // 추출했을 당시 세로, 그려줄 좌표는 가로
  // width: 450, height: 271
  const points = [];
  const jsonData = require("../../tempData/playerCoords.json");
  // console.log(jsonData[0]);
  // console.log(typeof jsonData[0]);
  jsonData.forEach((data) => {
    const point = {
      x: parseInt(data.y_0),
      y: parseInt(data.x_0),
      value: 1,
    };
    points.push(point);
  });

  const max = 50;
  const playerData = {
    max: max,
    data: points,
  };

  const point2 =[];

  const bounceJsonData = require("../../tempData/bounces.json");
  bounceJsonData.forEach(data=>{
    const point = {
      x: parseInt(data.x),
      y: parseInt(data.y),
      value:10,
    };
    point2.push(point);
  })

  const bounceData = {
    max: max,
    data: point2,
  }


  const data = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
      {
        type: 'line',
        label: 'Dataset 1',
        borderColor: 'rgb(54, 162, 235)',
        borderWidth: 2,
        data: [1, 2, 3, 4, 5],
      },
      {
        type: 'bar',
        label: 'Dataset 2',
        backgroundColor: 'rgb(255, 99, 132)',
        data: [1, 2, 3, 4, 5, 6],
        borderColor: 'red',
        borderWidth: 2,
      },
      {
        type: 'bar',
        label: 'Dataset 3',
        backgroundColor: 'rgb(75, 192, 192)',
        data: [1, 2, 3, 4, 5, 6],
      },
    ],
  };

  const charData = {
    datasets:[
      {
        type: 'bubble',
        data: bounceData,
        options: {
          responsive: true,
          plugins: {
            legend: {
              position: 'top',
            },
            title: {
              display: true,
              text: 'Chart.js Bubble Chart'
            }
          }
        },
      }
    ]
  }

  useEffect(() => {
    const playerHeatmapInstance = h337.create({
      container: document.querySelector(".player-heatmap"),
      opacity: "0.3",
    });
    // console.log(playerData);
    // console.log(playerHeatmapInstance);
    playerHeatmapInstance.setData(playerData);

  }, []);

  return (
    <Layout>
      <div className="graph">
        <div className="player-heatmap"></div>
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
        <div className="bounce">
          <Bubble type='line' data = {data}/>
        </div>
      </div>
    </Layout>
  );
};

export default Graph;
