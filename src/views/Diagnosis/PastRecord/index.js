import React from "react";
import style from "./pastrecord.module.css";
import { useState } from "react";
import CommonTable from "views/table/CommonTable";
import { getPatient, getPastRecordList, getResultIList, getResultMList, getPastIlist } from "../data";
import CommonTableRow from "views/table/CommonTableRow";
import CommonTableColumn from "views/table/CommonTableColumn";
import { useEffect } from "react";
import { ModalPast } from "./ModalPast";
import { useDispatch, useSelector } from "react-redux";
import { createSetAddIlistAction, createSetAddMlistAction } from "redux/diagnosis-reducer";

import axios from "axios";
axios.defaults.baseURL = "http://localhost:8080";

export const PastRecord = (props) => {

  //날짜, 상세보기
  const [pastList, setPastList] = useState([]);
  const getPatientList = async() => {
    try {
      const promise = await getPastRecordList(props.patientId);
        setPastList(promise.data);
    } catch (error) {
      console.log(error);
    }
  };

  //환자 정보
  const [patient, setPatient] = useState([]);
  const getSelectPatient = async() => {
    try {
      console.log(props.patientId)
      if(props.patientId !== ""){
        const promise = await getPatient(props.patientId);
        setPatient(promise.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getPatientList();
    getSelectPatient();
  }, [props.patientId]);

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


  const comment = useSelector((state) => {
    return state.diagnosisReducer.comment;
  });
  const patientId = useSelector((state) => {
    return state.diagnosisReducer.pId;
  });
  const medicineList = useSelector((state) => {
    return state.diagnosisReducer.mlist;
  });
  const inspectionList = useSelector((state) => {
    return state.diagnosisReducer.ilist;
  });
  const receptionId = useSelector((state) => {
    return state.diagnosisReducer.rId;
  });
  
  let diagnosisInfo = {
    comment,
    patientId,
    medicineList,
    inspectionList,
    receptionId
  };

  const sendDiagnosis = async() => {  
    await axios.post("/diagnosis/pushdiagnosis", diagnosisInfo)
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
};
