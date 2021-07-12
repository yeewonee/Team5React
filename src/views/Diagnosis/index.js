import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Cal } from "./Cal";
import style from "./diagnosis.module.css";
import { InspectionList } from "./InspectionList";
import { InspectionResult } from "./InspectionResult";
import { MedicineList } from "./MedicineList";
import { MedicineResult } from "./MedicineResult";
import { Memo } from "./Memo";
import { PastRecord } from "./PastRecord";
import { PatientList } from "./PatientList";
import { Loading } from "../../Loading";
import { BsCardList } from "react-icons/bs";
import { BiCalendar } from "react-icons/bi";
import { BiListCheck } from "react-icons/bi";
import { BiPlusMedical } from "react-icons/bi";
import { BsCardChecklist } from "react-icons/bs";
import { BsList } from "react-icons/bs";
import Paho from "paho-mqtt";
import { createSetAddIlistAction, createSetAddMlistAction } from "redux/diagnosis-reducer";

function Diagnosis(props) {
  console.log("최상위 index 렌더링")
  
  const [loading, setLoading] = useState(null);

  const changeLoading = (result) => {
    setLoading(result);
  }

  //날짜
  const day = useSelector((state) => {
    return state.diagnosisReducer.day;
  });

  const [subTopic, setSubTopic] = useState("/main/diagnosis");
  const [message, setMessage] = useState("/main/diagnosis");

  let client = useRef(null);
  const connectMqttBroker = () => {
    client.current = new Paho.Client("localhost", 61614, "client-" + new Date().getTime());

    client.current.onConnectionLost = () => {
      console.log("접속 끊김");
    };

    client.current.onMessageArrived = (msg) => {
      console.log("메시지 수신"); 
      var message = JSON.parse(msg.payloadString);
      console.log(message);

      setMessage(message)
    };

    client.current.connect({onSuccess:() => {
      console.log("접속 성공");
      sendSubTopic();
    }});
  };

  const sendSubTopic = () => {
    client.current.subscribe(subTopic);
  }

  const dispatch = useDispatch();
  useEffect(() => {
    connectMqttBroker();
    return() => {
      dispatch(createSetAddMlistAction([]));
      dispatch(createSetAddIlistAction([]));
    }
  }, []);

  return (
    <div style={{ fontFamily: "DoHyeon-Regular" }}>
      {loading ? 
      <>
       <div style={{marginTop:'15%', marginLeft:'47%'}}> 
        <Loading height={90} width={90}/>
       </div> 
       <p style={{marginLeft:'48%'}}>Loading..</p> 
      </>
      :
      <div className={style.d_container}>
        <div className="d-flex justify-content-center">
          <div className={style.left_container}>
            <div className="d-flex justify-content-center" style={{height:"100%"}}>
              <div className={`${style.memo} m-1 h-100`}>
                <div className={style.title}>
                  <p className={style.title_p}><BsCardList /> 환자 메모</p>
                </div>
                <Memo />
              </div>
          
              <div className={`${style.calendar_container} m-1`}>
                <div className={style.calendar}>
                  <div className="d-flex justify-content-between">
                    <p className={style.title_p}><BiCalendar /> 달력</p>
                    <p className={`${style.title_p} pr-2`}>
                      <b>{day}</b>
                    </p>
                  </div>
                </div>
                <Cal />
              </div>
            </div>

            <div className="d-flex justify-content-center">
              <div className={`${style.left_list_size} m-1`}>
                <div className={style.title}>
                  <p className={style.title_p}><BiPlusMedical /> 약 목록</p>
                </div>
                <MedicineList changeLoading={changeLoading}/>
              </div>
              <div className={`${style.left_list_size} m-1`}>
                <div className={style.title}>
                  <p className={style.title_p}><BsCardChecklist /> 검사 목록</p>
                </div>
                <InspectionList />
              </div>
            </div>

            <div className="d-flex justify-content-center">
              <div className={`${style.left_list_size} m-1`}>
                <div className={style.title}>
                  <p className={style.title_p}><BiPlusMedical /> 약 처방</p>
                </div>
                <MedicineResult/>
              </div>
              <div className={`${style.left_list_size} m-1`}>
                <div className={style.title}>
                  <p className={style.title_p}><BsCardChecklist /> 검사 처방</p>
                </div>
                <InspectionResult />
              </div>
            </div>
          </div>

          <div className={style.right_container}>
            <div className={`${style.patientlist} m-1`}>
              <div className={style.title}>
                <p className={style.title_p}><BiListCheck /> 환자 리스트</p>
              </div>
              <PatientList 
                day={day}
                changeLoading={changeLoading}
                message={message}
                />

              <div className={`${style.past_container} mr-2`}>
                <div className="d-flex justify-content-center">
                  <div className={`${style.past_container2} mt-1`}>
                    <div className={style.title}>
                      <p className={style.title_p}><BsList /> 과거 기록</p>
                    </div>
                    <PastRecord 
                      day={day}
                      changeLoading={changeLoading}
                      />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      }
    </div>
  );
}

export default Diagnosis;
