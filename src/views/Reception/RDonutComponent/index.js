import { Doughnut } from 'react-chartjs-2';
import style from './donut.module.css';
import getDonutData from './data';
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from 'react';
import axios from "axios";
axios.defaults.baseURL = "http://localhost:8080";

function RDonut(props){
  const day = useSelector((state) => {
    return state.receptionReducer.day;
  });
  // 접수대기,완료 카운트
  const [countNum, setcountNum] = useState([]);
  
  useEffect(() => {
    const dListFunc = async(day) => {
      const count = await axios.get("/reception/countReception", {params:{day:day}});
      let data = [0,0];
      data[0] = count.data[0];
      data[1] = count.data[1];
      setcountNum(data)        
    }
    dListFunc(day)
  }, [day, props.cBoolean, props.comBoolean]);

  console.log(countNum)

  const expData = {
    datasets: [
      {
        data: countNum,
        backgroundColor: [
          "orange",
          "skyblue"
        ],
        hoverOffset: 2,
      },
    ],
  };
  
  return(
    <div>
    {countNum[0] === 0 && countNum[1] === 0 ? 
    (
      <div className={style.donut}>
        <div className={style.nocontent}>현재 접수중인 환자가 없습니다.</div>
        <div className={style.span1}>
            <div className={style.square1}></div><div>&nbsp;접수 대기 : {countNum[0]}</div>
        </div>
        <div className={style.span1}>
            <div className={style.square2}></div><div>&nbsp;접수 완료 : {countNum[1]}</div>
        </div>
      </div>
    ) 
    : 
    (
      <div className={style.donut}>
        <Doughnut
            data={expData}
            width={340}
            height={160}
            options={{
              maintainAspectRatio: false,
              animation:true
            }}
          />
        <div className={style.span1}>
            <div className={style.square1}></div><div>&nbsp;접수 대기 : {countNum[0]}</div>
        </div>
        <div className={style.span1}>
            <div className={style.square2}></div><div>&nbsp;접수 완료 : {countNum[1]}</div>
        </div>
      </div>
    )}
  </div>
  );
}

export default RDonut;


