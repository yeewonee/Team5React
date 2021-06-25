import moment from "moment";
import React, { useState } from "react";
import { useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useDispatch } from "react-redux";
import { setReceptionDay } from "redux/reception-reducer";

function Calendar (props){
  const [startDate, setStartDate] = useState(new Date());
  const dispatch = useDispatch();
  const ChangeDate = (date) => {
    setStartDate(date);
  };

  useEffect(() => {
    //날짜 설정
    dispatch(setReceptionDay(moment(startDate).format('YYYY-MM-DD')));
    //환자id 초기화
    dispatch(setReceptionDay(""));
  }, [startDate])

  return (
    <DatePicker selected={startDate} onChange={(date) => {ChangeDate(date)}} />
  );
};

export default Calendar