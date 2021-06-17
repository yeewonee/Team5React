import React from "react";
import cal from "./cal.module.css";
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import moment from 'moment';
import calstyle from "./calstyle.css";
import { useDispatch, useSelector } from "react-redux";
import { createSetDayAction } from "redux/diagnosis-reducer";

export const Cal = () => {

  const dispatch = useDispatch();

  const ChangeDate = (event) => {
    dispatch(createSetDayAction(moment(event).format('YYYY-MM-DD')));
  }

  const day = useSelector((state) => {
    return state.diagnosisReducer.day
  });

  return (
    <>
      <div className={`${cal.calendar_container} m-1`}>
        <div className={cal.calendar}>
          <div className="d-flex justify-content-between">
            <p className="ml-2 mt-1 mb-1 font-weight-bold">달력</p>
            <p className="m-0 p-1"><b>{day}</b></p>
          </div>
        </div>
        <div className={cal.calendar_box}>
          <Calendar
          className="calstyle"
          onChange={ChangeDate}
          />
        </div>
      </div>
    </>
  );
};
