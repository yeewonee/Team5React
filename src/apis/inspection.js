import axios from "axios";

export function getPatientList() {
  const result = axios.get("/inspection");
  return result;
}

export function getInspecetList(pno, did) {
  const result = axios.get("/inspection/inspectList", { params: { pno, did } });
  return result;
}

export function UpdateInspectStatus(checkList, changeValue) {
  axios.put("/inspection/updateInspect/" + changeValue, checkList[0]);
};

export function UpdatePatientStatus(diagnosis){
    axios.put("inspection/updatePinspect/",diagnosis)
}
