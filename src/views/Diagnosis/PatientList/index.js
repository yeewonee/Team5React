import React from "react";
import style from "./patientlist.module.css";
import { getPatientList, getPatientSearchList, getPatientName } from "../data";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createSetPidAction } from "redux/diagnosis-reducer";
import CommonTable from "views/table/CommonTable";
import CommonTableRow from "views/table/CommonTableRow";
import CommonTableColumn from "views/table/CommonTableColumn";
import { useEffect } from "react";

export const PatientList = (props) => {
  const originPList = getPatientList(props.day);
  const [showPList, setShowPList] = useState(originPList);

  useEffect(() => {
    setShowPList(originPList);
  }, [props]);

  const [keyword, setKeyword] = useState("");
  const keywordChange = (event) => {
    setKeyword(event.target.value);
  };

  const keywordButton = (event) => {
    const keywordPList = getPatientSearchList(props.day, keyword);

    if (keyword === "") {
      setShowPList(originPList);
    } else {
      setShowPList(keywordPList);
    }
  };

  const dispatch = useDispatch();
  const patientSelect = (event, id) => {
    dispatch(createSetPidAction(id));
  };

  const selectPatient = useSelector((state) => {
    return state.diagnosisReducer.pId;
  })

  const selectPname = getPatientName(selectPatient);

  const onKeyPress = (event) => {
    if(event.key = 'Enter'){
      keywordButton();
    }
  }

  return (
    <div>
      <div className={style.patientlist_container}>
        <div className="d-flex justify-content-between">
          <div className="input-group m-1">
            <input type="text" name="keyword" onChange={keywordChange} value={keyword} onKeyPress={onKeyPress}/>
            <div className="input-group-append">
              <button onClick={keywordButton} className="btn btn-outline-secondary btn-sm" type="button">
                검색
              </button>
            </div>
          </div>
          <div className="mr-1 mt-1">
            <p style={{width:"130px", margin:"0px", marginTop:"5px"}}>선택된 환자: {selectPname}</p>
          </div>
        </div>

        <div className={style.p_list}>
          <CommonTable headersName={["회원번호", "이름", "생년월일", "휴대전화번호", ""]} tstyle={"table table-sm"}>
            {showPList.map((patient) => (
              <CommonTableRow key={patient.patientId}>
                <CommonTableColumn>{patient.patientId}</CommonTableColumn>
                <CommonTableColumn>{patient.patientName}</CommonTableColumn>
                <CommonTableColumn>{patient.patientSsn1}</CommonTableColumn>
                <CommonTableColumn>{patient.patientPhone}</CommonTableColumn>
                <CommonTableColumn>
                  <button
                    className="btn btn-info btn-sm"
                    onClick={(event) => {
                      patientSelect(event, patient.patientId);
                    }}
                  >
                    선택
                  </button>
                </CommonTableColumn>
              </CommonTableRow>
            ))}
          </CommonTable>
        </div>
      </div>
    </div>
  );
};
