import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { createSetMemoAction } from "redux/diagnosis-reducer";
import { getTime } from "../data";
import style from "./memo.module.css";

export const Memo = () => {
  const dispatch = useDispatch();
  const handleChange = (event) => {
    dispatch(createSetMemoAction(event.target.value));
  };

  const [state, setState] = useState(
    [
      { time: "09:00", check: "true" },
      { time: "10:00", check: "true" },
      { time: "11:00", check: "true" },
      { time: "13:00", check: "true" },
      { time: "14:00", check: "true" },
      { time: "15:00", check: "true" },
      { time: "16:00", check: "true" },
    ]);

  let time = getTime();
  let resultTime = [];
  for (var i = 0; i < time.length; i++) {
    let temp = time[i].rDate.split(" ");
    resultTime.push(temp[1]);
  }

  for (var j = 0; j < resultTime.length; j++) {
    for(var k=0; k<state.length; k++){
      if(resultTime[j] === state[k].time){
        setState(state[k].check="false")
      }
    }
  }
  
  console.log(state);

  return (
    <>
      <div className={style.memo_write}>
        {time[0].rDate}
        <textarea onChange={handleChange} className={style.textarea_style} placeholder="입력하세요"></textarea>
      </div>
    </>
  );
};
