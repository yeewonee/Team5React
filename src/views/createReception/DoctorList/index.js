import { getDoctorList } from "./data";
import style from "./style.module.css";
import CommonTable from "views/Component/table/CommonTable";
import CommonTableColumn from "views/Component/table/CommonTableColumn";
import CommonTableRow from "views/Component/table/ComonTableRow";
import { useDispatch, useSelector } from "react-redux";
import { createSetDoctor } from "redux/reception-reducer";
import { useState } from "react";

function DoctorList(props) {
  const doctorList = getDoctorList();
  const dispatch = useDispatch();

  const arr = Array.from({length: doctorList.length}, () => false);
  const [checkArray,setCheckArray] = useState(arr);
  const changeCheck = (event,index,id) =>{
    let checkarray = checkArray
    if(event.target.value==="on"){
      dispatch(createSetDoctor(id));
      checkarray = arr;
      checkarray[index] = true;
    }
    setCheckArray(checkarray);
  }

  const doctor_id = useSelector((state) => {
    return state.receptionReducer.doctor_id
  });


  return(
    <div className={style.i_list}>
          <div className="input-group m-2">
            <input type="text" placeholder="의사 검색"></input>
            <div className="input-group-append">
                <button className="btn btn-outline-secondary btn-sm" type="button">검색</button>
                <div>{doctor_id}</div>
            </div>
          </div>
          <div className={style.table_wrapper}>
          <CommonTable headersName={['', '의사번호', '이름', '진료실', '전화번호']}>
            {doctorList.map((doctor, index) => (
              <CommonTableRow key={doctor.doctor_id}>
                  <CommonTableColumn><input type="checkbox" name='doctor' onChange={(event)=>{changeCheck(event, index, doctor.doctor_id)}}  checked={checkArray[index]}  ></input></CommonTableColumn>
                  <CommonTableColumn>{doctor.doctor_id}</CommonTableColumn>
                  <CommonTableColumn>{doctor.doctor_name}</CommonTableColumn>
                  <CommonTableColumn>{doctor.doctor_office}</CommonTableColumn>
                  <CommonTableColumn>{doctor.doctor_phone}</CommonTableColumn>
              </CommonTableRow>
              ))}
          </CommonTable>
          </div>
        </div>
  );
}

export default DoctorList;