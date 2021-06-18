import style from "./style.module.css";
import Calendar from 'react-calendar';
import { useState } from "react";

import 'react-calendar/dist/Calendar.css';
import moment from 'moment';
import calstyle from "./calstyle.css";

function CheckCalendar(props) {
  const [date, setDateState] = useState(new Date());

  const ChangeDate = (event) => {
    setDateState(event);
  }


  return(
    <div className={style.calendar_box} style={{marginBottom: '10px'}}>
        <Calendar
        className="calstyle"
        onChange={ChangeDate}
        value={date}
        />
<p className="m-0 p-0">선택 날짜: <b>{moment(date).format('YYYY-MM-DD')}</b></p>

    </div>
  );
}

export default CheckCalendar;