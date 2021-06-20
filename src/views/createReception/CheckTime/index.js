import { useDispatch, useSelector } from "react-redux";
import { createSetTime } from "redux/createReception-reducer";
import style from "./style.module.css";

function CheckTime(props) {
  const time = useSelector((state) => {
    return state.createReceptionReducer.time
  })

  const dispatch = useDispatch();

  const handleRadio = (event) => {
    if(event.target.checked){
     dispatch(createSetTime(event.target.value));
    }
  };

  return(
    <div className={style.time_box}>
      <div style={{marginTop:'20px', marginLeft:'19px'}}>
        <div className={style.radios}>
          <label style={{backgroundColor: time==='9:00' ? '#006edc' : ''}}>
            <input type="radio" name="time" value="9:00" onChange={handleRadio} checked={time === '9:00'}/>
            9:00
          </label>
          <label style={{backgroundColor: time==='10:00' ? '#006edc' : ''}}>
            <input type="radio" name="time" value="10:00" onChange={handleRadio} checked={time === '10:00'}/>
            10:00
          </label>
          <label style={{backgroundColor: time==='11:00' ? '#006edc' : ''}}>
            <input type="radio" name="time" value="11:00" onChange={handleRadio} checked={time === '11:00'}/>
            11:00
          </label>
          <label style={{backgroundColor: time==='12:00' ? '#006edc' : ''}}>
            <input type="radio" name="time" value="12:00" onChange={handleRadio} checked={time === '12:00'}/>
            12:00
          </label>
          <label style={{backgroundColor: time ==='14:00' ? '#006edc' : ''}}>
            <input type="radio" name="time" value="14:00" onChange={handleRadio} checked={time === '14:00'}/>
            14:00
          </label>
          <label style={{backgroundColor: time==='15:00' ? '#006edc' : ''}}>
            <input type="radio" name="time" value="15:00" onChange={handleRadio} checked={time === '15:00'}/>
            15:00
          </label>
          <label style={{backgroundColor: time==='16:00' ? '#006edc' : ''}}>
            <input type="radio" name="time" value="16:00" onChange={handleRadio} checked={time === '16:00'}/>
            16:00
          </label>
          <label style={{backgroundColor: time==='방문접수' ? '#006edc' : ''}}>
            <input type="radio" name="time" value="방문접수" onChange={handleRadio} checked={time === '방문접수'}/>
            방문접수
          </label>
        </div>
      </div>
    </div>
  );
}

export default CheckTime;