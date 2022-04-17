import React, { useRef, useEffect } from "react";
import { Chart } from "react-chartjs-2";


    const barChartData = { 
        labels: ["역대 전적 승률", "서브 평균속도", "총 점수", "서브 성공률", "역대 이동거리"],
        datasets: [//임시로 넣은 데이터 상대와 나 비교해서 넣을방법 구색
            {
            label: "나",
            stack: "Stack 0",
            backgroundColor: "#d41111",
            data: [56, '98km', 250, '87%', '1435m'],
            },
            {
            label: "상대",
            stack: "Stack 0",
            backgroundColor: "#3765b0",
            data: [44, '103km', 150, '%', '1503m'].map((k) => -k),
            },
        ],
};


const GameStackChart = () => {
    new Chart(document.getElementById("bar-chart-horizontal"), {
        type: 'horizontalBar',
        data: barChartData,
        options: {
            indexAxis : 'y',
          legend: { display: false },
          title: {
            display: true,
            text: '경기 스텟 비교 분석'
          }
        }
    });
}



        export { GameStackChart };
