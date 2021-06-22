import React from "react";
import cal from "./cal.module.css";
import moment from 'moment';
import { useDispatch } from "react-redux";
import { createSetDayAction } from "redux/diagnosis-reducer";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import calstyle from "./calstyle.css";
import { useState } from "react";
import { useEffect } from "react";

export const Cal = (props) => {
  const [startDate, setStartDate] = useState(new Date());

  const dispatch = useDispatch();

  const ChangeDate = (date) => {
    setStartDate(date);
  };

  useEffect(() => {
    dispatch(createSetDayAction(moment(startDate).format('YYYY-MM-DD')));
  }, [startDate])

  return (
    <>
      <div className={cal.calendar_box}>
        <DatePicker selected={startDate} onChange={(date) => {ChangeDate(date)}} inline/>
      </div>
    </>
  );
};
