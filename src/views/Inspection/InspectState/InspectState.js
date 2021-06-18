import React from "react";
import style from "./InspectState.module.css";
import classNames from "classnames/bind";
import { Doughnut } from "react-chartjs-2";
import Clock from 'react-live-clock'

const cx =  classNames.bind(style);

const expData = {
  
  datasets: [
    {
      data: [37, 13, 2],
      backgroundColor: [
        "rgb(255, 99, 132)",
        "rgb(54, 162, 235)",
        "rgb(255, 205, 86)",
      ],
      hoverOffset: 2,
    },
  ],
};

function InspectState(props) {
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
            }}
          />
        </div>
        <div className={cx(style.doughnut_data)}>
          <div className={cx(style.ready1)} style={{ display: "flex" }}>
            <div className={cx(style.box)} style={{ backgroundColor: "rgb(255, 99, 132)" }}></div>
            <div style={{ marginRight: "80px", fontSize: "16px", fontWeight: "bold" }}>대기</div>
            <div style={{ fontSize: "16px", color: "#339af0", fontWeight: "bold" }}>13건</div>
          </div>
          <div className={cx(style.ready2)} style={{ display: "flex" }}>
            <div className={cx(style.box)} style={{ backgroundColor: "rgb(54, 162, 235)" }}></div>
            <div style={{ marginRight: "74px", fontSize: "16px", fontWeight: "bold" }}>진행중</div>
            <div style={{ fontSize: "16px", color: "#339af0", fontWeight: "bold" }}>2건</div>
          </div>
          <div className={cx(style.ready3)} style={{ display: "flex" }}>
            <div className={cx(style.box)} style={{ backgroundColor: "rgb(255, 205, 86)" }}></div>
            <div style={{ marginRight: "80px", fontSize: "16px", fontWeight: "bold" }}>완료</div>
            <div style={{ fontSize: "16px", color: "#339af0", fontWeight: "bold" }}>13건</div>
          </div>
        </div>
      </div>
      <hr/>
    </div>
  );
}

export default InspectState;
