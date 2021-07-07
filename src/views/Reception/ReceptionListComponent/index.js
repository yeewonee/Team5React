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
import Contact from './test';
import { createSetDate, createSetDoctor, createSetPatient, createSetTime } from 'redux/createReception-reducer';
import axios from "axios";
axios.defaults.baseURL = "http://localhost:8080";

function ReceptionList(props){
  const day = useSelector((state) => {
    return state.receptionReducer.day;
  });
  const dispatch = useDispatch();

  //날짜별 환자 리스트
  useEffect(() => {
    const pListFunc = async(day) => {
      const result = await axios.get("/reception", {params:{day:day}});   
      setPatientList(result.data)
      setBoards(result.data)
      props.setCBoolean(false)
      props.setComBoolean(false)
    }
    pListFunc(day)
  }, [day, props.cBoolean, props.comBoolean])  

  //환자리스트
  const [patientList, setPatientList] = useState([]);  

  //환자 상세보기
  const [patientBoard, setPatientBoard] = useState({
    rId: 0,
    patientName: "",
    patientSsn1: "",
    patientPhone: "",
    rDate: "",
    rTime: "",
    rStatus:"",
    doctorId:"",
    patientId:""
  });

  //신규환자 등록 모달
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const buttonModal = () => setShow(true);

  // 예약/접수 버튼 클릭 시 동작
  const handleReception = (event) => {
  
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
      rId: list.rId,
      patientName: list.patientName,
      patientSsn1: list.patientSsn1,
      patientPhone: list.patientPhone,
      rDate: list.rDate,
      rTime: list.rTime,
      rStatus: list.rStatus,
      doctorId: list.doctorId,
      patientId: list.patientId,
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
    newBoards = boards.filter(board => board.patientName !== searchValue.value);
  }else{
    newBoards = boards.filter(board => board.patientName.includes(searchValue.value));
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
  const cancelReception = async(cancelId, day) => {
    //newBoards = boards.filter(board => board.rId !== cancelId);
    await axios.delete("/reception/cancelReception", {params:{cancelId:cancelId, day:day}});
    props.setCBoolean(true);
    closeCModal()
  }

  //접수완료 확인 모달
  const [completeShow, setcompleteShow] = useState(false);
  const [changeId, setChangeId] = useState("");
  const closeComModal = () => setcompleteShow(false);
  const openComModal = (event, rId) => {
    setChangeId(rId)
    setcompleteShow(true)
  };

  //접수완료
  const completeReception = async(changeId, day) => {
      //newBoards[completeIndex].rStatus = "접수완료";
      await axios.get("/reception/changeReception", {params:{changeId:changeId, day:day}})
      props.setComBoolean(true);
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
      changeId={changeId}
      />
      
      {/* 예약취소 */}
      <CancelModal cancelShow={cancelShow} 
      closeCModal={closeCModal} 
      openCModal={openCModal}
      cancelReception={cancelReception}
      cancelId={cancelId}
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
            {newBoards.length === 0 ? 
            (
              <CommonTable tstyle={"table"} headersName={['예약 번호', '이름', '생년월일', '전화번호', '예약 날짜', '예약 시간', '접수 상태']}>
              
              <td colSpan='7' className={style.noList}>현재 접수중인 환자가 없습니다.</td>
              </CommonTable>
            ) 
            : 
            (
              <CommonTable tstyle={"table"} headersName={['예약 번호', '이름', '생년월일', '전화번호', '예약 날짜', '예약 시간', '접수 상태']}>
              {newBoards.map((list, index) => (
                <tr className={style.list}>
                    <CommonTableColumn>{list.rId}</CommonTableColumn>
                    <CommonTableColumn><div className={style.click} onClick={(event) => {buttonModal1(event, list)}}>{list.patientName}</div></CommonTableColumn>
                    <CommonTableColumn>{list.patientSsn1}</CommonTableColumn>
                    <CommonTableColumn>{list.patientPhone}</CommonTableColumn>
                    <CommonTableColumn>{list.rDate}</CommonTableColumn>
                    <CommonTableColumn>{list.rTime}</CommonTableColumn>
                    {list.rStatus === '접수완료' ? 
                    (
                      <CommonTableColumn>{list.rStatus} &nbsp;
                      </CommonTableColumn>  
                    )
                    : 
                    (
                      <CommonTableColumn>{list.rStatus}
                      <button className={style.buttoncolor1} onClick={(event) => {openCModal(event, list.rId)}}>예약취소</button>&nbsp;
                      <button className={style.buttoncolor2} onClick={(event) => {openComModal(event, list.rId)}}>접수완료</button>
                      </CommonTableColumn> 
                    )}
                          
                  </tr>
                ))}
                </CommonTable>
            )
            }  
          </div>
        </div>
      </div>
    </div>
    
  )
}

export default ReceptionList;