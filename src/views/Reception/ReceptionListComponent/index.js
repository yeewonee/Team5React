import style from './rlist.module.css';
import Calendar from "./Calendar";
import SearchBar from './SearchBar';
import { Row, Col, Button, Modal } from 'react-bootstrap';
import { useState } from "react";

function ReceptionList(props){
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
          <table calss="table">
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
    
      <Row className={style.back}>
        <Col className="col-1 mt-1">
          <Calendar/>
        </Col>
        <Col className="col-7 mt-1 ml-4">
          <SearchBar/>
        </Col>
        <Col className="mt-1">
          <Button className={style.button} onClick={buttonModal}>환자 등록</Button>
          <Button className={style.button}>예약/접수</Button>
          <Button className={style.button}>예약 취소</Button>
          <Button className={style.button}>접수 완료</Button>
        </Col>
        <table class="table">
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
              <tr className={style.list} onClick={buttonModal1}>
                <td><input type="checkbox"></input></td>
                <td>4</td>
                <td>이수빈</td>
                <td>950629</td>
                <td>01012345678</td>
                <td>21.06.15</td>
                <td>10:30</td>
                <td>접수대기</td>
              </tr>
              <tr className={style.list2}>
                <td><input type="checkbox"></input></td>
                <td>3</td>
                <td>이수빈</td>
                <td>950629</td>
                <td>01012345678</td>
                <td>21.06.15</td>
                <td>10:30</td>
                <td>접수대기</td>
              </tr>
              <tr className={style.list}>
                <td><input type="checkbox"></input></td>
                <td>2</td>
                <td>이수빈</td>
                <td>950629</td>
                <td>01012345678</td>
                <td>21.06.15</td>
                <td>10:30</td>
                <td>접수대기</td>
              </tr>
              <tr className={style.list2}>
                <td><input type="checkbox"></input></td>
                <td>1</td>
                <td>이수빈</td>
                <td>950629</td>
                <td>01012345678</td>
                <td>21.06.15</td>
                <td>10:30</td>
                <td>접수대기</td>
              </tr>                
            </tbody>
          </table>
      </Row>
    </>
    
  )
}

export default ReceptionList;