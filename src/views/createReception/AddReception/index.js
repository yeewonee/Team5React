import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPatient } from "../PatientList/data";
import style from "./style.module.css";

function AddReception(props) {
  const patient_id = useSelector((state) => {
    return state.receptionReducer.patient_id
  });
  const patient = getPatient(patient_id);


  return(
    <>
      <div>
      <table className="table table-bordered" style={{backgroundColor: 'white', border: '1px solid red'}}>
        <tbody className={style.tb}>
          <tr>
            <th scope="col">환자번호</th>
            <td>{patient?.patient_id}</td>
          </tr>
          <tr>
            <th>환자이름</th>
            <td>{patient?.patient_name}</td>
          </tr>
          <tr>
            <th>주민등록번호</th>
            <td>{patient?.patient_ssn1}-{patient?.patient_ssn2}</td>
          </tr>
          <tr>
            <th>전화번호</th>
            <td>{patient?.patient_phone}</td>
          </tr>
          <tr>
            <th>우편번호</th>
            <td>{patient?.zip}</td>
          </tr>
          <tr>
            <th>주소</th>
            <td>{patient?.address}</td>
          </tr>
          <tr>
            <th>상세주소</th>
            <td>{patient?.address_detail}</td>
          </tr>
          <tr>
            <th>성별/나이</th>
            <td>{patient?.patient_sex} {patient?.patient_age}</td>
          </tr>
          <tr>
            <th>담당의사</th>
            <td></td>
          </tr>
          <tr>
            <th>진료실</th>
            <td></td>
          </tr>
          <tr>
            <th>예약날짜</th>
            <td></td>
          </tr>
          <tr>
            <th>예약시간</th>
            <td></td>
          </tr>
          <tr>
            <th>예약여부</th>
            <td></td>
          </tr>
        </tbody>
      </table>
  </div>
  <div style={{display: 'flex', justifyContent: 'flex-end'}}>
    <button className="btn btn-outline-dark btn-sm" style={{marginRight:'5px'}}>뒤로 가기</button>
    <button className="btn btn-outline-dark btn-sm" style={{marginRight:'5px'}}>예약 완료</button>
    <button className="btn btn-outline-dark btn-sm">접수 완료</button>
  </div> 
</>
  );
}

export default AddReception;