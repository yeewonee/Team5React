import style from './rlist.module.css';
import { Button, Modal } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { createSetDate, createSetDoctor, createSetPatient, createSetStatus, createSetTime } from 'redux/createReception-reducer';
import {Link} from "react-router-dom";

const CheckReception = (props) => {
  const patientBoard = props.patientBoard;
  const dispatch = useDispatch();
  const updateReception = (event) => {
    dispatch(createSetDoctor(patientBoard.doctor_id));
    dispatch(createSetPatient(patientBoard.patient_id));
    dispatch(createSetDate(patientBoard.r_date));
    dispatch(createSetTime(patientBoard.r_time));

    dispatch(createSetStatus(0));
  }

  return(
    <Modal show={props.show1} onHide={props.handleClose1} dialogClassName="custom-modal">
        <Modal.Header closeButton>
          <Modal.Title>예약확인</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <table className="table">
            <tbody>
              <tr className={style.table}>
                <th className={style.detailth}>&nbsp;예약번호</th>
                <td className={style.detailtd}>&nbsp;{patientBoard.r_id}</td>
                <th className={style.detailth}>&nbsp;환자번호</th>
                <td className={style.detailtd}>&nbsp;{patientBoard.patient_id}</td>
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
          <Button style={{backgroundColor:'#4dabf7'}} onClick={updateReception}>
          <Link className={style.link_white} to="/createReception">수정</Link>
          </Button>
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