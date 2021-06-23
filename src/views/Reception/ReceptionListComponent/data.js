const data = [
  { r_id: 5, patient_name: "김명휘", patient_ssn1: 980403, patient_phone: "01038203321", r_date: "21.06.15", r_time: "11:30", r_status:"접수대기"},
  { r_id: 4, patient_name: "정예원", patient_ssn1: 950211, patient_phone: "01045678902", r_date: "21.06.15", r_time: "11:00", r_status:"접수대기"},
  { r_id: 3, patient_name: "정윤환", patient_ssn1: 960123, patient_phone: "01029872701", r_date: "21.06.15", r_time: "10:30", r_status:"접수완료"},
  { r_id: 2, patient_name: "김명휘", patient_ssn1: 980403, patient_phone: "01038203321", r_date: "21.06.15", r_time: "10:00", r_status:"접수완료"},
  { r_id: 1, patient_name: "박소라", patient_ssn1: 930516, patient_phone: "01059210192", r_date: "21.06.15", r_time: "09:30", r_status:"접수완료"}

]

export function getPatientList(){
  var patientList = data;
  return patientList;
}