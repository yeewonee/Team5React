import React, { PureComponent } from 'react';
import { Area, AreaChart, CartesianGrid, ReferenceLine, Tooltip, XAxis, YAxis } from "recharts";
import { ResponsiveContainer } from "recharts";
import style from './rgraph.module.css';

const data = [
  {
    name: '월', "예약 환자 수": 40
  },
  {
    name: '화', "예약 환자 수": 30
  },
  {
    name: '수', "예약 환자 수": 20
  },
  {
    name: '목', "예약 환자 수": 27
  },
  {
    name: '금', "예약 환자 수": 18
  },
  {
    name: '토', "예약 환자 수": 23
  }
]

function RGraph(props) { 
    return (
      <>
        <div className={style.label}> 
          <h5>&nbsp;요일대별 예약현황</h5> 
        </div>
        <ResponsiveContainer width="100%" height={206}>
        <AreaChart data={data}
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


