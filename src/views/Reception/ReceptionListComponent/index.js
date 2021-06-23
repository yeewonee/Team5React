import style from './rlist.module.css';
import Calendar from "./CalendarComponent/Calendar";
import SearchBar from './SearchBarComponent/SearchBar';
import { Row, Col, Button, Modal } from 'react-bootstrap';
import { useState } from "react";
import {Link} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setReception } from 'redux/reception-reducer';
import { getPatientList } from './data';

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
  const dispatch = useDispatch();
  const arr = Array.from({length: patientList.length}, () => false); //patientList길이만큼 새로 만들어서 false로 채움
  const [checkArray,setCheckArray] = useState(arr); //상태
  const changeCheck = (event,index,r_id) =>{ //map에 있는 index, r_id
    let checkarray = checkArray //arr값이 들어감
    if(event.target.value==="on"){ //체크되면
      dispatch(setReception(r_id)); //redux
      checkarray = arr;
      checkarray[index] = true; //특정 index만 true
    }
    setCheckArray(checkarray);
  }

  useSelector((state) => {
    return state.receptionReducer.r_id
  });

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

  //검색창
  const [ searchValue, setSearchValue ] = useState({
    value: ""
  });
  const [boards, setBoards] = useState(patientList);
  var newBoards = boards; 
  if(searchValue.value === ""){
    newBoards = boards.filter(board => board.patient_name !== searchValue.value);
  }else{
    newBoards = boards.filter(board => board.patient_name === searchValue.value);
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
                <th className={style.tr1}>&nbsp;<div className="btn btn-sm btn-outline-secondary">우편번호 찾기</div></th>  
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


      <Modal show={show1} onHide={handleClose1} dialogClassName="custom-modal">
        <Modal.Header closeButton>
          <Modal.Title>예약확인</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <table className="table">
            <tbody>
              <tr className={style.table}>
                <th className={style.detailth}>&nbsp;예약번호</th>
                <td className={style.detailtd}>&nbsp;0097845</td>
                <th className={style.detailth}>&nbsp;환자번호</th>
                <td className={style.detailtd}>&nbsp;0087845</td>
              </tr>
              <tr>
                <th className={style.detailth}>&nbsp;환자명</th>
                <td className={style.detailtd}>&nbsp;{patientBoard.patient_name}</td>
                <th className={style.detailth}>&nbsp;주민번호</th>
                <td className={style.detailtd}>&nbsp;{patientBoard.patient_ssn1}</td>
              </tr>
              <tr>
                <th className={style.detailth}>&nbsp;전화번호</th>
                <td className={style.detailtd}>&nbsp;{patientBoard.patient_phone}</td>
                <th className={style.detailth}>&nbsp;담당의사</th>
                <td className={style.detailtd}>&nbsp;김철수</td>
              </tr>
              <tr>
                <th className={style.detailth}>&nbsp;우편번호</th>
                <td className={style.detailtd}>&nbsp;04137</td>
                <th className={style.detailth}>&nbsp;진료실</th>
                <td className={style.detailtd}>&nbsp;제1진료실</td>
              </tr>
              <tr>
                <th className={style.detailth}>&nbsp;예약날짜</th>
                <td className={style.detailtd}>&nbsp;{patientBoard.r_date}</td>
                <th className={style.detailth}>&nbsp;예약시간</th>
                <td className={style.detailtd}>&nbsp;{patientBoard.r_time}</td>
              </tr>

            </tbody>
          </table>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="warning" onClick={handleClose1}>
            수정
          </Button>
          <Button variant="danger" onClick={handleClose1}>
            닫기
          </Button>
        </Modal.Footer>
        <style jsx global>{`
            .custom-modal {
              font-family: "DoHyeon-Regular"; 
            }
          `}
        </style>
      </Modal>
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
                <Button className={style.button}>예약 취소</Button>
                <Button className={style.button}>접수 완료</Button>
              </div>
            </div>
          </div> 
          <div className={style.tablewidth}>
          <table className="table">
              <thead>
                <tr className={style.listtitle}>
                  <th scope="col"></th>
                  <th scope="col">예약 번호</th>
                  <th scope="col">이름</th>
                  <th scope="col">생년월일</th>
                  <th scope="col">전화번호</th>
                  <th scope="col">예약 날짜</th>
                  <th scope="col">예약 시간</th>
                  <th scope="col">접수 상태</th>
                </tr>
              </thead>
              <tbody>
                {newBoards.map((list, index) => {
                return (
                  <tr key={list.r_id} className={style.list}>
                    <td><input type="checkbox" onChange={(event)=>{changeCheck(event, index, list.r_id)}}  checked={checkArray[index]}></input></td>
                    <td>{list.r_id}</td>
                    <td onClick={(event) => {buttonModal1(event, list)}} className={style.click}>{list.patient_name}</td>
                    <td>{list.patient_ssn1}</td>
                    <td>{list.patient_phone}</td>
                    <td>{list.r_date}</td> 
                    <td>{list.r_time}</td>
                    <td>{list.r_status}</td>              
                  </tr>
                );
              })}               
              </tbody>
            </table>
            </div>
        </Row>
      </div>
    </div>
    
  )
}

export default ReceptionList;