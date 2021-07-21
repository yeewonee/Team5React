import style from './rlist.module.css';
import { Button, Modal } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { createSetDate, createSetDoctor, createSetPatient, createSetrId, createSetTime } from 'redux/createReception-reducer';
import {Link} from "react-router-dom";

const CheckReception = (props) => {
  const patientBoard = props.patientBoard;
  const dispatch = useDispatch();
  const updateReception = (event) => {
    dispatch(createSetDoctor(patientBoard.doctorId));
    dispatch(createSetPatient(patientBoard.patientId));
    dispatch(createSetDate(patientBoard.rDate));
    dispatch(createSetTime(patientBoard.rTime));
    dispatch(createSetrId(patientBoard.rId));
  }

  return(
    <Modal backdrop={false} show={props.show1} onHide={props.handleClose1} dialogClassName="custom-modal">
        <Modal.Header closeButton>
          <Modal.Title style={{color:'gray', textShadow:'1px 1px 1px'}}>예약확인</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <table className="table">
            <tbody>
              <tr className={style.table}>
                <th className={style.detailth}>&nbsp;예약번호</th>
                <td className={style.detailtd}>&nbsp;{patientBoard.rId}</td>
                <th className={style.detailth}>&nbsp;환자번호</th>
                <td className={style.detailtd}>&nbsp;{patientBoard.patientId}</td>
              </tr>
              <tr>
                <th className={style.detailth}>&nbsp;환자명</th>
                <td className={style.detailtd}>&nbsp;{patientBoard.patientName}</td>
                <th className={style.detailth}>&nbsp;주민번호</th>
                <td className={style.detailtd}>&nbsp;{patientBoard.patientSsn1}</td>
              </tr>
              <tr>
                <th className={style.detailth}>&nbsp;전화번호</th>
                <td className={style.detailtd}>&nbsp;{patientBoard.patientPhone}</td>
                <th className={style.detailth}>&nbsp;성별</th>
                <td className={style.detailtd}>&nbsp;{patientBoard.patientSex === 'Female' ? ("여"):("남")}</td>
              </tr>
              <tr>
                <th className={style.detailth}>&nbsp;담당의사</th>
                <td className={style.detailtd}>&nbsp;{patientBoard.doctorName}</td>
                <th className={style.detailth}>&nbsp;진료실</th>
                <td className={style.detailtd}>&nbsp;{patientBoard.doctorOffice}</td>
              </tr>
              <tr>
                <th className={style.detailth}>&nbsp;예약날짜</th>
                <td className={style.detailtd}>&nbsp;{patientBoard.rDate}</td>
                <th className={style.detailth}>&nbsp;예약시간</th>
                <td className={style.detailtd}>&nbsp;{patientBoard.rTime}</td>
              </tr>

            </tbody>
          </table>
        </Modal.Body>
        <Modal.Footer>
        <Link className={style.link_white} to="/createReception">
          <Button style={{backgroundColor:'#4dabf7'}} onClick={updateReception}>
          수정
          </Button>
          </Link>
          <Button style={{backgroundColor:'#f74d4d'}} onClick={props.handleClose1}>
            닫기
          </Button>
        </Modal.Footer>
        <style jsx="true" global="true">{`
            .custom-modal {
              font-family: "DoHyeon-Regular"; 
            }
          `}
        </style>
      </Modal>
  )
}

export default CheckReception;