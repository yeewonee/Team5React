import React from "react";
import style from "./patientlist.module.css";
import { getPatientList, getPatientSearchList, getPatientName } from "../data";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createSetPidAction } from "redux/diagnosis-reducer";
import CommonTable from "views/table/CommonTable";
import CommonTableColumn from "views/table/CommonTableColumn";
import { useEffect } from "react";

import { BsFillPersonDashFill } from "react-icons/bs";


export const PatientList = (props) => {
  const originPList = getPatientList(props.day);
  //검색에 맞는 결과를 보여주는 상태
  const [showPList, setShowPList] = useState(originPList);

  useEffect(() => {
    setShowPList(originPList);
  }, [props]); //날짜 

  const [keyword, setKeyword] = useState("");
  const keywordChange = (event) => {
    setKeyword(event.target.value);
  };

  const keywordButton = (event) => {
    const keywordPList = getPatientSearchList(props.day, keyword);
    //보여줄 리스트를 상태에 저장
    if (keyword === "") {
      setShowPList(originPList);
    } else {
      setShowPList(keywordPList);
    }
  };

  const dispatch = useDispatch();
  //선택된 환자의 id를 저장
  const patientSelect = (event, id) => {
    dispatch(createSetPidAction(id));
  };

  const selectPatient = useSelector((state) => {
    return state.diagnosisReducer.pId;
  })

  return (
    <div>
      <div className={style.patientlist_container}>
        <div className="d-flex justify-content-between">
          <div className="input-group m-1">
            <input type="text" name="keyword" onChange={keywordChange} value={keyword}/>
            <div className="input-group-append">
              <button onClick={keywordButton} className="btn btn-outline-secondary btn-sm" type="button">
                검색
              </button>
            </div>
          </div>
        </div>

        {showPList.length !== 0 ?
           <div className={style.p_list}>
           <CommonTable headersName={["회원번호", "이름", "생년월일", "휴대전화번호", ""]} tstyle={"table table-sm"}>
             {showPList.map((patient) => (
               <tr key={patient.patientId} className={patient.patientId === selectPatient ? style.select_Color : style.basic_Color}>
                 <CommonTableColumn>{patient.patientId}</CommonTableColumn>
                 <CommonTableColumn>{patient.patientName}</CommonTableColumn>
                 <CommonTableColumn>{patient.patientSsn1}</CommonTableColumn>
                 <CommonTableColumn>{patient.patientPhone}</CommonTableColumn>
                 <CommonTableColumn>
                   <button
                     className="btn btn-outline-dark btn-sm"
                     onClick={(event) => {
                      //선택한 환자를 저장하는 이벤트
                      patientSelect(event, patient.patientId);
                     }}
                   >
                     선택
                   </button>
                 </CommonTableColumn>
               </tr>
             ))}
           </CommonTable>
         </div>
        :
          <div className={style.p_list}>
            <div style={{borderTop:'1px solid #e7f5ff', height:'100%'}}>
              <div style={{paddingLeft:'45%', paddingTop:'10%'}}>
                <BsFillPersonDashFill size={'5em'}/>
              </div>
              <p style={{textAlign:'center', fontSize:'2em'}}>일치하는 환자가 없습니다.</p>
            </div>
          </div>
        }
       

      </div>
    </div>
  );
};
