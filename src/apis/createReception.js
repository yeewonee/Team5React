import axios from "axios";

export function getPatientList() {
  const promise = axios.get("/receptionUpdate/patientList");
  return promise;
}

export function getDoctorList() {
  const promise = axios.get("/receptionUpdate/doctorList");
  return promise;
}

export function getReceptionListByDate(r_date) {
  const promise = axios.get("/receptionUpdate/receptionListByDate", {params: {r_date}});
  return promise;
}

export function getReceptionListByDoctor(doctor_id, r_date) {
  const promise = axios.get("/receptionUpdate/receptionListByDoc", {params: {doctor_id, r_date}});
  return promise;
}

export function insertReception(reception) {
  const promise = axios.post("/receptionUpdate/insertReception", reception);
  return promise;
}

export function updateReception(reception) {
  const promise = axios.put("/receptionUpdate/update", reception);
  return promise;
}

export function sendMqttMessage({topic, content}) {
  return axios.get("/sendMqttMessage", {params:{topic, content}});
}