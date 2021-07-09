import React, { useEffect, useRef, useState } from "react";
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
import { Loading } from "./Loading";

import { BsCardList } from "react-icons/bs";
import { BiCalendar } from "react-icons/bi";
import { BiListCheck } from "react-icons/bi";
import { BiPlusMedical } from "react-icons/bi";
import { BsCardChecklist } from "react-icons/bs";
import { BsList } from "react-icons/bs";



function Diagnosis(props) {
  console.log("최상위 index 렌더링")
  
  const [loading, setLoading] = useState(null);

  const changeLoading = (result) => {
    console.log("여기에 들어옴", result)
    setLoading(result);
  }

  
  const memo = useSelector((state) => {
    return state.diagnosisReducer.comment;
  });

  //날짜
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
  


  return (
    
    <div style={{ fontFamily: "DoHyeon-Regular" }}>
      {loading ? <Loading /> 
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
                <MedicineList mList={mList}/>
              </div>
              <div className={`${style.left_list_size} m-1`}>
                <div className={style.title}>
                  <p className={style.title_p}><BsCardChecklist /> 검사 목록</p>
                </div>
                <InspectionList iList={iList}/>
              </div>
            </div>

            <div className="d-flex justify-content-center">
              <div className={`${style.left_list_size} m-1`}>
                <div className={style.title}>
                  <p className={style.title_p}><BiPlusMedical /> 약 처방</p>
                </div>
                <MedicineResult mList={mList}/>
              </div>
              <div className={`${style.left_list_size} m-1`}>
                <div className={style.title}>
                  <p className={style.title_p}><BsCardChecklist /> 검사 처방</p>
                </div>
                <InspectionResult iList={iList}/>
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
                changeLoading={changeLoading}/>

              <div className={`${style.past_container} mr-2`}>
                <div className="d-flex justify-content-center">
                  <div className={`${style.past_container2} mt-1`}>
                    <div className={style.title}>
                      <p className={style.title_p}><BsList /> 과거 기록</p>
                    </div>
                    <PastRecord 
                      comment={memo}
                      medicineList={mList}
                      inspectionList={iList}
                      day={day}
                      changeLoading={changeLoading} />
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
