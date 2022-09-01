import { useParams } from "react-router-dom";

import { useEffect, useState, useRef } from "react";
import { Bubble } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
  Title,
} from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";

ChartJS.register(
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
  Title,
  ChartDataLabels
);
const BounceGraph = (props) => {
  const id = useParams();
  console.log("bounce", id);
  console.log("props!!!!!!!!!!!!!!!!!", props);

  // const playerTopData = require("../../tempData/csvjson.json");
  const playerTopData = props.player;
  const player2 = props.player2;
  const [bounceposition, setBounceposition] = useState([]);

  const frontPoint = [];
  const backPoint = [];
  const frontPlayer = [];
  const backPlayer = [];
  // 임시데이터 -> id 기반으로 가져와야함
  const pos = new Array(6).fill(0);
  // due 0,1,2 adside 3,4,5
  // r c l
  const [posi, setPosi] = useState([]);
  const [len, setLen] = useState(0);

  // 점수 기준
  // const bounceJsonData = [
  //   [452, 1191, "front_dueceside_right", 27],
  //   [494, 397, "back_adside_left", 119],
  //   [376, 1304, "front_dueceside_center", 184],
  //   [312, 546, "back_adside_center", 257],
  //   [628, 1285, "front_adside_center", 366],
  //   [676, 471, "back_dueceside_center", 431],
  //   [403, 720, "back_adside_left", 591],
  //   [511, 789, "back_dueceside_right", 739],
  //   [514, 889, "front_adside_left", 894],
  // ];

  const bounceJsonData = props.data;
  const yData = props.data.map((v) => v[1] * 0.2);
  const xData = props.data.map((v) => v[0] * 0.2);
  const yMin = Math.min(...yData);
  const yMax = Math.max(...yData);
  const xMin = Math.min(...xData);
  const xMax = Math.max(...xData);
  const saveDate = () => {
    let leng = 0;
    bounceJsonData.forEach((data, i) => {
      const point = {
        x: parseInt(data[0] * 0.2),
        y: parseInt(data[1] * 0.2) + data[3] * 0.001,
        r: 10,
      };
      console.log("ampampamp", point, data);
      const tmp = data[2].split("_");
      if (tmp[0] === "front") {
        const num = tmp[1] === "dueceside" ? 0 : 3;
        switch (tmp[2]) {
          case "right":
            pos[num]++;
            break;
          case "center":
            pos[num + 1]++;
            break;
          case "left":
            pos[num + 2]++;
            break;
        }
        leng++;
        setPosi(pos);
        console.log("asdfasf", pos, posi, len);
        point.x += 0.1 * (i + 1);
        frontPoint.push(point);
      } else {
        point.x += 0.1 * (i + 1);
        backPoint.push(point);
        setBounceposition([...bounceposition, tmp[2]]);
        console.log(bounceposition, tmp[2]);
      }
      setLen(leng);
    });
    console.log("font back", frontPoint, backPoint);
    const bounceIndex = bounceJsonData.map((e) => e[3]);
    // 임시데이터

    // 바운드 했을 당시 두 선수들의 위치 저장
    bounceIndex.forEach((v, i) => {
      console.log("!!!!!!!!!!!!!!!", v, i);
      const point1 = {
        x: parseInt(playerTopData[v][1] * 0.2),
        y: parseInt(playerTopData[v][0] * 0.2) + 0.1 * (i + 1),
        // x: parseInt(playerTopData[v].y_0),
        // y: parseInt(playerTopData[v].x_0) + 0.1 * (i + 1),
        r: 0,
      };
      frontPlayer.push(point1);
      const point2 = {
        x: parseInt(player2[v][1] * 0.2),
        y: parseInt(player2[v][0] * 0.2) + 0.1 * (i + 1),

        // x: parseInt(playerTopData[v].y_1),
        // y: parseInt(playerTopData[v].x_1) + 0.1 * (i + 1),
        r: 0,
      };
      backPlayer.push(point2);
    });
  };
  const [chartData, setChartData] = useState({ datasets: [] });
  const [chartOptions, setChartOptions] = useState({});
  const chartReference = useRef();
  const chart = () => {
    setChartData({
      datasets: [
        {
          label: "front",
          type: "bubble",
          backgroundColor: "rgb(100, 1, 93)",
          data: frontPoint,
        },
        {
          label: "back",
          type: "bubble",
          backgroundColor: "rgb(54, 162, 235)",
          data: backPoint,
        },
        {
          label: "frontPlayer",
          type: "bubble",
          backgroundColor: "rgb(200, 100, 100)",
          data: frontPlayer,
        },
        {
          label: "backPlayer",
          type: "bubble",
          backgroundColor: "rgb(200, 300, 100)",
          data: backPlayer,
        },
      ],
    });

    setChartOptions({
      scales: {
        y: {
          display: false,
          // max: 730,
          // min: 300,
          max: yMax + 50,
          min: yMin - 50,
        },
        x: {
          display: false,
          // max: 1700,
          // min: 200,
          max: xMax + 50,
          min: xMin - 50,
        },
      },
      onClick: (evt, e) => {
        // 클릭시 상대 두 선수들의 위치 보여줌
        console.log("e", e);
        const bounceChart = chartReference.current;
        console.log("councechart", e, bounceChart.data);
        const index = e[0]?.index;
        if (index === undefined || e[0].datasetIndex >= 2) {
          return;
        }
        // console.log(index, e[0].datasetIndex);
        // console.log(bounceChart.data.datasets[2].data);

        // 바운스 순서 구하기
        // bounceChart.data.datasets : 배열
        // e[0].datasetIndex : front, bakc, frontplayer, bakcplayer 인지
        // bounceChart.data.datasets[e[0].datasetIndex].data[index] :
        const tmp =
          bounceChart.data.datasets[e[0].datasetIndex].data[index].x % 1 === 0
            ? null
            : (
                bounceChart.data.datasets[e[0].datasetIndex].data[index].x % 1
              ).toFixed(1) * 10;
        console.log(
          "tmp: ",
          tmp,
          bounceChart.data.datasets[e[0].datasetIndex].data[index]
        );

        // 모든 원소 반지름 0으로
        for (let i = 2; i < 4; i++) {
          for (let j = 0; j < bounceChart.data.datasets[i].data.length; j++) {
            bounceChart.data.datasets[i].data[j].r = 0;
          }
        }
        // 특정 원소 반지름 10으로
        for (let i = 2; i < 4; i++) {
          const chart = bounceChart.data.datasets[i].data;
          console.log("원소 반지름 확인: ", chart);
          for (let j = 0; j < chart.length; j++) {
            const yy =
              chart[j].y % 1 === 0 ? null : (chart[j].y % 1).toFixed(1) * 10;
            console.log("yy", yy, chart[j]);
            if (yy == tmp) {
              bounceChart.data.datasets[i].data[yy - 1].r = 10;
              console.log(
                "yy",
                yy,
                chart[j],
                bounceChart.data.datasets[i].data[yy - 1].r,
                bounceChart.data.datasets[i].data[yy - 1]
              );
            }
          }
        }
        bounceChart.update();
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
            console.log("vaule", (value.x % 1).toFixed(1) * 10);
            return value.x % 1 === 0 ? null : (value.x % 1).toFixed(1) * 10;
          },
        },
      },
    });
  };

  useEffect(() => {
    saveDate();
    chart();
    console.log("chartdata", chartData);
    console.log(
      "player position",
      frontPlayer,
      backPlayer,
      frontPoint,
      backPoint
    );
  }, [props]);
  return (
    <div className="bounce">
      <div className="bounce-chart">
        <Bubble
          ref={chartReference}
          data={chartData}
          options={chartOptions}
          width={"450px"}
          height={"271px"}
        />
      </div>

      <div className="graph-detail">
        <h2>dueceside-right</h2>
        <p>{posi[0]}</p>
        <p>{Math.floor((posi[0] / len) * 100)}%</p>
        <h2>dueceside-center</h2>
        <p>{posi[1]}</p>
        <p>{Math.floor((posi[1] / len) * 100)}%</p>
        <h2>dueceside-left</h2>
        <p>{posi[2]}</p>
        <p>{Math.floor((posi[2] / len) * 100)}%</p>
        <h2>adside-right</h2>
        <p>{posi[3]}</p>
        <p>{Math.floor((posi[3] / len) * 100)}%</p>
        <h2>adside-center</h2>
        <p>{posi[4]}</p>
        <p>{Math.floor((posi[4] / len) * 100)}%</p>
        <h2>adside-right</h2>
        <p>{posi[5]}</p>
        <p>{Math.floor((posi[5] / len) * 100)}%</p>
      </div>
    </div>
  );
};

export default BounceGraph;
