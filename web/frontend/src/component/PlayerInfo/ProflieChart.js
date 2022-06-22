import moment from "moment";
import "./ProfileChart.css";

import { useEffect, useState, useRef } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
  Title,
} from "chart.js";
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
const ProfileChart = ({ date }) => {
  const [chartData, setChartData] = useState({ datasets: [] });
  const [chartOptions, setChartOptions] = useState({});
  const chartReference = useRef();
  const [month, setMonth] = useState(moment(date).format("MM"));

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
      labels: ["전적"],
      datasets: [
        {
          type: "bar",
          label: "win",
          borderColor: "rgba(255, 99, 132, 0.2)",
          backgroundColor: "rgb(255, 99, 132)",
          borderWidth: 2,
          data: [tmpdate[+month][0]],
        },
        {
          type: "bar",
          label: "lose",
          borderColor: "rgb(233, 129, 56)",
          backgroundColor: "rgba(255, 159, 64, 0.2)",
          borderWidth: 2,
          data: [tmpdate[+month][1]],
        },
      ],
    });
    setChartOptions({
      indexAxis: "y",
      scales: {
        x: {
          display: false,
          stacked: true,
        },
        y: {
          stacked: true,
        },
      },
    });
  };

  useEffect(() => {
    chart();
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
      </div>
      <Bar
        className="profile-bar-chart"
        width={"30%"}
        height={"10%"}
        data={chartData}
        options={chartOptions}
      />
    </>
  );
};

export default ProfileChart;
