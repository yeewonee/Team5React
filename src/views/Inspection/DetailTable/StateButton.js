import React, { useEffect } from "react";
import classNames from "classnames/bind";
import style from "./StateButton.module.css";
import { useDispatch, useSelector } from "react-redux";
import { UpdatePstatusAction, UpdateStatusAction } from "redux/inspection_Reducer";
import { patientInspect, updateaInspect, updateInspect } from "../data";
import { useState } from "react";

const cx = classNames.bind(style);

export const StateButton = (props) => {
  const buttonName = props.value;
  const checkList = useSelector((state) => state.inspectReducer.checked);
  const dispatch = useDispatch();
  const changeValue = props.change;
  const dcheck = props.checkfun;
  const patient = useSelector((state) => state.inspectReducer.patient);

  const inspectList = props.list;

  const changeState = (props) => {
    //버튼 예외처리
    if (patient.tstatus === "완료") {
      console.log("완료");
      alert("완료된 검사입니다");
      return;
    }
    if (patient.tstatus === "대기") {
      console.log("대기");
      if (changeValue === "완료") {
        alert("검사를 먼저 진행해주세요");
        return;
      }
    }

    if (checkList.length > 1) {
      console.log("여러개");
      if (changeValue === "접수") {
        alert("바코드 출력은 중복이 될 수 없습니다.");
        return;
      }
    }

    for (let i = 0; i < checkList?.length; i++) {
      if (inspectList[i].istatus === "접수") {
        if (changeValue === "접수") {
          alert("현재 검사가 진행중입니다.");
          return;
        }
      }
      if (checkList[i].istatus === "대기") {
        if (changeValue === "완료") {
          alert("검사를 먼저 진행해주세요");
          return;
        }
      }
      if (checkList[i].istatus === "완료") {
        if (changeValue === "대기" || changeValue === "접수") {
          alert("완료된 검사입니다");
          return;
        }
      }
      //Modal
      if (changeValue === "접수") {
        props.openModal();
      }
    }

    updateInspect(checkList, changeValue);
    dispatch(UpdateStatusAction());
    dcheck();

    const arr = [];
    const arr2 = [];
    let value = "";
    for (let i = 0; i < inspectList?.length; i++) {
      if (inspectList[i].istatus === "완료") {
        arr.push(inspectList[i]);
      } else if (inspectList[i].istatus === "접수") {
        patientInspect(patient?.pno, "진행중");
        value = "진행중";
        dispatch(UpdatePstatusAction(value));
      } else if (inspectList[i].istatus === "대기") {
        arr2.push(inspectList[i]);
      }
    }

    if (arr.length && arr.length === inspectList.length) {
      patientInspect(patient?.pno, "완료");
      value = "완료";
      dispatch(UpdatePstatusAction(value));
    }
    if (arr2.length && arr2.length === inspectList.length) {
      patientInspect(patient?.pno, "대기");
      value = "대기";
      dispatch(UpdatePstatusAction(value));
    }
    console.log(value);
  };

  return (
    <div>
      <input type="button" className={cx(style.stateButton)} value={buttonName} onClick={() => changeState(props)} />
    </div>
  );
};
