import axios from "axios";
axios.defaults.baseURL = "http://localhost:8080";


export function getPatientList() {
  const promise = axios.get("/managePatient/patientList");
  return promise;
}

export function updatePatient(patient) {
  const promise = axios.put("/managePatient/update", patient);
  return promise;
}