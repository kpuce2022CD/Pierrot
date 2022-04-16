import React from 'react'; 
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, } from 'recharts'


const data = [ { 
    name: '1세트',
    uv: 4000, 
    pv: 2400, 
    amt: 2400, 
},{
    name: '2세트',
    uv: 4000, 
    pv: 2400, 
    amt: 2400,  
},
{
    name: '3세트',
    uv: 4000, 
    pv: 2400, 
    amt: 2400,  
},{
    name: '4세트',
    uv: 4000, 
    pv: 2400, 
    amt: 2400,  
},{
    name: '5세트',
    uv: 4000, 
    pv: 2400, 
    amt: 2400,  
}];
const renderLineChart = (
     <LineChart 
     width={600} 
     height={300} 
     data={data} 
     margin={{ top: 5, right: 20, bottom: 5, left: 0 }} > 
     <Line  //상대
     type="monotone" 
     dataKey="pv" 
     stroke="#8884d8" 
     activeDot={{ r: 8 }} /> 
     <Line // 나
     type="monotone" 
     dataKey="uv"
     stroke="#82ca9d" /> 

     <CartesianGrid //보조선
     stroke="#ccc" 
     strokeDasharray="5 5" /> 
     <XAxis dataKey="name" /> 
     <YAxis /> 
     <Tooltip />
      </LineChart> ); 
      const ChartInteraction = () => {
           return <div>{renderLineChart}</div>; }; 
           export default ChartInteraction;

