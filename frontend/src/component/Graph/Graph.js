import h337 from "heatmap.js";
import { useEffect } from "react";
import "heatmap.js";

const Graph = () => {
  // if you have a set of datapoints always use setData instead of addData
  // for data initialization

  useEffect(() => {
    // minimal heatmap instance configuration
    let heatmapInstance = h337.create({
      // only container is required, the rest will be defaults
      container: document.querySelector(".TEST"),
    });

    // now generate some random data
    let points = [];
    let max = 0;
    let width = 840;
    let height = 400;
    let len = 200;

    while (len--) {
      let val = Math.floor(Math.random() * 100);
      max = Math.max(max, val);
      let point = {
        x: Math.floor(Math.random() * width),
        y: Math.floor(Math.random() * height),
        value: val,
      };
      points.push(point);
    }
    // heatmap data format
    let data = {
      max: max,
      data: points,
    };
    console.log("heatmapinstance");
    heatmapInstance.setData(data);
  }, []);
  return <div className="TEST">sdsa</div>;
};

export default Graph;

// import React, { useEffect } from "react";
// import ReactDOM from "react-dom";
// import h337 from "heatmap.js";
// function App() {
//   useEffect(() => {
//     var heatmapInstance = h337.create({
//       // only container is required, the rest will be defaults
//       container: document.querySelector(".App"),
//     }); // now generate some random data
//     var points = [];
//     var max = 0;
//     var width = 840;
//     var height = 400;
//     var len = 200;
//     while (len--) {
//       var val = Math.floor(Math.random() * 100);
//       max = Math.max(max, val);
//       var point = {
//         x: Math.floor(Math.random() * width),
//         y: Math.floor(Math.random() * height),
//         value: val,
//       };
//       points.push(point);
//     } // heatmap data format
//     var data = { max: max, data: points }; // if you have a set of datapoints always use setData instead of addData // for data initialization
//     heatmapInstance.setData(data);
//   });
//   return (
//     <div className="App">
//       {" "}
//       <h1>Hello CodeSandbox</h1>{" "}
//       <h2>Start editing to see some magic happen!</h2>{" "}
//     </div>
//   );
// }
// const rootElement = document.getElementById("root");
// ReactDOM.render(<App />, rootElement);
