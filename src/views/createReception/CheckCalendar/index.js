import style from "./style.module.css";
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import receptionCalStyle from "./receptionCalStyle.css";
import { useDispatch, useSelector } from "react-redux";
import { createSetDate, createSetTime } from "redux/createReception-reducer";
import moment from "moment";

function CheckCalendar(props) {
  const dispatch = useDispatch();
  
  const ChangeDate = (event) => { 
    const clickDate= moment(event).format('YYYY-MM-DD')
    dispatch(createSetDate(clickDate)); 
    dispatch(createSetTime('')); //날짜 바꾸면 선택된 시간 비워주기
  }

  return(
    <div className={style.calendar_box} style={{marginBottom: '10px', overflow:'auto'}}>
        <Calendar
        onChange={ChangeDate}
        locale="en-US"
        />
    </div>
  );
}

export default CheckCalendar;