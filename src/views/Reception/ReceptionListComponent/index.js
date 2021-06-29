import style from './rlist.module.css';
import Calendar from "./CalendarComponent/Calendar";
import SearchBar from './SearchBarComponent/SearchBar';
import { Row, Col, Button, Modal } from 'react-bootstrap';
import { useState } from "react";
import {Link} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setReception } from 'redux/reception-reducer';
import { getPatientList } from './data';
import CommonTable from 'views/table/CommonTable';
import CommonTableRow from 'views/table/CommonTableRow';
import CommonTableColumn from 'views/table/CommonTableColumn';
import FindAddr from './PostCodeComponent/FindAddr';
import FindAddrDom from './PostCodeComponent/FindAddrDom';
import CheckReception from './CheckReception';
import NewRegistration from './NewRegistration';
import { useEffect } from 'react';
import CancelModal from './CancelModal';
import CompleteModal from './CompleteModal';
import { createSetDate, createSetDoctor, createSetPatient, createSetStatus, createSetTime } from 'redux/createReception-reducer';

function ReceptionList(props){
  const day = useSelector((state) => {
    return state.receptionReducer.day;
  });
  const dispatch = useDispatch();
  
  const [patientBoard, setPatientBoard] = useState({
    r_id: 0,
    patient_name: "",
    patient_ssn1: 123456,
    patient_phone: "123-4567-8902",
    r_date: "",
    r_time: "",
    r_status:"",
    doctor_id:"",
    patient_id:""
  });

  //환자리스트
  const patientList = getPatientList(day);  
  useEffect(() => {
    setBoards(patientList)
  }, [day])
  
  //신규환자 등록
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const buttonModal = () => setShow(true);

  // 예약/접수 버튼 클릭 시 동작
  const handleReception = (event) => {
    dispatch(createSetStatus(1));
    dispatch(createSetPatient(''));
    dispatch(createSetDoctor(''));
    dispatch(createSetDate(''));
    dispatch(createSetTime(''));
  };

  //환자상세정보
  const [show1, setShow1] = useState(false);
  const handleClose1 = () => setShow1(false);
  const buttonModal1 = (event, list) => {
    setPatientBoard({
      r_id: list.r_id,
      patient_name: list.patient_name,
      patient_ssn1: list.patient_ssn1,
      patient_phone: list.patient_phone,
      r_date: list.r_date,
      r_time: list.r_time,
      r_status: list.r_status,
      doctor_id: list.doctor_id,
      patient_id: list.patient_id,
    })
    setShow1(true)
  };

  //주소찾기 모달
  const [modalOpen, setModalOpen] = useState(false);
  const openModal = () => { setModalOpen(true); };
  const closeModal = () => { setModalOpen(false); };

  //검색창
  const [ searchValue, setSearchValue ] = useState({
    value: ""
  });
  const [boards, setBoards] = useState(patientList);
  var newBoards = boards;
  if(searchValue.value === ""){
    newBoards = boards.filter(board => board.patient_name !== searchValue.value);
  }else{
    newBoards = boards.filter(board => board.patient_name.includes(searchValue.value));
  }

  //예약취소 확인 모달
  const [cancelShow, setCancelShow] = useState(false);
  const [cancelId, setCancelId] = useState("");
  const closeCModal = () => setCancelShow(false);
  const openCModal = (event, r_id) => {
    setCancelId(r_id)
    setCancelShow(true)
  };

  //예약취소
  const cancelReception = () => {
    newBoards = boards.filter(board => board.r_id !== cancelId);
    setBoards(newBoards);
    closeCModal()
  }

  //접수완료 확인 모달
  const [completeShow, setcompleteShow] = useState(false);
  const [completeIndex, setcompleteIndex] = useState("");
  const closeComModal = () => setcompleteShow(false);
  const openComModal = (event, index) => {
    setcompleteIndex(index)
    setcompleteShow(true)
  };

  //접수완료
  const completeReception = () => {
      newBoards[completeIndex].r_status = "접수완료";
      setBoards(newBoards);
      closeComModal()
  }
  
  //우편번호 api
  const [isPopupOpen, setIsPopupOpen] = useState(false)
	// 팝업창 열기
  const openPostCode = () => { setIsPopupOpen(true) }
	// 팝업창 닫기
  const closePostCode = () => { setIsPopupOpen(false) }

  return(
    <div className={style.font}>
      {/* 신규환자 등록 */}
      <NewRegistration 
      show={show} 
      handleClose={handleClose}
      isPopupOpen={isPopupOpen}
      openPostCode={openPostCode}
      closePostCode={closePostCode}
      />
      
      {/* 예약확인 */}
      <CheckReception 
      patientBoard={patientBoard} 
      show1={show1} 
      handleClose1={handleClose1}
      />

      {/* 접수완료 */}
      <CompleteModal completeShow={completeShow} 
      closeComModal={closeComModal} 
      openComModal={openComModal}
      completeReception={completeReception}
      />
      
      {/* 예약취소 */}
      <CancelModal cancelShow={cancelShow} 
      closeCModal={closeCModal} 
      openCModal={openCModal}
      cancelReception={cancelReception}
      />

      <div className={style.location}>
        <div className={style.label}>
          <h5>&nbsp;접수 목록</h5> 
        </div>
        <div className={style.back}>
          <div className={style.width}>
            <div className={style.margin1}>
              <Calendar/>
            </div>
            <div className={style.margin2}>
              <SearchBar setSearchValue={setSearchValue}/>
            </div>
            <div className={style.button1}>
              <button className={style.button} onClick={buttonModal}>환자 등록</button>
              <button className={style.button}><Link to="/createReception" className={style.link} onClick={handleReception}>예약/접수</Link></button>
            </div>
          </div> 

          <div className={style.tablewidth}>
          <CommonTable tstyle={"table"} headersName={['예약 번호', '이름', '생년월일', '전화번호', '예약 날짜', '예약 시간', '접수 상태']}>
            {newBoards.map((list, index) => (
                <tr className={style.list}>
                    <CommonTableColumn>{list.r_id}</CommonTableColumn>
                    <CommonTableColumn><div className={style.click} onClick={(event) => {buttonModal1(event, list)}}>{list.patient_name}</div></CommonTableColumn>
                    <CommonTableColumn>{list.patient_ssn1}</CommonTableColumn>
                    <CommonTableColumn>{list.patient_phone}</CommonTableColumn>
                    <CommonTableColumn>{list.r_date}</CommonTableColumn>
                    <CommonTableColumn>{list.r_time}</CommonTableColumn>
                    {list.r_status === '접수완료' ? 
                    (
                      <CommonTableColumn>{list.r_status} &nbsp;
                      </CommonTableColumn>  
                    )
                    : 
                    (
                      <CommonTableColumn>{list.r_status}
                      <button className={style.buttoncolor1} onClick={(event) => {openCModal(event, list.r_id)}}>예약취소</button>&nbsp;
                      <button className={style.buttoncolor2} onClick={(event) => {openComModal(event, index)}}>접수완료</button>
                      </CommonTableColumn> 
                    )}
                          
                  </tr>
                ))}
            </CommonTable>
          </div>
        </div>
      </div>
    </div>
    
  )
}

export default ReceptionList;