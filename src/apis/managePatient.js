import axios from "axios";

export function getPatientList() {
  const promise = axios.get("/api/managePatient/patientList");
  return promise;
}

export function updatePatient(patient) {
  const promise = axios.put("/api/managePatient/update", patient);
  return promise;
}

export function newPatient(patientRegister) {
  return axios.post("/api/managePatient/registration", patientRegister);

}