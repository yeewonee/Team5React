import { useState } from "react";
import style from "./style.module.css";

function CheckTime(props) {
  const [state, setState] = useState({
    time: ""
  });

  const handleRadio = (event) => {
    if(event.target.checked){
      setState(prevState => {
        return {
          ...prevState,
          time: event.target.value
        }
      });
    }
  };

  return(
    <div className={style.time_box}>
      <div style={{marginTop:'20px', marginLeft:'19px'}}>
        <div className={style.radios}>
          <label style={{backgroundColor: state.time==='9:00' ? '#adb5bd' : ''}}>
            <input type="radio" name="time" value="9:00" onChange={handleRadio} checked={state.time === '9:00'}/>
            9:00
          </label>
          <label style={{backgroundColor: state.time==='10:00' ? '#adb5bd' : ''}}>
            <input type="radio" name="time" value="10:00" onChange={handleRadio} checked={state.time === '10:00'}/>
            10:00
          </label>
          <label style={{backgroundColor: state.time==='11:00' ? '#adb5bd' : ''}}>
            <input type="radio" name="time" value="11:00" onChange={handleRadio} checked={state.time === '11:00'}/>
            11:00
          </label>
          <label style={{backgroundColor: state.time==='12:00' ? '#adb5bd' : ''}}>
            <input type="radio" name="time" value="12:00" onChange={handleRadio} checked={state.time === '12:00'}/>
            12:00
          </label>
          <label style={{backgroundColor: state.time ==='14:00' ? '#adb5bd' : ''}}>
            <input type="radio" name="time" value="14:00" onChange={handleRadio} checked={state.time === '14:00'}/>
            14:00
          </label>
          <label style={{backgroundColor: state.time==='15:00' ? '#adb5bd' : ''}}>
            <input type="radio" name="time" value="15:00" onChange={handleRadio} checked={state.time === '15:00'}/>
            15:00
          </label>
          <label style={{backgroundColor: state.time==='16:00' ? '#adb5bd' : ''}}>
            <input type="radio" name="time" value="16:00" onChange={handleRadio} checked={state.time === '16:00'}/>
            16:00
          </label>
          <label style={{backgroundColor: state.time==='방문접수' ? '#adb5bd' : ''}}>
            <input type="radio" name="time" value="방문접수" onChange={handleRadio} checked={state.time === '방문접수'}/>
            방문접수
          </label>
        </div>
      </div>
      <div>선택된 시간: {state.time}</div>
    </div>
  );
}

export default CheckTime;