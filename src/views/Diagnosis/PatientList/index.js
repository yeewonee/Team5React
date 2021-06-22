import React from "react";
import style from "./patientlist.module.css";
import { getPatientList } from "../data";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { createSetPidAction } from "redux/pastrecord-reducer";
import CommonTable from "views/table/CommonTable";
import CommonTableRow from "views/table/CommonTableRow";
import CommonTableColumn from "views/table/CommonTableColumn";

export const PatientList = (props) => {

  const patientList = getPatientList(props.day);

  const [keyword, setKeyword] = useState("");
  const keywordChange = (event) => {
    setKeyword(event.target.value);
  };

  const keywordButton = (event) => {
    //검색 버튼을 눌렀을 때 back-end로 전달
  };

  const dispatch = useDispatch();
  const patientSelect = (event, id) => {
    dispatch(createSetPidAction(id));
  };

  return (
    <div>
      <div className={style.patientlist_container}>
        <div className="input-group m-1">
          <input type="text" name="keyword" onChange={keywordChange} value={keyword} />
          <div className="input-group-append">
            <button onClick={keywordButton} className="btn btn-outline-secondary btn-sm" type="button">
              검색
            </button>
            <p>{keyword}</p>
          </div>
        </div>

        <div className={style.p_list}>
          <CommonTable headersName={["회원번호", "이름", "생년월일", "휴대전화번호", ""]}>
            {patientList.map((patient) => (
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
