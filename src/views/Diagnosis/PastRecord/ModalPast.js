import Modal from "./Modal";
import React, { useEffect, useState } from 'react'
import style from "./pastrecord.module.css";
import CommonTable from "views/table/CommonTable";
import CommonTableRow from "views/table/CommonTableRow";
import CommonTableColumn from "views/table/CommonTableColumn";

import { BsPerson } from "react-icons/bs";
import { BsLayoutTextSidebarReverse } from "react-icons/bs";
import { BsFileEarmarkText } from "react-icons/bs";
import { BsCardChecklist } from "react-icons/bs";
import { getPatient } from "../data";

export const ModalPast = (props) => {

  const closeModal = () => {
    props.closeModal();
  };


  return (
    <>
      {/* 과거기록 상세보기 modal */}
      <Modal open={props.modalOpen} close={closeModal} header="검사결과 확인">
        <div className={style.past_title}><BsPerson /> 환자 정보</div>
        <CommonTable headersName={["환자번호", "환자이름", "주민번호"]} tstyle={"table table-sm table-striped"}>
            <CommonTableColumn>{props.patient.patientId}</CommonTableColumn>
            <CommonTableColumn>{props.patient.patientName}</CommonTableColumn>
            <CommonTableColumn>{props.patient.patientSsn1}</CommonTableColumn>
        </CommonTable>

        <div className={style.past_title}><BsLayoutTextSidebarReverse /> 내원일 정보</div>
        <CommonTable headersName={["내원일자"]} tstyle={"table table-sm"}>
          <CommonTableRow>
            <CommonTableColumn>{props.dDate}</CommonTableColumn>
          </CommonTableRow>
        </CommonTable>

        <div className={style.past_title}><BsFileEarmarkText /> 메모</div>
        <div className={style.past_memo}>
          <p style={{padding:'10px'}}>{props.memo}</p>
        </div>

        <div className={style.past_title}><BsCardChecklist /> 결과 확인</div>
        <hr />

        <div className={style.past_title2}>검사 결과</div>
        <CommonTable headersName={["처방코드", "검사명", "검사담당자", "결과"]} tstyle={"table table-sm table-striped"}>
          {props.iResultList.map((iResultList, index) => (
            <CommonTableRow key={iResultList.iId}>
              <CommonTableColumn>{iResultList.iId}</CommonTableColumn>
              <CommonTableColumn>{iResultList.iName}</CommonTableColumn>
              <CommonTableColumn>{iResultList.inspector}</CommonTableColumn>
              <CommonTableColumn>{iResultList.iResult}</CommonTableColumn>
            </CommonTableRow>
          ))}
        </CommonTable>

        <div className={style.past_title2}>약 처방</div>
        <CommonTable headersName={["코드", "명칭", "구분", "단위"]} tstyle={"table table-sm table-striped"}>
          {props.mResultList.map((mResultList, index) => (
            <CommonTableRow key={mResultList.mId}>
              <CommonTableColumn>{mResultList.mId}</CommonTableColumn>
              <CommonTableColumn>{mResultList.mName}</CommonTableColumn>
              <CommonTableColumn>{mResultList.mCategory}</CommonTableColumn>
              <CommonTableColumn>{mResultList.mUnit}</CommonTableColumn>
            </CommonTableRow>
          ))}
        </CommonTable>
        
      </Modal>
    </>
  )
}
