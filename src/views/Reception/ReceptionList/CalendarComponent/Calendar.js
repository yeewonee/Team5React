import moment from "moment";
import React, { useState } from "react";
import { useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useDispatch } from "react-redux";
import { setReceptionDay, setRday } from "redux/reception-reducer";

function Calendar (props){
  const [startDate, setStartDate] = useState(new Date());
  const dispatch = useDispatch();
  const ChangeDate = (date) => {
    setStartDate(date);
  };

  useEffect(() => {
    //날짜 설정
    dispatch(setReceptionDay(moment(startDate).format('YYYY-MM-DD')));
    dispatch(setRday(moment(startDate).day()));
    
  }, [startDate])

  return (
    <DatePicker selected={startDate} onChange={(date) => {ChangeDate(date)}} />
  );
};

export default Calendar