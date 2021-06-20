import React from "react";
import cal from "./cal.module.css";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import moment from "moment";
import calstyle from "./calstyle.css";
import { useDispatch } from "react-redux";
import { createSetDayAction } from "redux/diagnosis-reducer";

export const Cal = (props) => {
  const dispatch = useDispatch();

  const ChangeDate = (event) => {
    dispatch(createSetDayAction(moment(event).format("YYYY-MM-DD")));
  };

  return (
    <>
      <div className={cal.calendar_box}>
        <Calendar className="calstyle" locale="en-US" onChange={ChangeDate} />
      </div>
    </>
  );
};
