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
import { getPastIlist, getPastMlist, getPastMemo } from "apis/diagnosis";

export const ModalPast = (props) => {
  console.log("과거 기록 하위 렌더링")

  const closeModal = () => {
    props.closeModal();
  };

   //과거 검사 정보
   const [iResultList, setIresultList] = useState([]);
   const getIresultList = async() => {
     try {
       if(props.patient.patientId !== "" && props.dDate !== ""){
        const promise = await getPastIlist(props.patient.patientId, props.dDate);
        setIresultList(promise.data);
       }
     } catch (error) {
       console.log(error);
     }
   };

   //과거 약 처방 정보
   const [mResultList, setMresultList] = useState([]);
   const getMresultList = async() => {
    try {
      if(props.patient.patientId !== "" && props.dDate !== ""){
       const promise = await getPastMlist(props.patient.patientId, props.dDate);
       setMresultList(promise.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  //과거 메모 정보
   const [memo, setMemo] = useState([]);
   const getMemo = async() => {
    try {
      if(props.patient.patientId !== "" && props.dDate !== ""){
       const promise = await getPastMemo(props.patient.patientId, props.dDate);
       setMemo(promise.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

   useEffect(()=>{
    getIresultList(); //모달창이 열림과 동시에 과거 검사 기록 가져오기
    getMresultList();
    getMemo();
   }, [props.dDate])

  //중복되는 묶음코드를 하나만 보여주기 위한 함수
  let bundle = "";
  const viewBundleCode = (bundleCode) => {
    if(bundle !== bundleCode){
      bundle = bundleCode;
      return bundleCode;
    }else{
      return "";
    }
  }
  
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
        {memo.comment ? 
        <div className={style.past_memo}>
          <p style={{padding:'10px'}}>{memo.comment}</p>
        </div>
        :
        <div className={style.past_memo}>
          <p style={{padding:'10px'}}>결과가 없습니다.</p>
        </div>
        }
        <div className={style.past_title}><BsCardChecklist /> 결과 확인</div>
        <hr />

        <div className={style.past_title2}>검사 결과</div>
        {iResultList.length !== 0 ? 
        <CommonTable headersName={["묶음코드", "처방코드", "검사명", "검사담당자", "결과"]} tstyle={"table table-sm table-striped"}>
          {iResultList.map((iResultList, index) => (
            <CommonTableRow key={index}>
              <CommonTableColumn>{viewBundleCode(iResultList.bundleCode)}</CommonTableColumn>
              <CommonTableColumn>{iResultList.iId}</CommonTableColumn>
              <CommonTableColumn>{iResultList.iName}</CommonTableColumn>
              <CommonTableColumn>{iResultList.inspector}</CommonTableColumn>
              <CommonTableColumn>{iResultList.iResult}</CommonTableColumn>
            </CommonTableRow>
          ))}
        </CommonTable>
         :
         <CommonTable headersName={["결과"]} tstyle={"table table-sm table-striped"}>
               <CommonTableColumn>결과가 없습니다.</CommonTableColumn>
         </CommonTable>
         }

        <div className={style.past_title2}>약 처방</div>
        {mResultList.length !== 0 ? 
        <CommonTable headersName={["코드", "명칭", "구분", "단위"]} tstyle={"table table-sm table-striped"}>
          {mResultList.map((mResultList, index) => (
            <CommonTableRow key={mResultList.mId}>
              <CommonTableColumn>{mResultList.mId}</CommonTableColumn>
              <CommonTableColumn>{mResultList.mName}</CommonTableColumn>
              <CommonTableColumn>{mResultList.mCategory}</CommonTableColumn>
              <CommonTableColumn>{mResultList.mUnit}</CommonTableColumn>
            </CommonTableRow>
          ))}
        </CommonTable>
        :
        <CommonTable headersName={["결과"]} tstyle={"table table-sm table-striped"}>
              <CommonTableColumn>결과가 없습니다.</CommonTableColumn>
        </CommonTable>
        }
        
      </Modal>
    </>
  )
}
