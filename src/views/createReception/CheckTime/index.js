import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createSetTime } from "redux/createReception-reducer";
import { getReceptionDate } from "./data";
import style from "./style.module.css";

function CheckTime(props) {
  const time = useSelector((state) => {
    return state.createReceptionReducer.time
  })

  const dispatch = useDispatch();

  const handleRadio = (event) => {
    if(event.target.checked){
     dispatch(createSetTime(event.target.value));
    }
  };

  const state =[
    {time: '9:00'},
    {time: '9:30'},
    {time: '10:00'},
    {time: '10:30'},
    {time: '11:00'},
    {time: '11:30'},
    {time: '12:00'},
    {time: '14:00'},
    {time: '14:30'},
    {time: '15:00'},
    {time: '15:30'},
    {time: '16:00'},
    {time: '방문접수'}
  ]

  const doctor_id = useSelector((state) => {
    return state.createReceptionReducer.doctor_id
  });
  const r_date = useSelector((state) => {
    return state.createReceptionReducer.date
  });

  const receptionList = getReceptionDate(doctor_id, r_date);
  console.log(receptionList);

  let resultTime = [];
  for(let i=0; i<receptionList.length; i++){
    resultTime.push(receptionList[i].r_time)
  }

  let todayState = state;

  if(resultTime.length !== 0){
    for(let k=0; k<todayState.length; k++){
        todayState = todayState.filter(List => List.time !== resultTime[k]);
      }
    }
    // for(let j=0; j<resultTime.length; j++) {
    //   for(let k=0; k<todayState.length; k++){
    //     if(resultTime[j] === todayState[k].time){
    //       todayState[k].active = false
    //     }
    //   }
    // }


  return(
    <div className={style.time_box}>
      <div style={{marginTop:'20px', marginLeft:'19px'}}>
        <div className={style.radios}>
          {todayState.map((List, index) =>(
              <label key={index} style={{backgroundColor: List.time===time ? '#006edc' : ''}}>
              <input type="radio" name="time" value={List.time} checked={List.time===time} onChange={handleRadio}/>
              {List.time}
              </label>
          ))}
        </div>
      </div>
    </div>
  );
}


export default CheckTime;