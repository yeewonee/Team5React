import axios from "axios";

export function getMedicineList(){
  const promise = axios.get("/diagnosis/medicines");
  return promise;
}

export function getInspectList(){
  const promise = axios.get("/diagnosis/inspectionlist")
  return promise;
}

export function getInspectAllList(){
  const promise = axios.get("/diagnosis/inspections")
  return promise;
}

export function getPatientList(day){
  const promise = axios.get("/diagnosis/patientlist", {params:{day}})
  return promise;
}

export function getPastRecordList(pId){
  const promise = axios.get("/diagnosis/pastrecord", {params:{pId}})
  return promise;
}

export function getPatient(pId){
  if(pId !== ""){
    const promise = axios.get("/diagnosis/selectpatient", {params:{pId}})
    return promise;
  }
  
}

export function getPastIlist(pId, day){
  const promise = axios.get("/diagnosis/pastrecordilist", {params:{pId, day}})
  return promise;
}

export function getPastMlist(pId, day){
  const promise = axios.get("/diagnosis/pastrecordmlist", {params:{pId, day}})
  return promise;
}

export function getPastMemo(pId, day){
  const promise = axios.get("/diagnosis/pastrecordmemo", {params:{pId, day}})
  return promise;
}

export function getInspectionCompareList(){
  const promise = axios.get("/diagnosis/inspectioncompare")
  return promise;
}


export function sendMqttMessage({topic}) {
  return axios.get("/sendMqttMessage", {params:{topic}});
}

export function getUserList(uid){
  const promise = axios.get("/diagnosis/userlist", {params:{uid}})
  return promise;
}

