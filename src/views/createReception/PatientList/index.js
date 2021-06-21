import { getPatientList } from "./data";
import style from "./style.module.css";
import CommonTable from "views/table/CommonTable";
import CommonTableRow from "views/table/CommonTableRow";
import CommonTableColumn from "views/table/CommonTableColumn";
import { createSetPatient } from "redux/createReception-reducer";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";

function PatientList(props) {
  const patientList = getPatientList(); //환자리스트 가져오기
  const dispatch = useDispatch();

  const arr = Array.from({length: patientList.length}, () => false); // 환자리스트의 리스트개수만큼 false로 채워진 배열 생성
  console.log(arr);
  const [checkArray,setCheckArray] = useState(arr);
  console.log(checkArray);

  const changeCheck = (event,index,id) =>{
    let checkarray = checkArray
    if(event.target.value==="on"){ //checkbox가 check되면
      dispatch(createSetPatient(id)); //createSetPatient를 호출해서 액션객체를 얻고
      checkarray = arr; 
      checkarray[index] = true; // 체크된 환자의 배열값을 true로!!
    }
    setCheckArray(checkarray);
  }

  useSelector((state) => {
    return state.createReceptionReducer.patient_id
  });

  return(
    <div className={style.p_list}>
    <div className="input-group m-2">
      <input type="text" placeholder="환자 검색"></input>
      <div className="input-group-append">
          <button className="btn btn-outline-secondary btn-sm" type="button">검색</button>
      </div>
    </div>
    <div className={style.table_wrapper}>
      <CommonTable headersName={['', '환자번호', '이름', '주민등록번호', '전화번호']}>
          {patientList.map((patient, index) => (
            <CommonTableRow key={patient.patient_id}>
                <CommonTableColumn><input type="checkbox" name='patient' onChange={(event)=>{changeCheck(event, index, patient.patient_id)}} checked={checkArray[index]}></input></CommonTableColumn>
                <CommonTableColumn>{patient.patient_id}</CommonTableColumn>
                <CommonTableColumn>{patient.patient_name}</CommonTableColumn>
                <CommonTableColumn>{patient.patient_ssn1}-{patient.patient_ssn2}</CommonTableColumn>
                <CommonTableColumn>{patient.patient_phone}</CommonTableColumn>
            </CommonTableRow>
            ))}
      </CommonTable>
    </div>
  </div>
  );

}
export default PatientList;