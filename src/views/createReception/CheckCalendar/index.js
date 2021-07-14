import style from "./style.module.css";
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import receptionCalStyle from "./receptionCalStyle.css";
import { useDispatch } from "react-redux";
import { createSetDate, createSetTime } from "redux/createReception-reducer";
import moment from "moment";
import Swal from 'sweetalert2' 

function CheckCalendar(props) {
  const dispatch = useDispatch();

  const ChangeDate = (event) => { 
    const today = moment(new Date()).format('YYYY-MM-DD') //오늘 날짜 구하기
    const clickDate= moment(event).format('YYYY-MM-DD') //선택한 날짜 구하기

    if(clickDate< today){ //오늘보다 이전 날짜를 선택하는 경우
      Swal.fire({
        icon: 'error',
        text: '이전 날짜는 예약 및 접수가 불가능합니다.',
        confirmButtonColor: '#3085d6'
      })
    } else { 
    dispatch(createSetDate(clickDate)); 
    dispatch(createSetTime('')); //날짜 바꾸면 선택된 시간 비워주기
    }
  }


  return(
    <div className={style.calendar_box} style={{marginBottom: '5px', overflow:'auto'}}>
        <Calendar
        onChange={ChangeDate}
        locale="en-US"
        />
    </div>
  );
}

export default CheckCalendar;