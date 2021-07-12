import React, { useCallback } from "react";
import style from "./pastrecord.module.css";
import { useState } from "react";
import CommonTable from "views/table/CommonTable";
import { getPatient, getPastRecordList, getInspectionCompareList } from "apis/diagnosis";
import CommonTableRow from "views/table/CommonTableRow";
import CommonTableColumn from "views/table/CommonTableColumn";
import { useEffect } from "react";
import { ModalPast } from "./ModalPast";
import { useDispatch, useSelector } from "react-redux";
import { createSetAddIlistAction, createSetAddMlistAction, createSetPidAction, createSetRidAction } from "redux/diagnosis-reducer";
import { sendMqttMessage } from "apis/diagnosis";
import axios from "axios";

export const PastRecord = React.memo((props) => {

  //진료 완료 로딩
  const changeLoading = useCallback((result) => {
    props.changeLoading(result);
  }, [props]);

  console.log("과거 기록 상위 렌더링")
  
  //환자 번호
  const patientId = useSelector((state) => {
    return state.diagnosisReducer.pId;
  })

  //예약 번호
  const receptionId = useSelector((state) => {
    return state.diagnosisReducer.rId;
  })

  //약 목록
  const medicineList = useSelector((state) => {
    return state.diagnosisReducer.mlist;
  });

  //검사 목록
  const inspectionList = useSelector((state) => {
    return state.diagnosisReducer.ilist;
  });

  //메모
  const comment = useSelector((state) => {
    return state.diagnosisReducer.comment;
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
    getInspectCompareList();
  }, [patientId]);

    //이미 검사 예정인 환자 리스트 (예외처리)
    const [inspectCompare, setInspectCompare] = useState([]);
    const getInspectCompareList = async() => {
      try {
          const promise = await getInspectionCompareList();
          setInspectCompare(promise.data);
      } catch (error) {
        console.log(error);
      }
    };
  
  //예외처리 검사 상태
  const [exception, setException] = useState(true);
  useEffect(()=> {
    for(let i=0; i<inspectCompare.length; i++){
      if(inspectCompare[i].pId === patientId){
        setException(false);
        break;
      }
    }
  }, [inspectCompare])

  useEffect(()=>{
    getInspectCompareList();
  }, [exception])

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
  
  let diagnosisInfo = {
    comment,
    patientId,
    medicineList,
    inspectionList,
    receptionId
  };

  const [pubMessage, setPubMessage] = useState({
    topic: "/main/inspection"
  });

  
  const sendDiagnosis = async() => {  
    if(patientId){
      if(exception === true){
        changeLoading(true)
        await axios.post("/diagnosis/pushdiagnosis", diagnosisInfo)
        .then(() => {
          dispatch(createSetAddMlistAction([]));
          dispatch(createSetAddIlistAction([]));
          dispatch(createSetPidAction(""));
          dispatch(createSetRidAction(""));
          changeLoading(false)
        });
        await sendMqttMessage(pubMessage);
      }else{
        alert("이미 진료가 완료된 환자입니다.")
        setException(true);

      }
    }else{
      alert("환자를 선택하십시오.")
    }

  
   
  };


  return (
    <div>
       <div className={style.past_table_container}>
        {pastList.length !== 0 ?
        
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
        :
        <div className={style.p_list}>
          <div style={{ borderTop: "1px solid #e7f5ff", height: "100%" }}>
            <p style={{ textAlign: "center", fontSize: "1em", marginTop:'25%' }}>과거 기록이 없습니다.</p>
          </div>
        </div>
      }
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
