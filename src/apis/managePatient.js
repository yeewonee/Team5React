import axios from "axios";

export function getPatientList() {
  const promise = axios.get("/managePatient/patientList");
  return promise;
}

export function updatePatient(patient) {
  const promise = axios.put("/managePatient/update", patient);
  return promise;
}

export function newPatient(patientRegister) {
  return axios.post("/managePatient/registration", patientRegister);

}