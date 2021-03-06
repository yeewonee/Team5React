import { useDispatch, useSelector } from "react-redux";
import style from "./style.module.css";
import moment from 'moment';
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { createSetDate, createSetDoctor, createSetPatient, createSetrId, createSetTime } from "redux/createReception-reducer";
import { insertReception, sendMqttMessage, updateReception } from "apis/createReception";
import Swal from 'sweetalert2' 

function AddReception(props) {

  const history = useHistory();
  const dispatch = useDispatch();

  const patient_id = useSelector((state) => {
    return state.createReceptionReducer.patient_id
  });
  const doctor_id = useSelector((state) => {
    return state.createReceptionReducer.doctor_id
  });
  const time = useSelector((state)=>{
    return state.createReceptionReducer.time
  });
  const date = useSelector((state) => {
    return state.createReceptionReducer.date
  });
  const r_id = useSelector((state) => {
    return state.createReceptionReducer.r_id
  });
  
  const [pubMessage, setPubMessage] = useState({
    topic: "/main/diagnosis"
  });
  const [pubMessage2, setPubMessage2] = useState({
    topic: "/main/reception"
  });

  const patientList = props.pdata; //환자리스트 받기
  const doctorList = props.ddata; //의사리스트 받기
  const todayReceptionList = props.rdate; //오늘 예약 리스트 받기

  let clickPatient = patientList.filter((list)=>list.patientId === patient_id);
  const patient = clickPatient[0]
 
  let clickDoctor = doctorList.filter((list)=>list.doctorId === doctor_id);
  const doctor = clickDoctor[0]
  
  //신규로 접수하는 경우 (예약/접수 버튼으로 들어온 경우)
  const handleReception = async (event) => {
    if(date === "" || doctor_id === "" || patient_id === ""||time ===""){ //하나라도 선택 안하는 경우 예외처리
      Swal.fire({
        icon: 'error',
        text: '모든 값을 선택하지 않으면 예약할 수 없습니다.',
        confirmButtonColor: '#3085d6'
      })
      return;
    }

    for(let i=0; i<todayReceptionList.length; i++){ //같은 날짜에 같은 환자 접수 불가능 예외처리
      if(patient_id === todayReceptionList[i].patientId){
        Swal.fire({
          icon: 'warning',
          text: '오늘 이미 접수된 환자입니다.',
          confirmButtonColor: '#3085d6'
        })
        return
      }
    }

    const reception = {};
    if(time === '방문접수'){ //방문접수인 경우
      reception.rTime = moment().format('HH:mm');
      reception.rRole = '방문접수'
      reception.rStatus = '접수완료'
      reception.rDate = date;
      reception.doctorId = doctor_id;
      reception.patientId = patient_id;

      await insertReception(reception);
      await sendMqttMessage(pubMessage);
      await sendMqttMessage(pubMessage2);
      Swal.fire({
        icon: 'success',
        text: '접수가 완료 됐습니다.',
        confirmButtonColor: '#3085d6'
      })
    }    
    else {//예약접수인 경우
      reception.rTime = time;
      reception.rRole = "예약접수";
      reception.rStatus ='접수대기';
      reception.rDate = date;
      reception.doctorId = doctor_id;
      reception.patientId = patient_id;

      await insertReception(reception);
      await sendMqttMessage(pubMessage2);
      Swal.fire({
        icon: 'success',
        text: '접수가 완료 됐습니다.',
        confirmButtonColor: '#3085d6'
      })
    }
    //등록완료 후에 리덕스 모든 값 비워주기
    dispatch(createSetPatient(''));
    dispatch(createSetDoctor(''));
    dispatch(createSetDate(''));
    dispatch(createSetTime(''));

  };

  //수정 버튼을 통해 들어온 경우
  const handleUpdate = async() => {

    if(date === "" || doctor_id === "" || time ===""){ //하나라도 선택 안하는 경우 예외처리
      Swal.fire({
        icon: 'error',
        text: '모든 값을 선택하지 않으면 예약을 수정할 수 없습니다.',
        confirmButtonColor: '#3085d6'
      })
      return;
    }

    const reception = {};
    reception.rId = r_id;
    reception.doctorId = doctor_id;
    reception.rDate = date;
    reception.rTime = time;
    reception.rRole = "예약접수";
    reception.rStatus ='접수대기';
    await updateReception(reception);

        //수정완료 후에 리덕스 모든 값 비워주기
        dispatch(createSetPatient(''));
        dispatch(createSetDoctor(''));
        dispatch(createSetDate(''));
        dispatch(createSetTime(''));
        dispatch(createSetrId(''));
    await sendMqttMessage(pubMessage2);
    Swal.fire({
      icon: 'success',
      text: '수정이 완료 됐습니다.',
      confirmButtonColor: '#3085d6'
    })
    history.goBack();
  };

  return(
    <>
      <div>
      <table className="table table-bordered" style={{backgroundColor: 'white'}}>
        <tbody className={style.tb}>
          <tr>
            <th scope="col">환자번호</th>
            <td>{patient?.patientId}</td>
          </tr>
          <tr>
            <th>환자이름</th>
            <td>{patient?.patientName}</td>
          </tr>
          <tr>
            <th>주민등록번호</th>
            <td>{patient?.patientSsn1} {patient?.patientSsn2}</td>
          </tr>
          <tr>
            <th>전화번호</th>
            <td>{patient?.patientPhone}</td>
          </tr>
          <tr>
            <th>우편번호</th>
            <td>{patient?.patientZip}</td>
          </tr>
          <tr>
            <th>주소</th>
            <td>{patient?.address}</td>
          </tr>
          <tr>
            <th>상세주소</th>
            <td>{patient?.addressDetail}</td>
          </tr>
          <tr>
            <th>성별/나이</th>
            <td>{patient?.patientSex} {patient?.patientAge}</td>
          </tr>
          <tr>
            <th>담당의사</th>
            <td>{doctor?.doctorName}</td>
          </tr>
          <tr>
            <th>진료실</th>
            <td>{doctor?.doctorOffice}</td>
          </tr>
          <tr>
            <th>예약날짜</th>
            <td>{date}</td>
          </tr>
          <tr>
            <th>예약시간</th>
            {time === '방문접수'?
            <td>{moment().format('HH:mm')}</td>
          :
            <td>{time}</td>
          }
          </tr>
          <tr>
            <th>예약여부</th>
            {time === '방문접수'?
            <td>방문접수</td>
          :
            <td>예약접수</td>
          }
          </tr>
        </tbody>
      </table>
  </div>
  <div style={{display: 'flex', justifyContent: 'flex-end', height:'25px'}}>
    <Link to="/reception" className="btn btn-outline-dark btn-sm" style={{marginRight:'7px', height:'4vh'}}>뒤로 가기</Link>
    { r_id === ''?
      <button className="btn btn-outline-dark btn-sm" style={{marginRight:'7px', height:'4vh'}} onClick={handleReception}>등록 완료</button>
    :
      <button className="btn btn-outline-dark btn-sm" style={{marginRight:'7px', height:'4vh'}} onClick={handleUpdate}>수정 완료</button>
    }
  </div> 
</>
  );
}

export default AddReception;