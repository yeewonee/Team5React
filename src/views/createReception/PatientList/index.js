import style from "./style.module.css";
import CommonTable from "views/table/CommonTable";
import CommonTableColumn from "views/table/CommonTableColumn";
import { createSetPatient } from "redux/createReception-reducer";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { FaUserTimes } from 'react-icons/fa';
import { Loading } from "views/Diagnosis/Loading";

function PatientList(props) {
  const originList = props.data;
  const dispatch = useDispatch();
  const [patientList, setPatientList] = useState([]);
  const [searchWord, setSearchWord] = useState(''); //검색어 상태값
  
  const loading = props.loading;

  useEffect(() => {
    const test = async() => {
      setPatientList(props.data);
    }
    test()
  },[props.data])

  const pid = useSelector((state) => {
    return state.createReceptionReducer.patient_id
  });
  const r_id = useSelector((state) => {
    return state.createReceptionReducer.r_id
  })

  let arr = Array.from({length: patientList.length}, () => false); // 환자리스트의 리스트개수만큼 false로 채워진 배열 생성
  const [checkArray,setCheckArray] = useState(arr);
  let checkarray = checkArray

  useEffect(() => {
    if (pid===''){ //pid을 비워주면 체크박스도 비워주기 위함
      checkarray = arr;
      setCheckArray(checkarray);
    }
  },[pid])

  const changeCheck = (event,index,id) =>{
    if(r_id === ''){ // 예약/접수 버튼을 통해 들어온 경우 (신규 접수는 수정과 달리 r_id가 비어있음)
      if(pid === id){ //리덕스에 담겨있는 값이랑 현재 체크하려는 것이 같으면 더 이상 눌리지 않게 처리해주기!
        return
      } else {    
        if(event.target.value==="on"){ //checkbox가 check되면
          dispatch(createSetPatient(id)); //createSetPatient를 호출해서 액션객체를 얻고
          checkarray = arr; 
          checkarray[index] = true; // 체크된 환자의 배열값을 true로!!
        }
        setCheckArray(checkarray)
      }
    } else { //수정버튼을 통해 들어온 경우 => 선택된 환자가 바뀌지 않도록 해야 함!
      return // 환자를 set해주는 이 함수를 실행시키지 않고 return 시킴.
    }
  }

    const serachChange = (event) => {
      setSearchWord(event.target.value);
    };

  const searchPatient = (event) => {
    dispatch(createSetPatient('')); //검색버튼 누르면 이전에 체크됐던 환자 값을 비워줌
    if(searchWord===''){ //검색어가 없으면
      setPatientList(originList); //list에 전체 목록 넣어주고
    }else{ //검색어가 있으면
      let searchList = originList.filter((list)=>list.patient_name.includes(searchWord));
      setPatientList(searchList); //list에 검색어에 맞는 목록 넣음
    }

  };


  return(
    <div className={style.p_list}>
    <div className="input-group m-2">
      <input type="text" name="searchWord" placeholder="환자 검색" onChange={serachChange} value={searchWord}></input>
      <div className="input-group-append">
          <button className="btn btn-outline-secondary btn-sm" type="button" onClick={searchPatient} value={searchWord}>검색</button>
      </div>
    </div>

    {loading ?
      <>
      <div style={{marginTop:'25%'}}> 
        <Loading height={60} width={60}/>
      </div> 
      <p>Loading..</p>
      </>
    :
    <>
    {patientList.length !== 0 ?(
    <div className={style.table_wrapper}>
      <CommonTable headersName={['', '환자번호', '이름', '주민등록번호', '전화번호']} tstyle={"table table-sm"}>
          {patientList.map((patient, index) => (
            <tr key={patient.patientId} style={{backgroundColor: patient.patientId === pid ? '#d0ebff' : ''}}>
                <CommonTableColumn><input type="checkbox" name='patient' onChange={(event)=>{changeCheck(event, index, patient.patientId)}} checked={checkArray[index]||''}></input></CommonTableColumn>
                <CommonTableColumn>{patient.patientId}</CommonTableColumn>
                <CommonTableColumn>{patient.patientName}</CommonTableColumn>
                <CommonTableColumn>{patient.patientSsn1}-{patient.patientSsn2}</CommonTableColumn>
                <CommonTableColumn>{patient.patientPhone}</CommonTableColumn>
            </tr>
            ))}
      </CommonTable>
    </div>
   ):(
    <div>
      <div style={{display:'flex', justifyContent:'center', alignItems:'center',flexDirection:'column',height:'35vh'}}>
        <div><FaUserTimes size={'5em'}/></div>
        <div style={{marginTop:'15px',fontSize:'20px'}}>일치하는 환자가 없습니다.</div>
      </div>  
    </div>
    )}</>}
  </div>
  );

}
export default PatientList;