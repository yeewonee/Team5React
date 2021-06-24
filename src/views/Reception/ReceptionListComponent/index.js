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
import ModalPost from './ModalPost';
import CheckReception from './CheckReception';

function ReceptionList(props){
  const [patientBoard, setPatientBoard] = useState({
    r_id: 0,
    patient_name: "",
    patient_ssn1: 123456,
    patient_phone: "123-4567-8902",
    r_date: "",
    r_time: "",
    r_status:""
  });

  const patientList = getPatientList();
  // const dispatch = useDispatch();
  // const arr = Array.from({length: patientList.length}, () => false); //patientList길이만큼 새로 만들어서 false로 채움
  // const [checkArray,setCheckArray] = useState(arr); //상태
  // const changeCheck = (event,index,r_id) =>{ //map에 있는 index, r_id
  //   let checkarray = checkArray //arr값이 들어감
  //   if(event.target.value==="on"){ //체크되면
  //     dispatch(setReception(r_id)); //redux
  //     checkarray = arr;
  //     checkarray[index] = true; //특정 index만 true
  //   }
  //   setCheckArray(checkarray);
  // }

  // useSelector((state) => {
  //   return state.receptionReducer.r_id
  // });

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const buttonModal = () => setShow(true);

  const [show1, setShow1] = useState(false);
  const handleClose1 = () => setShow1(false);
  //환자상세정보
  const buttonModal1 = (event, list) => {
    setPatientBoard({
      patient_name: list.patient_name,
      patient_ssn1: list.patient_ssn1,
      patient_phone: list.patient_phone,
      r_date: list.r_date,
      r_time: list.r_time
      
    })
    setShow1(true)
  };
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
  
  //예약취소
  const cancelReception = (r_id) => {
    newBoards = boards.filter(board => board.r_id !== r_id);
    setBoards(newBoards);
  }

  //접수완료
  const completeReception = (list, index) => {
      newBoards[index].r_status = "접수완료";
      setBoards(newBoards);
  }
  
  //우편번호 api
  const [isPopupOpen, setIsPopupOpen] = useState(false)
	// 팝업창 열기
    const openPostCode = () => {
        setIsPopupOpen(true)
    }
	// 팝업창 닫기
    const closePostCode = () => {
        setIsPopupOpen(false)
    }


  return(
    <div className={style.font}>
      <Modal show={show} onHide={handleClose} className={style.font} dialogClassName="custom-modal">
        <Modal.Header closeButton>
          <Modal.Title>신규환자 등록</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <table calss="table">
            <tbody>
              <tr className={style.table}>
                <th className={style.tr1}>&nbsp;환자이름<input type="text" className={style.inputtext1}/></th>
                <th className={style.tr2}>&nbsp;주민번호 <input type="text" className={style.inputtext2}/>&nbsp;&nbsp;-<input type="text" className={style.inputtext2}/></th>
              </tr>
              <tr>
                <th className={style.tr1}>&nbsp;성별<input type="text" className={style.inputsex}/></th>
                <th className={style.tr1}>&nbsp;나이<input type="text" className={style.inputage}/></th>  
              </tr>
              <tr>
                <th colSpan="2" className={style.tr1}>&nbsp;전화번호<input type="text" className={style.inputtext3}/></th>
              </tr>
              <tr>
                <th className={style.tr1}>&nbsp;우편번호<input type="text" className={style.inputtext1}/></th>
                <th className={style.tr1}>   
                  <div>
                    &nbsp;<button className="btn btn-sm btn-secondary" onClick={openPostCode}>우편번호 검색</button>
                    <div id='FindAddrDom'>
                        {isPopupOpen && (
                            <FindAddrDom>
                                <FindAddr onClose={closePostCode} />
                            </FindAddrDom>
                        )}
                      </div>
                  </div>   
                </th>             
              </tr>
              <tr>
                <th colSpan="2" className={style.tr1}>&nbsp;주소<input type="text" className={style.inputaddress}/></th>
              </tr>
              <tr>
                <th colSpan="2" className={style.tr1}>&nbsp;상세주소<input type="text" className={style.inputtext3}/></th>
              </tr>
            </tbody>
          </table>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={handleClose}>
            취소
          </Button>
          <Button variant="success" onClick={handleClose}>
            완료
          </Button>
        </Modal.Footer>
        <style jsx global>{`
            .custom-modal {
              font-family: "DoHyeon-Regular"; 
            }
          `}
        </style>
      </Modal>

      {/* 예약확인 */}
      <CheckReception 
      patientBoard={patientBoard} 
      show1={show1} 
      handleClose1={handleClose1}
      />
      
            

      <div className={style.label}>
        <h5>&nbsp;접수 목록</h5> 
      </div>


      <div className={style.location}>
        <Row className={style.back}>
          <div className={style.width}>
            <div className={style.margin1}>
              <div className={style.margin2}>
                <Calendar/>
              </div>
              <div className={style.margin3}>
                <SearchBar setSearchValue={setSearchValue}/>
              </div>
            </div>
            <div className={style.buttonlocation}>
              <div className={style.button1}>
                <Button className={style.button} onClick={buttonModal}>환자 등록</Button>
                <Button className={style.button}><Link to="/createReception" className={style.link}>예약/접수</Link></Button>
              </div>
            </div>
          </div> 
          <div className={style.tablewidth}>
          <CommonTable tstyle={"table"} headersName={['예약 번호', '이름', '생년월일', '전화번호', '예약 날짜', '예약 시간', '접수 상태']}>
            {newBoards.map((list, index) => (
                <CommonTableRow key={list.r_id}>
                    <CommonTableColumn>{list.r_id}</CommonTableColumn>
                    <CommonTableColumn><div className={style.click} onClick={(event) => {buttonModal1(event, list)}}>{list.patient_name}</div></CommonTableColumn>
                    <CommonTableColumn>{list.patient_ssn1}</CommonTableColumn>
                    <CommonTableColumn>{list.patient_phone}</CommonTableColumn>
                    <CommonTableColumn>{list.r_date}</CommonTableColumn>
                    <CommonTableColumn>{list.r_time}</CommonTableColumn>
                    <CommonTableColumn>{list.r_status} &nbsp;<button className="btn btn-sm btn-outline-warning" onClick={(event) => {cancelReception(list.r_id)}}>예약 취소</button> <button className="btn btn-sm btn-outline-primary" onClick={(event) => {completeReception(list, index)}}>접수 완료</button></CommonTableColumn>        
                </CommonTableRow>
                ))}
            </CommonTable>
          </div>
        </Row>
      </div>
    </div>
    
  )
}

export default ReceptionList;