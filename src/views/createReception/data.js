import axios from "axios";
axios.defaults.baseURL = "http://localhost:8080";


export function getPatientList() {
  const promise = axios.get("/receptionUpdate/patientList");
  return promise;
}

export function getDoctorList() {
  const promise = axios.get("/receptionUpdate/doctorList");
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