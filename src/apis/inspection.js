import axios from "axios";

export function getPatientList() {
  const result = axios.get("/api/inspection");
  return result;
}

export function getInspecetList(pno, did) {
  const result = axios.get("/api/inspection/inspectList", { params: { pno, did } });
  return result;
}

export function UpdateInspectStatus(checkList, changeValue) {
  axios.put("/api/inspection/updateInspect/" + changeValue, checkList[0]);
};

export function UpdateInspectResult(DiagnosisInspection) {
  const result =axios.put("/api/inspection/updateInspectResult/",DiagnosisInspection)
  return result
};

export function UpdatePatientStatus(diagnosis){
    axios.put("/api/inspection/updatePinspect/",diagnosis)
}
