import React, { PureComponent, useEffect, useState } from 'react';
import { Area, AreaChart, CartesianGrid, ReferenceLine, Tooltip, XAxis, YAxis } from "recharts";
import { ResponsiveContainer } from "recharts";
import style from './rgraph.module.css';
import axios from "axios";
import moment from 'moment';
import { useSelector } from 'react-redux';
axios.defaults.baseURL = "http://localhost:8080";

function RGraph(props) { 
  const day = useSelector((state) => {
    return state.receptionReducer.day;
  });
  const setRDay = useSelector((state) => {
    return state.receptionReducer.Rday;
  });
  const [result, setResult] = useState([]);
  useEffect(() => {    
    const graphFunc = async(day) => {      
      const rDay1 = moment(day).add(-1,'days').format('YYYY-MM-DD');
      const rDay2 = moment(day).add(-2,'days').format('YYYY-MM-DD');
      const rDay3 = moment(day).add(-3,'days').format('YYYY-MM-DD');
      const rDay4 = moment(day).add(-4,'days').format('YYYY-MM-DD');      
      const rDay5 = moment(day).add(-5,'days').format('YYYY-MM-DD');     
      const rDay6 = moment(day).add(1,'days').format('YYYY-MM-DD');
      const rDay7 = moment(day).add(2,'days').format('YYYY-MM-DD');
      const rDay8 = moment(day).add(3,'days').format('YYYY-MM-DD');
      const rDay9 = moment(day).add(4,'days').format('YYYY-MM-DD');
      const rDay10 = moment(day).add(5,'days').format('YYYY-MM-DD');
      let result ="";
      switch(setRDay){
        case 1:
          result = await axios.get("/reception/countDay", {params:{day:day, day1:rDay6, day2:rDay7, day3:rDay8, day4:rDay9, day5:rDay10}});
          setResult([
            {name: '월', "예약 환자 수": result.data[0]},
            {name: '화', "예약 환자 수": result.data[1]},
            {name: '수', "예약 환자 수": result.data[2]},
            {name: '목', "예약 환자 수": result.data[3]},
            {name: '금', "예약 환자 수": result.data[4]},
            {name: '토', "예약 환자 수": result.data[5]}
          ])
          break;
        case 2:
          result = await axios.get("/reception/countDay", {params:{day:rDay1, day1:day, day2:rDay6, day3:rDay7, day4:rDay8, day5:rDay9}});
          setResult([
            {name: '월', "예약 환자 수": result.data[0]},
            {name: '화', "예약 환자 수": result.data[1]},
            {name: '수', "예약 환자 수": result.data[2]},
            {name: '목', "예약 환자 수": result.data[3]},
            {name: '금', "예약 환자 수": result.data[4]},
            {name: '토', "예약 환자 수": result.data[5]}
          ])
          console.log("그래프 값 :")
          console.log(result.data)    
          break;
        case 3:
          result = await axios.get("/reception/countDay", {params:{day:rDay2, day1:rDay1, day2:day, day3:rDay6, day4:rDay7, day5:rDay8}});
          setResult([
            {name: '월', "예약 환자 수": result.data[0]},
            {name: '화', "예약 환자 수": result.data[1]},
            {name: '수', "예약 환자 수": result.data[2]},
            {name: '목', "예약 환자 수": result.data[3]},
            {name: '금', "예약 환자 수": result.data[4]},
            {name: '토', "예약 환자 수": result.data[5]}
          ])
          break;
        case 4:
          result = await axios.get("/reception/countDay", {params:{day:rDay3, day1:rDay2, day2:rDay1, day3:day, day4:rDay6, day5:rDay7}});
          setResult([
            {name: '월', "예약 환자 수": result.data[0]},
            {name: '화', "예약 환자 수": result.data[1]},
            {name: '수', "예약 환자 수": result.data[2]},
            {name: '목', "예약 환자 수": result.data[3]},
            {name: '금', "예약 환자 수": result.data[4]},
            {name: '토', "예약 환자 수": result.data[5]}
          ])
          break;
        case 5:
          result = await axios.get("/reception/countDay", {params:{day:rDay4, day1:rDay3, day2:rDay2, day3:rDay1, day4:day, day5:rDay6}});
          setResult([
            {name: '월', "예약 환자 수": result.data[0]},
            {name: '화', "예약 환자 수": result.data[1]},
            {name: '수', "예약 환자 수": result.data[2]},
            {name: '목', "예약 환자 수": result.data[3]},
            {name: '금', "예약 환자 수": result.data[4]},
            {name: '토', "예약 환자 수": result.data[5]}
          ])
          break;
        case 6:
          result = await axios.get("/reception/countDay", {params:{day:rDay5, day1:rDay4, day2:rDay3, day3:rDay2, day4:rDay1, day5:day}});
          setResult([
            {name: '월', "예약 환자 수": result.data[0]},
            {name: '화', "예약 환자 수": result.data[1]},
            {name: '수', "예약 환자 수": result.data[2]},
            {name: '목', "예약 환자 수": result.data[3]},
            {name: '금', "예약 환자 수": result.data[4]},
            {name: '토', "예약 환자 수": result.data[5]}
          ])
          break;   
        default:  
          break;
      }
    }
    graphFunc(day)
  }, [day])  

    return (
      <>
        <div className={style.label}> 
          <h5>&nbsp;요일대별 예약현황</h5> 
        </div>
        <ResponsiveContainer width="100%" height={206}>
        <AreaChart data={result}
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


