import { Doughnut } from 'react-chartjs-2';
import style from './donut.module.css';
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from 'react';
import { getCountReception } from "apis/reception";
import { Loading } from "../../../Loading";


function RDonut(props){
  const day = useSelector((state) => {
    return state.receptionReducer.day;
  });
  // 접수대기,완료 카운트
  const [countNum, setcountNum] = useState([]);
  const [loading, setLoading] = useState(null);  
  
  const dListFunc = async(day) => {
    setLoading(true);
    try{
      const count = await getCountReception(day);
      let data = [0,0];
      data[0] = count.data[0];
      data[1] = count.data[1];
      setcountNum(data)
      setLoading(false);      
    }catch(error){
      console.log(error)
    }
  }

  useEffect(() => {
    dListFunc(day);
  }, [day, props.cBoolean, props.comBoolean, props.message]);

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
    {loading ? <div><div style={{marginLeft:"43%", marginTop:"20%"}}><Loading height={90} width={90}/></div> <p style={{marginLeft:"46%"}}>Loding...</p></div> 
    :
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
    }
  </div>
  );
}

export default RDonut;


