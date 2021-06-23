import React from "react";
import { useSelector } from "react-redux";
import { Cal } from "./Cal";
import style from "./diagnosis.module.css";
import { InspectionList } from "./InspectionList";
import { InspectionResult } from "./InspectionResult";
import { MedicineList } from "./MedicineList";
import { MedicineResult } from "./MedicineResult";
import { Memo } from "./Memo";
import { PastRecord } from "./PastRecord";
import { PatientList } from "./PatientList";

function Diagnosis(props) {
  const day = useSelector((state) => {
    return state.diagnosisReducer.day;
  });

  //추가된 약 목록
  const mList = useSelector((state) => {
    return state.diagnosisReducer.mlist;
  });

  //추가된 검사 목록
  const iList = useSelector((state) => {
    return state.diagnosisReducer.ilist;
  });

  //환자 선택
  const patientId = useSelector((state) => {
    return state.diagnosisReducer.pId;
  })

  return (
    <div style={{ fontFamily: "DoHyeon-Regular" }}>
      <div className={style.d_container}>
        <div className="d-flex justify-content-center">
          <div className={style.left_container}>
            <div className="d-flex justify-content-center">
              <div className={`${style.memo} m-1`}>
                <div className={style.title}>
                  <p className={style.title_p}>환자 메모</p>
                </div>
                <Memo />
              </div>
          
              <div className={`${style.calendar_container} m-1`}>
                <div className={style.calendar}>
                  <div className="d-flex justify-content-between">
                    <p className={style.title_p}>달력</p>
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
                  <p className={style.title_p}>약 목록</p>
                </div>
                <MedicineList mList={mList}/>
              </div>
              <div className={`${style.left_list_size} m-1`}>
                <div className={style.title}>
                  <p className={style.title_p}>검사 목록</p>
                </div>
                <InspectionList iList={iList}/>
              </div>
            </div>

            <div className="d-flex justify-content-center">
              <div className={`${style.left_list_size} m-1`}>
                <div className={style.title}>
                  <p className={style.title_p}>약 처방</p>
                </div>
                <MedicineResult mList={mList}/>
              </div>
              <div className={`${style.left_list_size} m-1`}>
                <div className={style.title}>
                  <p className={style.title_p}>검사 처방</p>
                </div>
                <InspectionResult iList={iList}/>
              </div>
            </div>
          </div>

          <div className={style.right_container}>
            <div className={`${style.patientlist} m-1`}>
              <div className={style.title}>
                <p className={style.title_p}>환자 리스트</p>
              </div>
              <PatientList day={day}/>

              <div className={`${style.past_container} mr-2`}>
                <div className="d-flex justify-content-center">
                  <div className={`${style.past_container2} mt-1`}>
                    <div className={style.title}>
                      <p className={style.title_p}>과거 기록</p>
                    </div>
                    <PastRecord patientId={patientId} day={day} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Diagnosis;
