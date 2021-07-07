import React, { useEffect, useState } from "react";
import style from "./InspectState.module.css";
import classNames from "classnames/bind";
import { Doughnut } from "react-chartjs-2";
import Clock from 'react-live-clock'
import { useSelector } from "react-redux";

const cx =  classNames.bind(style);


function InspectState(props) {

  const patientList = props.data;
  // const row1=patientList.filter((value)=>value.total_i_status === '대기')
  // const row2=patientList.filter((value)=>value.total_i_status === '진행중')
  // const row3=patientList.filter((value)=>value.total_i_status === '완료');
  const [readyRow, setReadyRow] = useState([])
  const [proceedRow,setProceedRow]=useState([])
  const [completeRow,setCompleteRow]=useState([])
  //환자 검사 상태 카운트 

  useEffect(() => {
    let row1=patientList.filter((value)=>value.totalIstatus === '대기')
    let row2=patientList.filter((value)=>value.totalIstatus === '진행중')
    let row3=patientList.filter((value)=>value.totalIstatus === '완료');
    setReadyRow(row1)
    setProceedRow(row2);
    setCompleteRow(row3)
  }, [patientList])

  const state = useSelector(state => state.inspectReducer.patient);
  useEffect(() => {
  let arr1=patientList.filter((value)=>value.totalIstatus === '대기')
  let arr2=patientList.filter((value)=>value.totalIstatus === '진행중')
  let arr3=patientList.filter((value)=>value.totalIstatus === '완료');
    setReadyRow(arr1)
    setProceedRow(arr2);
    setCompleteRow(arr3)
  }, [patientList, state.tstatus])
 
  
  const count ={
    ready:readyRow.length,
    proceed:proceedRow.length,
    complete:completeRow.length
  }

  const expData = {
    datasets: [
      {
        data: [count.ready, count.proceed, count.complete],
        backgroundColor: [
          "rgb(255, 99, 132)",
          "rgb(54, 162, 235)",
          "rgb(255, 205, 86)",
        ],
        hoverOffset: 2,
      },
    ],
  };
  
  
  return (
    <div>
      <div className={cx(style.idate)}>
        <Clock format={'YYYY년 MM월 DD일 HH:mm:ss'} ticking={true} />
      </div>
      <div style={{ display: "flex" }}>
        <div className="doughnut" style={{ width: "50%" }}>
          <Doughnut
            data={expData}
            width={340}
            height={160}
            options={{
              maintainAspectRatio: false,
              animation:false
            }}
          />
        </div>
        <div className={cx(style.doughnut_data)}>
          <div className={cx(style.ready1)} style={{ display: "flex" }}>
            <div className={cx(style.box)} style={{ backgroundColor: "rgb(255, 99, 132)" }}></div>
            <div style={{ marginRight: "80px", fontSize: "16px", fontWeight: "bold" }}>대기</div>
            <div style={{ fontSize: "16px", color: "#339af0", fontWeight: "bold" }}>{count.ready}건</div>
          </div>
          <div className={cx(style.ready2)} style={{ display: "flex" }}>
            <div className={cx(style.box)} style={{ backgroundColor: "rgb(54, 162, 235)" }}></div>
            <div style={{ marginRight: "68px", fontSize: "16px", fontWeight: "bold" }}>진행중</div>
            <div style={{ fontSize: "16px", color: "#339af0", fontWeight: "bold" }}>{count.proceed}건</div>
          </div>
          <div className={cx(style.ready3)} style={{ display: "flex" }}>
            <div className={cx(style.box)} style={{ backgroundColor: "rgb(255, 205, 86)" }}></div>
            <div style={{ marginRight: "80px", fontSize: "16px", fontWeight: "bold" }}>완료</div>
            <div style={{ fontSize: "16px", color: "#339af0", fontWeight: "bold" }}>{count.complete}건</div>
          </div>
        </div>
      </div>
      <hr/>
    </div>
  );
}

export default React.memo(InspectState);
