import React from "react";
import style from "./pastrecord.module.css";
import { useState } from "react";
import CommonTable from "views/table/CommonTable";
import { getPastRecord, getPatient, getResultIList, getResultMList } from "../data";
import CommonTableRow from "views/table/CommonTableRow";
import CommonTableColumn from "views/table/CommonTableColumn";
import { useEffect } from "react";
import { ModalPast } from "./ModalPast";

export const PastRecord = (props) => {
  const [modalOpen, setModalOpen] = useState(false);

  const [dDate, setDdate] = useState("");
  const openModal = (event, day) => {
    setDdate(day);
    setModalOpen(true);
  };
  const closeModal = () => {
    setModalOpen(false);
  };


  //날짜, 상세보기
  let pList = getPastRecord(props.patientId);
  const [pastList, setPastList] = useState(pList);

  useEffect(() => {
    setPastList(pList);
  }, [props.patientId]);

  //환자 정보
  let patient = getPatient(props.patientId);
  console.log(patient)
  let iResultList = getResultIList(props.patientId, dDate);
  let mResultList = getResultMList(props.patientId, dDate);

  return (
    <div>
      <div className={style.past_table_container}>
        <CommonTable headersName={["진료 날짜", "상세"]} tstyle={"table table-sm"}>
          {pastList.map((plist, index) => (
            <CommonTableRow key={plist.dDate}>
              <CommonTableColumn>{plist.dDate}</CommonTableColumn>
              <CommonTableColumn>
                <button type="button" className="btn btn-dark btn-sm" onClick={(event, day)=>{openModal(event, plist.dDate)}}>
                  상세보기
                </button>
              </CommonTableColumn>
            </CommonTableRow>
          ))}
        </CommonTable>
      </div>
      <div className="d-flex flex-row-reverse bd-highlight pt-3">
        <button className="btn btn-outline-dark mr-3">전달</button>
        <button className="btn btn-outline-dark mr-3">임시 저장</button>
      </div>

      <ModalPast 
        patient={patient} 
        iResultList={iResultList} 
        mResultList={mResultList}
        closeModal={closeModal}
        modalOpen={modalOpen}
        pList={pList}
        dDate={dDate}
      />      
     
    </div>
  );
};
