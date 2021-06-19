import React from "react";
import style from "./patientlist.module.css";
import {getPatientList} from "../data";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { createSetPidAction } from "redux/pastrecord-reducer";


export const PatientList = () => {

  const patientList = getPatientList();

  const [keyword, setKeyword] = useState("");
  const keywordChange = (event) => {
    setKeyword(event.target.value)
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
        <div className={style.title}>
              <p className={`${style.title_p} font-weight-bold ml-1 mb-0 pt-1`}>환자 리스트</p>
        </div>
      <div className={style.patientlist_container}>
        <div className="input-group m-1">
          <input type="text" name="keyword" onChange={keywordChange} value={keyword}/>
          <div className="input-group-append">
            <button onClick={keywordButton} className="btn btn-outline-secondary btn-sm" type="button">
              검색
            </button>
            <p>{keyword}</p>
          </div>
        </div>

        <div className={style.p_list}>
        <table className="table table-striped text-center table-sm">
          <thead>
            <tr>
              <th>회원번호</th>
              <th>이름</th>
              <th>생년월일</th>
              <th>휴대전화번호</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {patientList.map(patient=>(
                <tr key={patient.patientId}>
                  <td>{patient.patientId}</td>
                  <td>{patient.patientName}</td>
                  <td>{patient.patientSsn1}</td>
                  <td>{patient.patientPhone}</td>
                  <td><button className="btn btn-info btn-sm" onClick={(event)=>{patientSelect(event, patient.patientId)}}>선택</button></td>
                </tr>
            ))}
          </tbody>
        </table>
        </div>
      </div>
    </div>
  );
};
