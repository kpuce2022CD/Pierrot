import h337 from "heatmap.js";
import { useEffect } from "react";
import "heatmap.js";
import Layout from "../../Layout/Layout";
import "./Graph.css";

const Graph = () => {
  // now generate some random data
  let points = [];
  let max = 0;
  let width = 450;
  let height = 271;
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
  useEffect(() => {
    let heatmapInstance = h337.create({
      container: document.querySelector(".heatmap"),
      opacity: "0.9",
    });
    console.log(data);
    heatmapInstance.setData(data);
  }, []);
  return (
    <div className="grapy">
      <Layout>
        <div className="heatmap">ddddddddddd</div>
      </Layout>
    </div>
  );
};

export default Graph;
