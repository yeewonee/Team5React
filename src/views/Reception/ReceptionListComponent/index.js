import style from './rlist.module.css';
import Calendar from "./Calendar";
import SearchBar from './SearchBar';
import { Row, Col, Button, Modal } from 'react-bootstrap';
import { useState } from "react";
import {Link} from "react-router-dom";

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

  const patientList = [
    { r_id: 4, patient_name: "정예원", patient_ssn1: 950211, patient_phone: "010-4567-8902", r_date: "21.06.15", r_time: "11:30", r_status:"접수대기"},
    { r_id: 3, patient_name: "정윤환", patient_ssn1: 960123, patient_phone: "010-2987-2701", r_date: "21.06.15", r_time: "10:30", r_status:"접수완료"},
    { r_id: 2, patient_name: "김명휘", patient_ssn1: 980403, patient_phone: "010-3820-3321", r_date: "21.06.15", r_time: "10:00", r_status:"접수완료"},
    { r_id: 1, patient_name: "박소라", patient_ssn1: 930516, patient_phone: "010-5921-0192", r_date: "21.06.15", r_time: "09:30", r_status:"접수완료"}
  
  ]

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const buttonModal = () => setShow(true);

  const [show1, setShow1] = useState(false);
  const handleClose1 = () => setShow1(false);
  const buttonModal1 = () => setShow1(true);
  return(
    <>
      <Modal show={show} onHide={handleClose}>
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
                <th className={style.tr1}>&nbsp;<div class="btn btn-sm btn-outline-secondary">우편번호 찾기</div></th>  
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
      </Modal>


      <Modal show={show1} onHide={handleClose1}>
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
                <td className={style.detailtd}>&nbsp;정예원</td>
                <th className={style.detailth}>&nbsp;주민번호</th>
                <td className={style.detailtd}>&nbsp;971205-2122291</td>
              </tr>
              <tr>
                <th className={style.detailth}>&nbsp;전화번호</th>
                <td className={style.detailtd}>&nbsp;01052962942</td>
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
                <td className={style.detailtd}>&nbsp;2021-06-16</td>
                <th className={style.detailth}>&nbsp;예약시간</th>
                <td className={style.detailtd}>&nbsp;13:55</td>
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
      </Modal>
      <h5 className={style.label}>&nbsp;접수 목록</h5> 
      
      <div className={style.location}>
        
        <Row className={style.back}>
          <div className={style.margin1}>
            <div className={style.margin2}>
              <Calendar/>
            </div>
            <div className={style.margin3}>
              <SearchBar/>
            </div>
          </div>
          <div className={style.buttonlocation}>
            <Col className={style.button1}>
              <Button className={style.button} onClick={buttonModal}>환자 등록</Button>
              <Button className={style.button}><Link to="/createReception">예약/접수</Link></Button>
              <Button className={style.button}>예약 취소</Button>
              <Button className={style.button}>접수 완료</Button>
            </Col>
          </div>
          <div className={style.tablewidth}>
          <table className="table">
              <thead>
                <tr className={style.listtitle}>
                  <th scope="col"><input type="checkbox"></input></th>
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
                {patientList.map((list) => {
                return (
                  <tr key={list.r_id} className={style.list} onClick={buttonModal1}>
                    <td><input type="checkbox"></input></td>
                    <td>{list.r_id}</td>
                    <td>{list.patient_name}</td>
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
    </>
    
  )
}

export default ReceptionList;