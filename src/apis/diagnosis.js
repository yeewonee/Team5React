import axios from "axios";

export function getMedicineList(){
  const promise = axios.get("/api/diagnosis/medicines");
  return promise;
}

export function getInspectList(){
  const promise = axios.get("/api/diagnosis/inspectionlist")
  return promise;
}

export function getInspectAllList(){
  const promise = axios.get("/api/diagnosis/inspections")
  return promise;
}

export function getPatientList(day){
  const promise = axios.get("/api/diagnosis/patientlist", {params:{day}})
  return promise;
}

export function getPastRecordList(pId){
  const promise = axios.get("/api/diagnosis/pastrecord", {params:{pId}})
  return promise;
}

export function getPatient(pId){
  if(pId !== ""){
    const promise = axios.get("/api/diagnosis/selectpatient", {params:{pId}})
    return promise;
  }
  
}

export function getPastIlist(pId, day){
  const promise = axios.get("/api/diagnosis/pastrecordilist", {params:{pId, day}})
  return promise;
}

export function getPastMlist(pId, day){
  const promise = axios.get("/api/diagnosis/pastrecordmlist", {params:{pId, day}})
  return promise;
}

export function getPastMemo(pId, day){
  const promise = axios.get("/api/diagnosis/pastrecordmemo", {params:{pId, day}})
  return promise;
}

export function getInspectionCompareList(){
  const promise = axios.get("/api/diagnosis/inspectioncompare")
  return promise;
}


export function sendMqttMessage({topic, content}) {
  return axios.get("/sendMqttMessage", {params:{topic, content}});
}

export function addDiagnosis(diagnosisInfo) {
  return axios.post("/api/diagnosis/pushdiagnosis", diagnosisInfo)
}

