import { getPatientList, getPatientListBySearch } from "./data";
import style from "./style.module.css";
import CommonTable from "views/table/CommonTable";
import CommonTableColumn from "views/table/CommonTableColumn";
import { createSetPatient } from "redux/createReception-reducer";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";

function PatientList(props) {
  const originPatientList = getPatientList(); //환자리스트 가져오기
  const [patientList, setPatientList] = useState(originPatientList);

  const dispatch = useDispatch();
  
  const pid = useSelector((state) => {
    return state.createReceptionReducer.patient_id
  });

  let arr = Array.from({length: patientList.length}, () => false); // 환자리스트의 리스트개수만큼 false로 채워진 배열 생성
  const [checkArray,setCheckArray] = useState(arr);

  const changeCheck = (event,index,id) =>{
    if(pid === id){ //리덕스에 담겨있는 값이랑 현재 체크하려는 것이 같으면 더 이상 눌리지 않게 처리해주기!
      return 
    }
    let checkarray = checkArray
    if(event.target.value==="on"){ //checkbox가 check되면
      dispatch(createSetPatient(id)); //createSetPatient를 호출해서 액션객체를 얻고
      checkarray = arr; 
      checkarray[index] = true; // 체크된 환자의 배열값을 true로!!
    }
    setCheckArray(checkarray);
  }

  const [searchword, setSearchword] = useState('');
  const serachChange = (event) => {
    setSearchword(event.target.value);
  };

  const searchPatient = (event) => {
    const patientBySearch = getPatientListBySearch(searchword);
    setCheckArray(arr);
    dispatch(createSetPatient('')); //검색버튼 누르면 이전에 체크됐던 값 지워줌
    if(searchword===''){ //검색어가 없으면
      setPatientList(originPatientList); //list에 전체 목록 넣어주고
    }else{ //검색어가 있으면
      setPatientList(patientBySearch); //list에 검색어에 맞는 목록 넣음
    }
  };


  return(
    <div className={style.p_list}>
    <div className="input-group m-2">
      <input type="text" name="searchword" placeholder="환자 검색" onChange={serachChange} value={searchword}></input>
      <div className="input-group-append">
          <button className="btn btn-outline-secondary btn-sm" type="button" onClick={searchPatient}>검색</button>
      </div>
    </div>
    <div className={style.table_wrapper}>
      <CommonTable headersName={['', '환자번호', '이름', '주민등록번호', '전화번호']} tstyle={"table table-sm"}>
          {patientList.map((patient, index) => (
            <tr key={patient.patient_id} style={{backgroundColor: patient.patient_id === pid ? '#d0ebff' : ''}}>
                <CommonTableColumn><input type="checkbox" name='patient' onChange={(event)=>{changeCheck(event, index, patient.patient_id)}} checked={checkArray[index]||''}></input></CommonTableColumn>
                <CommonTableColumn>{patient.patient_id}</CommonTableColumn>
                <CommonTableColumn>{patient.patient_name}</CommonTableColumn>
                <CommonTableColumn>{patient.patient_ssn1}-{patient.patient_ssn2}</CommonTableColumn>
                <CommonTableColumn>{patient.patient_phone}</CommonTableColumn>
            </tr>
            ))}
      </CommonTable>
    </div>
  </div>
  );

}
export default PatientList;