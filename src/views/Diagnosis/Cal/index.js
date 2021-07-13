import React from "react";
import cal from "./cal.module.css";
import moment from 'moment';
import { useDispatch } from "react-redux";
import { createSetDayAction } from "redux/diagnosis-reducer";
import { createSetPidAction } from "redux/diagnosis-reducer";
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import calstyle from "./calstyle.css";
import { useState } from "react";
import { useEffect } from "react";

import { ko } from "date-fns/esm/locale";
registerLocale("ko", ko);

export const Cal = React.memo((props) => {
  console.log("달력 렌더링")
  const [startDate, setStartDate] = useState(new Date());

  const dispatch = useDispatch();

  const ChangeDate = (date) => {
    setStartDate(date);
  };

  useEffect(() => {
    //날짜 설정
    dispatch(createSetDayAction(""));
    dispatch(createSetDayAction(moment(startDate).format('YYYY-MM-DD')));
    //환자id 초기화
    dispatch(createSetPidAction(""));
  }, [startDate])

  return (
    <>
      <div className={cal.calendar_box}>
        <DatePicker locale={ko} selected={startDate} onChange={(date) => {ChangeDate(date)}} inline/>
      </div>
    </>
  );
});
