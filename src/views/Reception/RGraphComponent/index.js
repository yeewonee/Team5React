import React, { PureComponent } from 'react';
import { Area, AreaChart, CartesianGrid, ReferenceLine, Tooltip, XAxis, YAxis } from "recharts";
import { ResponsiveContainer } from "recharts";
import style from './rgraph.module.css';
import getGraphData from './data';

function RGraph(props) { 
    return (
      <>
        <div className={style.label}> 
          <h5>&nbsp;요일대별 예약현황</h5> 
        </div>
        <ResponsiveContainer width="100%" height={206}>
        <AreaChart data={getGraphData()}
          margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
          <XAxis dataKey="name" />
          <YAxis />
          <CartesianGrid strokeDasharray="3 3" />
          <Tooltip />
          <ReferenceLine x="Page C" stroke="green" label="Min PAGE" />
          <Area type="monotone" dataKey="예약 환자 수" stroke="#82ca9d" fill="#82ca9d" />
        </AreaChart>
      </ResponsiveContainer>
      </>
    );
  }

export default RGraph;


