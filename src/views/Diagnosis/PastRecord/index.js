import React from "react";
import style from "./pastrecord.module.css";
import Modal from "./pastModal";
import { useState } from "react";
import CommonTable from "views/table/CommonTable";
import { getPastRecord, getPatient, getResultIList, getResultMList } from "../data";
import CommonTableRow from "views/table/CommonTableRow";
import CommonTableColumn from "views/table/CommonTableColumn";
import { useEffect } from "react";

export const PastRecord = (props) => {
  const [modalOpen, setModalOpen] = useState(false);

  const openModal = () => {
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

  let iResultList = getResultIList(props.patientId);

  let mResultList = getResultMList(props.patientId);

  return (
    <div>
      <div className={style.past_table_container}>
        <CommonTable headersName={["진료 날짜", "상세"]}>
          {pastList.map((plist, index) => (
            <CommonTableRow key={plist.dDate}>
              <CommonTableColumn>{plist.dDate}</CommonTableColumn>
              <CommonTableColumn>
                <button type="button" className="btn btn-dark btn-sm" onClick={openModal}>
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

      {/* 과거기록 상세보기 modal */}
      <Modal open={modalOpen} close={closeModal} header="검사결과 확인">
        <div className={style.past_title}>환자 정보</div>
        <CommonTable headersName={["환자번호", "환자이름", "주민번호"]}>
          <CommonTableRow key={patient.patientId}>
            <CommonTableColumn>{patient.patientId}</CommonTableColumn>
            <CommonTableColumn>{patient.patientName}</CommonTableColumn>
            <CommonTableColumn>{patient.patientSsn1}</CommonTableColumn>
          </CommonTableRow>
        </CommonTable>

        <div className={style.past_title}>내원일 정보</div>
        <CommonTable headersName={["내원일자"]}>
          <CommonTableRow>
            <CommonTableColumn>{pList[0]?.dDate}</CommonTableColumn>
          </CommonTableRow>
        </CommonTable>

        <div className={style.past_title}>결과 확인</div>
        <hr />

        <div className={style.past_title2}>검사 결과</div>
        <CommonTable headersName={["처방코드", "검사명", "검사담당자", "결과"]}>
          {iResultList.map((iResultList, index) => (
            <CommonTableRow key={iResultList.iId}>
              <CommonTableColumn>{iResultList.iId}</CommonTableColumn>
              <CommonTableColumn>{iResultList.iName}</CommonTableColumn>
              <CommonTableColumn>{iResultList.inspector}</CommonTableColumn>
              <CommonTableColumn>{iResultList.iResult}</CommonTableColumn>
            </CommonTableRow>
          ))}
        </CommonTable>

        <div className={style.past_title2}>약 처방</div>
        <div className={style.past_title2}>검사 결과</div>
        <CommonTable headersName={["코드", "명칭", "구분", "단위"]}>
          {mResultList.map((mResultList, index) => (
            <CommonTableRow key={mResultList.mId}>
              <CommonTableColumn>{mResultList.mId}</CommonTableColumn>
              <CommonTableColumn>{mResultList.mName}</CommonTableColumn>
              <CommonTableColumn>{mResultList.mCategory}</CommonTableColumn>
              <CommonTableColumn>{mResultList.mUnit}</CommonTableColumn>
            </CommonTableRow>
          ))}
        </CommonTable>
        
      </Modal>
    </div>
  );
};
