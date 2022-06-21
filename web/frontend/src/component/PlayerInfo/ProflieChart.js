import moment from "moment";
import "./ProfileChart.css";

import { useEffect, useState, useRef } from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, Tooltip, Legend, Title } from "chart.js";
import Chart from "chart.js/auto";
ChartJS.register(Tooltip, Legend, Title);
const ProfileChart = ({ date }) => {
  const [chartData, setChartData] = useState({ datasets: [] });
  const [chartOptions, setChartOptions] = useState({});
  const [month, setMonth] = useState(moment(date).format("MM"));

  // 임시 데이터 -> 월마다 이긴횟수와 진 회수
  const tmpdate = [
    [1, 5],
    [2, 4],
    [3, 3],
    [1, 5],
    [2, 4],
    [3, 3],
    [1, 5],
    [2, 4],
    [3, 3],
    [1, 5],
    [2, 4],
    [3, 3],
  ];
  const chart = () => {
    setChartData({
      labels: ["win", "lose"],
      datasets: [
        {
          backgroundColor: ["rgba(255, 99, 132)", "rgba(255, 159, 64)"],
          data: [tmpdate[+month][0], tmpdate[+month][1]],
        },
      ],
    });
    setChartOptions({
      plugins: {
        legend: {
          display: false,
        },
      },
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        x: {
          display: false,
        },
        y: {
          display: false,
        },
      },
    });
  };

  useEffect(() => {
    chart();
    console.log(chartOptions);
  }, []);

  useEffect(() => {
    setMonth(moment(date).format("MM"));
  }, [date]);

  useEffect(() => {
    chart();
  }, [month]);

  return (
    <>
      <div className="profile-chart-title">
        {moment(date).format("YYYY년 MM월")}
        <p>win / lose</p>
      </div>
      <Doughnut
        width={"fit-content"}
        height={"5%"}
        className="profile-doughnut-chart"
        data={chartData}
        options={chartOptions}
      />
    </>
  );
};

export default ProfileChart;
