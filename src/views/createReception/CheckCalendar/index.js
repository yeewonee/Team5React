import style from "./style.module.css";
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import receptionCalStyle from "./receptionCalStyle.css";
import { useDispatch, useSelector } from "react-redux";
import { createSetDate, createSetTime } from "redux/createReception-reducer";

function CheckCalendar(props) {
  const dispatch = useDispatch();

  const ChangeDate = (event) => { 
    dispatch(createSetDate(event)); 
    dispatch(createSetTime('')); //날짜 바꾸면 선택된 시간 비워주기
  }
  const date = useSelector((state) => {
    return state.createReceptionReducer.date
  })

  return(
    <div className={style.calendar_box} style={{marginBottom: '10px', overflow:'auto'}}>
        <Calendar
        onChange={ChangeDate}
        locale="en-US"
        value={date}
        />
    </div>
  );
}

export default CheckCalendar;