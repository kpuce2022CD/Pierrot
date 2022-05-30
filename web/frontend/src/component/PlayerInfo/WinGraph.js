const WinGraph = () => {
  const tempData = [
    {
      date: "2022-01-01",
      score: "10",
      win: true,
    },
    {
      date: "2022-01-02",
      score: "11",
      win: true,
    },
    {
      date: "2022-01-02",
      score: "13",
      win: false,
    },
    {
      date: "2022-01-03",
      score: "20",
      win: true,
    },
    {
      date: "2022-01-04",
      score: "2",
      win: false,
    },
  ];
  const [chartData, setChartData] = useState({ datasets: [] });
  const [chartOptions, setChartOptions] = useState({});
  const chart = () => {};
};
