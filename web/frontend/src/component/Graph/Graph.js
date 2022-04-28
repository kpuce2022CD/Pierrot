import h337 from "heatmap.js";

import "heatmap.js";

import React, { Component, useRef, useEffect, useState } from "react";
import Layout from "../../Layout/Layout";
import "./Graph.css";
import {
  Chart as ChartJS,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
  Title,
} from "chart.js";
import { Bubble, Bar } from "react-chartjs-2";
import ChartDataLabels from "chartjs-plugin-datalabels";
import Chart from "chart.js/auto";

ChartJS.register(
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
  Title,
  ChartDataLabels
);

const Graph = () => {
  // 추출한 데이터의 x, y좌표와 그려줄 x, y좌표 변환 필요
  // 추출했을 당시 세로, 그려줄 좌표는 가로
  // width: 450, height: 271
  const points = [];
  const jsonData = require("../../tempData/playerCoords.json");
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

  const frontPoint = [];
  const backPoint = [];
  const bounceJsonData = [
    [452, 1191, "front_dueceside_right", 27],
    [494, 397, "back_adside_left", 119],
    [376, 1304, "front_dueceside_center", 184],
    [312, 546, "back_adside_center", 257],
    [628, 1285, "front_adside_center", 366],
    [676, 471, "back_dueceside_center", 431],
    [403, 720, "back_adside_left", 591],
    [511, 789, "back_dueceside_right", 739],
    [514, 889, "front_adside_left", 894],
  ];
  bounceJsonData.forEach((data, i) => {
    const point = {
      x: parseInt(data[1]),
      y: parseInt(data[0]) + data[3] * 0.1,
      r: 10,
    };
    if (data[2].includes("front")) {
      point.x += 0.1 * (Object.keys(frontPoint).length + 1);
      frontPoint.push(point);
    } else {
      point.x += 0.1 * (Object.keys(backPoint).length + 1);
      backPoint.push(point);
    }
  });

  const bounceIndex = bounceJsonData.map((e) => e[3]);
  const frontPlayer = [];
  const backPlayer = [];
  const playerTopData = require("../../tempData/csvjson.json");

  bounceIndex.forEach((v, i) => {
    const point1 = {
      x: parseInt(playerTopData[v].y_0),
      y: parseInt(playerTopData[v].x_0) + 0.1 * (i + 1),
      r: 0,
    };
    frontPlayer.push(point1);
    const point2 = {
      x: parseInt(playerTopData[v].y_1),
      y: parseInt(playerTopData[v].x_1) + 0.1 * (i + 1),
      r: 0,
    };
    backPlayer.push(point2);
  });

  const [chartData, setChartData] = useState({ datasets: [] });
  const [chartOptions, setChartOptions] = useState({});
  const chartReference = useRef();
  const chart = () => {
    setChartData({
      datasets: [
        {
          label: "back",
          type: "bubble",
          backgroundColor: "rgb(100, 1, 93)",
          data: frontPoint,
        },
        {
          label: "front",
          type: "bubble",
          backgroundColor: "rgb(54, 162, 235)",
          data: backPoint,
        },
        {
          label: "player_0",
          type: "bubble",
          backgroundColor: "rgb(200, 100, 100)",
          data: frontPlayer,
          // hidden: true,
        },
        {
          label: "player_1",
          type: "bubble",
          backgroundColor: "rgb(200, 300, 100)",
          data: backPlayer,
          // hidden: true,
        },
      ],
    });

    setChartOptions({
      scales: {
        y: {
          display: false,
          max: 730,
          min: 300,
        },
        x: {
          display: false,
          max: 1700,
          min: 200,
        },
      },
      onHover: function (evt, e) {
        if (e.length) {
          const index = e[0].index;
          console.log(chartReference.current);
          const mychart = chartReference.current;
          console.log(mychart);
          mychart.data.datasets[2].data[index].r = 10;
          mychart.data.datasets[3].data[index].r = 10;
          mychart.update();
        }
      },
      plugins: {
        legend: {
          display: false,
        },
        tooltip: {
          callbacks: {
            label: function (context) {
              let label = context.dataset.label || "";
              if (label) {
                label += ": ";
                label += `(${parseInt(context.parsed.x)}, ${parseInt(
                  context.parsed.y
                )})`;
              }
              return label;
            },
          },
        },
        datalabels: {
          display: true,
          color: "white",
          align: "center",
          labels: {
            title: {
              font: {
                weight: "bold",
              },
            },
          },
          formatter: function (value) {
            return value.x % 1 === 0 ? null : (value.x % 1).toFixed(1) * 10;
          },
        },
      },
    });
  };

  const barChartData = {
    labels: [
      "역대 전적 승률",
      "서브 평균속도",
      "총 점수",
      "서브 성공률",
      "역대 이동거리",
    ],
    datasets: [
      //임시로 넣은 데이터 상대와 나 비교해서 넣을방법 구색
      {
        label: "나",
        stack: "Stack 0",
        backgroundColor: "#d41111",
        data: [56, "98km", 250, "87%", "1435m"],
      },
      {
        label: "상대",
        stack: "Stack 0",
        backgroundColor: "#3765b0",
        data: [44, "103km", 150, "%", "1503m"].map((k) => -k),
      },
    ],
  };
  const Gameoptions = {
    indexAxis: "y",
    legend: { display: false },
    title: {
      display: true,
      text: "경기 스텟 비교 분석",
    },
  };

  // chart();
  useEffect(() => {
    const playerHeatmapInstance = h337.create({
      container: document.querySelector(".player-heatmap"),
      opacity: "0.3",
    });
    playerHeatmapInstance.setData(playerData);
    chart();
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
          <Bubble
            ref={chartReference}
            data={chartData}
            options={chartOptions}
            width={450}
            height={271}
          />
          {/* <Bubble options={options} data={charData} width={450} height={271} /> */}
        </div>
        <div>
          <Bar
            data={barChartData}
            width={450}
            height={271}
            options={Gameoptions}
          />
        </div>
      </div>
    </Layout>
  );
};

export default Graph;

// TODO
// 현재 front, backPlyaer 의 정보 이상하게 저장되어있음
// 현재 bounce 인덱스를 기준으로 저장
// hover 상태를 벗어날때 처리 필요
