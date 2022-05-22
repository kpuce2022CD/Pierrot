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
const BounceGraph = () => {
  const playerTopData = require("../../tempData/csvjson.json");

  const frontPoint = [];
  const backPoint = [];
  const frontPlayer = [];
  const backPlayer = [];
  // 임시데이터
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
      y: parseInt(data[0]) + data[3] * 0.001,
      r: 10,
    };
    if (data[2].includes("front")) {
      point.x += 0.1 * (i + 1);
      frontPoint.push(point);
    } else {
      point.x += 0.1 * (i + 1);
      backPoint.push(point);
    }
  });
  // console.log(bounceJsonData);

  const bounceIndex = bounceJsonData.map((e) => e[3]);
  // 임시데이터

  // 바운드 했을 당시 두 선수들의 위치 저장
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

  // console.log("frontplayer", frontPlayer);
  // console.log("backplayer", backPlayer);
  // console.log("frontPoint", frontPoint);
  // console.log("backPoint", backPoint);

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
          max: 730,
          min: 300,
        },
        x: {
          display: false,
          max: 1700,
          min: 200,
        },
      },
      onClick: (evt, e) => {
        // 클릭시 상대 두 선수들의 위치 보여줌
        console.log("e", e);
        const bounceChart = chartReference.current;
        const index = e[0]?.index;
        if (index === undefined || e[0].datasetIndex >= 2) {
          return;
        }
        // console.log(index, e[0].datasetIndex);
        // console.log(bounceChart.data.datasets[2].data);

        // 바운스 순서 구하기
        const tmp =
          bounceChart.data.datasets[e[0].datasetIndex].data[index].x % 1 === 0
            ? null
            : (
                bounceChart.data.datasets[e[0].datasetIndex].data[index].x % 1
              ).toFixed(1) * 10;
        console.log("tmp: ", tmp);

        // 모든 원소 반지름 0으로
        for (let i = 2; i < 4; i++) {
          for (let j = 0; j < bounceChart.data.datasets[i].data.length; j++) {
            bounceChart.data.datasets[i].data[j].r = 0;
          }
        }
        // 특정 원소 반지름 10으로
        for (let i = 2; i < 4; i++) {
          const chart = bounceChart.data.datasets[i].data;
          for (let j = 0; j < chart.length; j++) {
            const yy =
              chart[j].y % 1 === 0 ? null : (chart[j].y % 1).toFixed(1) * 10;
            // console.log("yy", yy, chart[j]);
            if (yy == tmp) {
              bounceChart.data.datasets[i].data[yy - 1].r = 10;
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
            // console.log(value);
            return value.x % 1 === 0 ? null : (value.x % 1).toFixed(1) * 10;
          },
        },
      },
    });
  };

  useEffect(() => {
    chart();
  }, []);
  return (
    <div className="bounce">
      <Bubble
        ref={chartReference}
        data={chartData}
        options={chartOptions}
        width={450}
        height={271}
      />
    </div>
  );
};

export default BounceGraph;
