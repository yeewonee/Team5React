import React, { PureComponent } from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';
import style from './rgraph.module.css';

const data = [
  {
    name: '09~10', "예약 환자 수": 40
  },
  {
    name: '10~11', "예약 환자 수": 30
  },
  {
    name: '11~12', "예약 환자 수": 20
  },
  {
    name: '14~15', "예약 환자 수": 27
  },
  {
    name: '15~16', "예약 환자 수": 18
  },
  {
    name: '16~17', "예약 환자 수": 23
  },
  {
    name: '17~18', "예약 환자 수": 34
  },
];

export default class RGraph extends PureComponent {

  render() {  
    return (
      <>
        <div className={style.label}> 
          <h5>&nbsp;금일 시간대별 예약현황</h5> 
        </div>
        <div className={style.width}>
          <LineChart className={style.graph}
            style={{width:'100%'}}
            width={1300}
            height={207}
            data={data}
            margin={{
              top: 20, bottom: 5, right:30
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="예약 환자 수" stroke="#82ca9d"/>
          </LineChart>
          </div>
      </>
    );
  }
}