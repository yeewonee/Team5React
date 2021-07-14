import { useDispatch, useSelector } from "react-redux";
import { createSetTime } from "redux/createReception-reducer";
import style from "./style.module.css";
import axios from "axios";
import { useEffect, useState } from "react";
import { getReceptionListByDoctor } from "apis/createReception";
import moment from "moment";

function CheckTime(props) {
  const dispatch = useDispatch();
  const [receptionList, setReceptionList] = useState([]);
  
  const time = useSelector((state) => {
    return state.createReceptionReducer.time
  });
  const doctor_id = useSelector((state) => {
    return state.createReceptionReducer.doctor_id
  });
  const r_date = useSelector((state) => {
    return state.createReceptionReducer.date
  });

  const timeList =[ //병원 예약 가능한 시간 목록 (30분 간격)
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

  let today = new Date();

  const handleRadio = (event) => { //시간 선택하면
    if(event.target.checked){
     dispatch(createSetTime(event.target.value)); //리덕스에 선택한 시간 넣어줌
    }
  };

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

  let todayTimeList = timeList;

  if(resultTime.length !== 0){
    for(let k=0; k<todayTimeList.length; k++){
      todayTimeList = todayTimeList.filter(List => List.time !== resultTime[k]);
      }
    }
    
  let test = [];
  if(moment(today).format('YYYY-MM-DD')===r_date){ //오늘 날짜는 현재시간 이전 예약시간 지워줘야함!
      
    for(let m=0; m<todayTimeList.length; m++){
      var strArray = todayTimeList[m].time.split(":")
      if(today.getHours()>strArray[0]){ //현재 시간보다 이전인 예약시간 담고
        test.push(strArray[0]+":"+strArray[1])
      }
      if(today.getHours()==strArray[0]){ //현재랑 시간이 같다면
        if(today.getMinutes()>=strArray[1]){ // 분을 비교해서 현재 분보다 이전 시간을 test배열에 담아줌
          test.push(strArray[0]+":"+strArray[1])
        }
      }
    }
  
    for(let a=0; a<test.length; a++){
      todayTimeList = todayTimeList.filter(List => List.time !== test[a]); //test배열에 담겨져 있는 현재시간 기준 이전예약시간은 지워줌
    }
  }

  return(
    <div className={style.time_box}>
      <div style={{marginTop:'20px', marginLeft:'19px'}}>
        <div className={style.radios}>
          {todayTimeList.map((List, index) =>(
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