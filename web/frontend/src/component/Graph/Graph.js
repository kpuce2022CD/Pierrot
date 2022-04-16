import h337 from "heatmap.js";
import "heatmap.js";
import React, { Component, useState, useEffect } from "react";
import Layout from "../../Layout/Layout";
import "./Graph.css";
import {
  Chart as ChartJS,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bubble } from 'react-chartjs-2'
ChartJS.register(LinearScale, PointElement, Tooltip, Legend);

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

  const frontPoint = [];
  const backPoint = [];
  // const bounceJsonData = require("../../tempData/bounces.json");
  const bounceJsonData = [[452, 1191,'front_dueceside_right' ], [494, 397,'back_adside_left'], [376, 1304,'front_dueceside_center'], [312, 546,'back_adside_center'], [628, 1285,'front_adside_center'], [676, 471,'back_dueceside_center'], [403, 720,'back_adside_left'], [511, 789,'back_dueceside_right'], [514, 889,'front_adside_left']];
  bounceJsonData.forEach(data=>{
    const point = {
      x: parseInt(data[1]),
      y: parseInt(data[0]),
      r: 7,
    };
    if(data[2].includes('front')){
      frontPoint.push(point);
    }else{
      backPoint.push(point);
    }
    point2.push(point);
  })
  console.log(point2)


  const charData = {
    datasets:[
      {
        label:'left',
        type: 'bubble',
        backgroundColor:'rgb(100, 1, 93)',
        data: frontPoint,
      },
      {
        label:'right',
        type: 'bubble',
        backgroundColor:'rgb(54, 162, 235)',
        data: backPoint,
      },
      
    ]
  }

  const options = {
    scales:{
     y:{
       display:false,
     },
     x:{
       display:false,
     }
    },     
    plugins:{
      title:{
        display: true,
        text: 'hihi',
        position: 'top',
      },
      legend:{
        display:false,
      },
      
    }
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
          <Bubble options={options} data = {charData} width={450} height={271}/>
        </div>
      </div>
    </Layout>
  );
};

export default Graph;
