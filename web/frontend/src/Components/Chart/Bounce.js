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

//props{
//  player: Array<{x:number, y:number}>
// player2:Array<{x:number, y:nuber}>
// data:Array<[x, y, posiiton, frame]>
// }
const Bounce = (props) => {
  console.log("!!!!!props", props, Object.keys(props).length);

  const playerTopData = props.player;
  const player2 = props.player2;

  const [bounceposition, setBounceposition] = useState([]);
  const [chartData, setChartData] = useState({ datasets: [] });
  const [chartOptions, setChartOptions] = useState({});
  const [posi, setPosi] = useState([]);
  const [len, setLen] = useState(0);
  const chartReference = useRef();

  const frontPoint = [];
  const backPoint = [];
  const frontPlayer = [];
  const backPlayer = [];
  // 임시데이터 -> id 기반으로 가져와야함
  const pos = new Array(6).fill(0);
  // due 0,1,2 adside 3,4,5
  // r c l

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
    const bounceIndex = bounceJsonData.map((e) => e[3]);
    // 임시데이터

    // 바운드 했을 당시 두 선수들의 위치 저장
    bounceIndex.forEach((v, i) => {
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
        const bounceChart = chartReference.current;
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
            return value.x % 1 === 0 ? null : (value.x % 1).toFixed(1) * 10;
          },
        },
      },
    });
  };

  useEffect(() => {
    saveDate();
    chart();
  }, [props]);
  if (Object.keys(props).length === 0) {
    console.log("!!");
    return <div></div>;
  }
  return (
    <div className="bounce-chart">
      <Bubble
        ref={chartReference}
        data={chartData}
        options={chartOptions}
        width={"450px"}
        height={"271px"}
      />
    </div>
  );
};

export default Bounce;
