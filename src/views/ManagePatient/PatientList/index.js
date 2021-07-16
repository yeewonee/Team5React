import style from "./style.module.css";
import CommonTable from "views/table/CommonTable";
import CommonTableColumn from "views/table/CommonTableColumn";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { createSetPatient } from "redux/managePatient-reducer";
import NewRegistration from "./NewRegistration";
import { FaUserTimes } from 'react-icons/fa';
import { Loading } from "Loading";

function PatientList(props) {
  const dispatch = useDispatch();
  const originList = props.data;
  const [searchWord, setSearchWord] = useState('');
  const [patientList, setPatientList] = useState([]);

  const loading = props.loading; //로딩상태값

    //신규환자 등록 모달
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const buttonModal = () => setShow(true);
  
    //우편번호 api
    const [isPopupOpen, setIsPopupOpen] = useState(false)
    // 팝업창 열기
    const openPostCode = () => { setIsPopupOpen(true) }
    // 팝업창 닫기
    const closePostCode = () => { setIsPopupOpen(false) }

  useEffect(() => {
    const test = async() => {
      setPatientList(props.data);
    }
    test()
    setColorSelect("");
  },[props.data, props.message])
  const serachChange = (event) => {
    setSearchWord(event.target.value);
  };

  const searchPatient = (event) => {
    dispatch(createSetPatient(''));
    if(searchWord===''){ //검색어가 없으면
      setPatientList(originList); //list에 전체 목록 넣어주고
    }else{ //검색어가 있으면
      let searchList = originList.filter((list)=>list.patientName.includes(searchWord));
      setPatientList(searchList); //list에 검색어에 맞는 목록 넣음
    }
  };

  const [colorSelect, setColorSelect] = useState("");
  const handleClick = (pid) => {
    setColorSelect(pid)
    console.log(pid);
    dispatch(createSetPatient(pid));
  };

  return(
    <div className={style.p_list}>
    <div style={{display:'flex', height:'50px'}}>
      <div className="input-group m-2">
        <input type="text" name="searchWord" placeholder="환자 검색" onChange={serachChange} value={searchWord}></input>
        <div className="input-group-append">
            <button className="btn btn-outline-secondary btn-sm" type="button" onClick={searchPatient} value={searchWord}>검색</button>
        </div>
      </div>
      <div style={{margin:'10px'}}>
          <button className="btn btn-outline-secondary btn-sm" style={{width:'90px'}} onClick={buttonModal}>신규환자 등록</button>
      </div>
    </div>
    
      {/* 신규환자 등록 */}
      <NewRegistration
      show={show} 
      handleClose={handleClose}
      isPopupOpen={isPopupOpen}
      openPostCode={openPostCode}
      closePostCode={closePostCode}
      pubMessage={props.pubMessage}
      pubMessage2={props.pubMessage2}
      />
   {loading ?
      <>
      <div style={{marginTop:'25%'}}> 
        <Loading height={60} width={60}/>
      </div> 
      <p>Loading..</p>
      </>
    :
    <>
    {patientList.length !== 0 ? (
      <div className={style.table_wrapper}>
      <CommonTable headersName={['환자번호', '이름', '주민등록번호', '전화번호', '우편번호', '주소']} tstyle={"table table-sm"}>
          {patientList.map((patient, index) => (
            <tr key={patient.patientId} onClick={()=>handleClick(patient.patientId)} className={patient.patientId === colorSelect ? style.select_Color : style.basic_Color} style={{cursor:"pointer"}}>
                <CommonTableColumn>{patient.patientId}</CommonTableColumn>
                <CommonTableColumn>{patient.patientName}</CommonTableColumn>
                <CommonTableColumn>{patient.patientSsn1}-{patient.patientSsn2}</CommonTableColumn>
                <CommonTableColumn>{patient.patientPhone}</CommonTableColumn>
                <CommonTableColumn>{patient.patientZip}</CommonTableColumn>
                <CommonTableColumn>{patient.address} {patient.addressDetail}</CommonTableColumn>
            </tr>
            ))}
      </CommonTable>
    </div> 
  ):( 
    <div>
      <div style={{display:'flex', justifyContent:'center', alignItems:'center',flexDirection:'column',height:'35vh'}}>
        <div style={{marginTop:'200px'}}><FaUserTimes size={'10em'}/></div>
        <div style={{marginTop:'10px',fontSize:'20px'}}>일치하는 환자가 없습니다.</div>
      </div>  
    </div>)
  }</>}  
    </div>
    );
}
export default PatientList;