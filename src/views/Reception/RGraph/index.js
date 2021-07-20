import React, { PureComponent, useEffect, useState } from 'react';
import { Area, AreaChart, CartesianGrid, ReferenceLine, Tooltip, XAxis, YAxis } from "recharts";
import { ResponsiveContainer } from "recharts";
import style from './rgraph.module.css';
import moment from 'moment';
import { Loading } from "../../../Loading";
import { getCountDay } from "apis/reception";
import { useSelector } from 'react-redux';


function RGraph(props) { 
  const day = useSelector((state) => {
    return state.receptionReducer.day;
  });
  const setRDay = useSelector((state) => {
    return state.receptionReducer.Rday;
  });
  const [result, setResult] = useState([]);
  const [loading, setLoading] = useState(null);  
  
  const graphFunc = async(day) => {      
    setLoading(true);
    try{
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
          result = await getCountDay(day, rDay6, rDay7, rDay8, rDay9, rDay10);
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
          result = await getCountDay(rDay1, day, rDay6, rDay7, rDay8, rDay9);
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
          result = await getCountDay(rDay2, rDay1, day, rDay6, rDay7, rDay8);
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
          result = await getCountDay(rDay3, rDay2, rDay1, day, rDay6, rDay7);
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
          result = await getCountDay(rDay4, rDay3, rDay2, rDay1, day, rDay6);
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
          result = await getCountDay(rDay5, rDay4, rDay3, rDay2, rDay1, day);
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
      setLoading(false); 
    }catch(error){
      console.log(error);
    }
  }

  useEffect(() => {
    graphFunc(day);
  }, [day, props.message]);

    return (
      <>
        <div className={style.label}> 
          <h5>&nbsp;요일대별 예약현황</h5> 
        </div>
        <ResponsiveContainer width="100%" height={206}>
        {loading ? <div><div style={{marginLeft:"45%", width:"1%", paddingTop:"5%"}}><Loading height={90} width={90}/></div><p style={{marginLeft:"46.5%"}}>Loding...</p></div> 
        :
        <AreaChart data={result}
          margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
          <XAxis dataKey="name" />
          <YAxis />
          <CartesianGrid strokeDasharray="3 3" />
          <Tooltip />
          <ReferenceLine x="Page C" stroke="green" label="Min PAGE" />
          <Area type="monotone" dataKey="예약 환자 수" stroke="#82ca9d" fill="#82ca9d" />
        </AreaChart>
        }
      </ResponsiveContainer>
      </>
    );
  }

export default RGraph;


