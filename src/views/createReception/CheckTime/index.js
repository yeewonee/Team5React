import { useDispatch, useSelector } from "react-redux";
import { createSetTime } from "redux/createReception-reducer";
import style from "./style.module.css";
import axios from "axios";
import { useEffect, useState } from "react";
import { getReceptionListByDoctor } from "../data";
axios.defaults.baseURL = "http://localhost:8080";

function CheckTime(props) {
  const [receptionList, setReceptionList] = useState([]);
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
    {time: "09:00"},
    {time: "09:30"},
    {time: "10:00"},
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

  const getList = async() => {
    try{
      const result = await getReceptionListByDoctor(doctor_id, r_date);
      setReceptionList(result.data);
    } catch(error){
      console.log(error);
    }
  };

  useEffect(() => {
    getList();
  },[doctor_id, r_date]);

   let resultTime = [];

    for(let i=0; i<receptionList.length; i++){ //예약된 리스트의 길이만큼 for문을 돌면서 시간만 배열에 담아줌
      resultTime.push(receptionList[i].rTime)
    }


  console.log(resultTime);
  let todayState = state;

  if(resultTime.length !== 0){
    for(let k=0; k<todayState.length; k++){
        todayState = todayState.filter(List => List.time !== resultTime[k]);
      }
    }

  return(
    <div className={style.time_box}>
      <div style={{marginTop:'20px', marginLeft:'19px'}}>
        <div className={style.radios}>
          {todayState.map((List, index) =>(
              <label key={index} style={{backgroundColor: List.time===time ? '#a5d8ff' : ''}}>
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