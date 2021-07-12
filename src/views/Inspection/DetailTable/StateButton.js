import React, { useEffect, useState } from "react";
import classNames from "classnames/bind";
import style from "./StateButton.module.css";
import { useDispatch, useSelector } from "react-redux";
import { UpdatePstatusAction, UpdateStatusAction } from "redux/inspection_Reducer";
import axios from "axios";
import Swal from 'sweetalert2'

const cx = classNames.bind(style);

export const StateButton = (props) => {
  const buttonName = props.value;
  //대기,완료,접수
  const changeValue = props.change;
  const dcheck = props.checkfun;
  const checkList = useSelector((state) => state.inspectReducer.checked);
  const dispatch = useDispatch();
  const patient = useSelector((state) => state.inspectReducer.patient);
  const inspectList = props.list;

  

  const updateInspect = async(checkList,changeValue)=>{
     await axios.put("/inspection/updateInspect/"+changeValue,checkList[0])
  }

  const patientInspect = async(dId,totalIstatus)=>{
    const diagnosis = {
      dId,totalIstatus
    }
    await axios.put("inspection/updatePinspect/",diagnosis)
  }

 
  
  const changeState = (props) => {
    if(checkList.length===0){
      Swal.fire({
        icon: 'error',
        text: '항목을 선택해주세요',
        confirmButtonColor: '#3085d6'
      })
      return
    }
    //버튼 예외처리
    if (patient.tstatus === "완료") {
      Swal.fire({
        icon: 'error',
        text: '완료된 검사입니다',
        confirmButtonColor: '#3085d6'
      })
      return;
    }
    if (patient.tstatus === "대기") {
      if (changeValue === "완료") {
        Swal.fire({
          icon: 'error',
          text: '검사를 진행해주세요.',
          confirmButtonColor: '#3085d6'
        })
        return;
      }
    }

    if (checkList.length > 1) {
      console.log("여러개");
      if (changeValue === "접수") {
        Swal.fire({
          icon: 'error',
          text: '단일 접수만 가능합니다.',
          confirmButtonColor: '#3085d6'
        })
        return;
      }
    }

    for (let i = 0; i < checkList?.length; i++) {
      if (inspectList[i].iStatus === "접수") {
        if (changeValue === "접수") {
          Swal.fire({
            icon: 'error',
            text: '검사가 진행중입니다.',
            confirmButtonColor: '#3085d6'
          })
          return;
        }
      }
      if (checkList[i].iStatus === "대기") {
        if (changeValue === "완료") {
          Swal.fire({
            icon: 'error',
            text: '검사를 진행해주세요',
            confirmButtonColor: '#3085d6'
          })
          return;
        }
        if(changeValue ==="대기"){
          Swal.fire({
            icon: 'error',
            text: '대기 중인 상태입니다.',
            confirmButtonColor: '#3085d6'
          })
          return;
        }
      }
      if (checkList[i].iStatus === "완료") {
        if (changeValue === "대기" || changeValue === "접수") {
          Swal.fire({
            icon: 'error',
            text: '완료된 검사입니다',
            confirmButtonColor: '#3085d6'
          })
          return;
        }
        if(changeValue==="완료"){
          Swal.fire({
            icon: 'error',
            text: '이미 완료된 검사입니다.',
            confirmButtonColor: '#3085d6'
          })
        }
      }
      if (checkList[i].iStatus === "접수") {
        if(changeValue==="접수"){
          Swal.fire({
            icon: 'error',
            text: '이미 진행중인 검사입니다.',
            confirmButtonColor: '#3085d6'
          })
          return;
        }
      }
      //Modal
      if (changeValue === "접수") {
        props.openModal();
      }
    }

    updateInspect(checkList, changeValue);
   
    //리덕스에 저장된 체크한 검사들의 객체 상태를 비워줌
    dispatch(UpdateStatusAction());
    for(let i =0; i<inspectList.length; i++){
      if(checkList[0]?.iId===inspectList[i].iId&&checkList[0]?.bundleCode===inspectList[i]?.bundleCode){
        inspectList[i].iStatus=changeValue;
      }
    }
 
    //props로 부모 컴포넌트에서 받은 함수
    dcheck();

    //환자 tstatus를 변경
    const arr = [];
    const arr2 = [];
    let value = "";
    for (let i = 0; i < inspectList?.length; i++) {
      if (inspectList[i].iStatus === "완료") {
        arr.push(inspectList[i]);
      } else if (inspectList[i].iStatus === "접수") {
        value = "진행중";
        patientInspect(inspectList[i].dId, value);
        
        dispatch(UpdatePstatusAction(value));
      } else if (inspectList[i].iStatus === "대기") {
        arr2.push(inspectList[i]);
      }
    }

    if (arr.length && arr.length === inspectList.length) {
      patientInspect(inspectList[0].dId, "완료");
      value = "완료";
      dispatch(UpdatePstatusAction(value));
    }
    if (arr2.length && arr2.length === inspectList.length) {
      patientInspect(inspectList[0].dId, "대기");
      value = "대기";
      dispatch(UpdatePstatusAction(value));
    }
  };

  return (
    <div>
      <input type="button" className={cx(style.stateButton)} value={buttonName} onClick={() => changeState(props)} />
    </div>
  );
};
