import React, { useCallback } from "react";
import style from "./pastrecord.module.css";
import { useState } from "react";
import CommonTable from "views/table/CommonTable";
import { getPatient, getPastRecordList } from "apis/diagnosis";
import CommonTableRow from "views/table/CommonTableRow";
import CommonTableColumn from "views/table/CommonTableColumn";
import { useEffect } from "react";
import { ModalPast } from "./ModalPast";
import { useDispatch, useSelector } from "react-redux";
import { createSetAddIlistAction, createSetAddMlistAction, createSetPidAction, createSetRidAction } from "redux/diagnosis-reducer";

import axios from "axios";
import { Loading } from "../Loading";

export const PastRecord = React.memo((props) => {

  const changeLoading = useCallback((result) => {
    props.changeLoading(result);
  }, [props]);

  console.log("과거 기록 상위 렌더링")

  
  //환자 선택
  const patientId = useSelector((state) => {
    return state.diagnosisReducer.pId;
  })

  const receptionId = useSelector((state) => {
    return state.diagnosisReducer.rId;
  })

  const medicineList = useSelector((state) => {
    return state.diagnosisReducer.mlist;
  });

  //날짜, 상세보기
  const [pastList, setPastList] = useState([]);
  const getPatientList = async() => {
    try {
      const promise = await getPastRecordList(patientId);
        setPastList(promise.data);
    } catch (error) {
      console.log(error);
    }
  };

  //환자 정보
  const [patient, setPatient] = useState([]);
  const getSelectPatient = async() => {
    try {
      if(props.patientId !== ""){
        const promise = await getPatient(patientId);
        setPatient(promise.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getPatientList();
    getSelectPatient();
  }, [patientId]);

  const [modalOpen, setModalOpen] = useState(false);

  const [dDate, setDdate] = useState("");
  const openModal = (event, day) => {
    setDdate(day);
    setModalOpen(true);
  };


  const closeModal = () => {
    setModalOpen(false);
  };

  //환자 정보
  
  const dispatch = useDispatch();
  const deleteDiagnosis = () => {
    dispatch(createSetAddMlistAction([]));
    dispatch(createSetAddIlistAction([]));
  };
  
  let comment = props.comment;
  let inspectionList = props.inspectionList;

  let diagnosisInfo = {
    comment,
    patientId,
    medicineList,
    inspectionList,
    receptionId
  };

  const sendDiagnosis = async() => {  
    changeLoading(true)
    await axios.post("/diagnosis/pushdiagnosis", diagnosisInfo)
    .then(() => {
      alert("진료가 완료되었습니다.");
      dispatch(createSetAddMlistAction([]));
      dispatch(createSetAddIlistAction([]));
      dispatch(createSetPidAction(""));
      dispatch(createSetRidAction(""));
      changeLoading(false)

    });
   
  };

  return (
    <div>
      <div className={style.past_table_container}>
      <CommonTable headersName={["진료 날짜", "상세"]} tstyle={"table table-sm"}>
        {pastList.map((plist, index) => (
          <CommonTableRow key={plist.dDate}>
            <CommonTableColumn>{plist.dDate}</CommonTableColumn>
            <CommonTableColumn>
              <button type="button" className="btn btn-outline-dark btn-sm" onClick={(event, day)=>{openModal(event, plist.dDate)}}>
                상세보기
              </button>
            </CommonTableColumn>
          </CommonTableRow>
        ))}
      </CommonTable>
    </div>
    <div className="d-flex flex-row-reverse bd-highlight pt-3">
      <button className="btn btn-outline-dark mr-3" onClick={sendDiagnosis}>전달</button>
      <button className="btn btn-outline-dark mr-3" onClick={deleteDiagnosis}>처방 초기화</button>
    </div>

    <ModalPast 
      patient={patient} 
      closeModal={closeModal}
      modalOpen={modalOpen}
      pList={pastList}
      dDate={dDate}
    />   
    </div>
  );
});
