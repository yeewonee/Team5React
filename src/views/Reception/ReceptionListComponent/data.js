const data = [
  { r_id: 5, patient_name: "박소라", patient_ssn1: 930516, patient_phone: "01059210192", r_date: "2021-06-29", r_time: "14:30", r_status:"접수완료", patient_id:"23124", doctor_id:"2"},
  { r_id: 4, patient_name: "정예원", patient_ssn1: 950211, patient_phone: "01045678902", r_date: "2021-06-29", r_time: "14:00", r_status:"접수대기", patient_id:"34234", doctor_id:"2"},  
  { r_id: 3, patient_name: "김명휘", patient_ssn1: 980403, patient_phone: "01038203321", r_date: "2021-06-29", r_time: "11:30", r_status:"접수대기", patient_id:"45463", doctor_id:"2"},
  { r_id: 2, patient_name: "정예원", patient_ssn1: 950211, patient_phone: "01045678902", r_date: "2021-06-29", r_time: "11:00", r_status:"접수대기", patient_id:"34123", doctor_id:"3"},
  { r_id: 1, patient_name: "정윤환", patient_ssn1: 960123, patient_phone: "01029872701", r_date: "2021-06-29", r_time: "10:30", r_status:"접수완료", patient_id:"32319", doctor_id:"3"},

  { r_id: 12, patient_name: "박소라", patient_ssn1: 930516, patient_phone: "01059210192", r_date: "2021-06-28", r_time: "14:30", r_status:"접수완료", patient_id:"23124", doctor_id:"2"},
  { r_id: 11, patient_name: "정예원", patient_ssn1: 950211, patient_phone: "01045678902", r_date: "2021-06-28", r_time: "14:00", r_status:"접수대기", patient_id:"34234", doctor_id:"2"},  
  { r_id: 10, patient_name: "김명휘", patient_ssn1: 980403, patient_phone: "01038203321", r_date: "2021-06-28", r_time: "11:30", r_status:"접수대기", patient_id:"45463", doctor_id:"2"},
  { r_id: 9, patient_name: "정예원", patient_ssn1: 950211, patient_phone: "01045678902", r_date: "2021-06-28", r_time: "11:00", r_status:"접수대기", patient_id:"34123", doctor_id:"3"},
  { r_id: 8, patient_name: "정윤환", patient_ssn1: 960123, patient_phone: "01029872701", r_date: "2021-06-28", r_time: "10:30", r_status:"접수완료", patient_id:"32319", doctor_id:"3"},
  { r_id: 7, patient_name: "김명휘", patient_ssn1: 980403, patient_phone: "01038203321", r_date: "2021-06-28", r_time: "10:00", r_status:"접수완료", patient_id:"65756", doctor_id:"3"},
  { r_id: 6, patient_name: "박소라", patient_ssn1: 930516, patient_phone: "01059210192", r_date: "2021-06-28", r_time: "09:30", r_status:"접수완료", patient_id:"34164", doctor_id:"4"},

  { r_id: 15, patient_name: "김명휘", patient_ssn1: 980403, patient_phone: "01038203321", r_date: "2021-06-27", r_time: "11:30", r_status:"접수대기", patient_id:"45463", doctor_id:"2"},
  { r_id: 14, patient_name: "정예원", patient_ssn1: 950211, patient_phone: "01045678902", r_date: "2021-06-27", r_time: "11:00", r_status:"접수대기", patient_id:"34123", doctor_id:"3"},
  { r_id: 13, patient_name: "정윤환", patient_ssn1: 960123, patient_phone: "01029872701", r_date: "2021-06-27", r_time: "10:30", r_status:"접수완료", patient_id:"32319", doctor_id:"3"},
  
  { r_id: 20, patient_name: "김명휘", patient_ssn1: 980403, patient_phone: "01038203321", r_date: "2021-06-26", r_time: "9:00", r_status:"접수대기", patient_id:"04928", doctor_id:"1"},
  { r_id: 19, patient_name: "정예원", patient_ssn1: 950211, patient_phone: "01045678902", r_date: "2021-06-26", r_time: "9:30", r_status:"접수대기", patient_id:"95292", doctor_id:"1"},
  { r_id: 18, patient_name: "정윤환", patient_ssn1: 960123, patient_phone: "01029872701", r_date: "2021-06-26", r_time: "15:30", r_status:"접수완료", patient_id:"59304", doctor_id:"1"},
  { r_id: 17, patient_name: "박소라", patient_ssn1: 930516, patient_phone: "01059210192", r_date: "2021-06-26", r_time: "14:30", r_status:"접수완료", patient_id:"23124", doctor_id:"2"},
  { r_id: 16, patient_name: "정예원", patient_ssn1: 950211, patient_phone: "01045678902", r_date: "2021-06-26", r_time: "14:00", r_status:"접수대기", patient_id:"34234", doctor_id:"2"},  

  { r_id: 25, patient_name: "박소라", patient_ssn1: 930516, patient_phone: "01059210192", r_date: "2021-06-25", r_time: "14:30", r_status:"접수완료", patient_id:"23124", doctor_id:"2"},
  { r_id: 24, patient_name: "정예원", patient_ssn1: 950211, patient_phone: "01045678902", r_date: "2021-06-25", r_time: "14:00", r_status:"접수대기", patient_id:"34234", doctor_id:"2"},  
  { r_id: 23, patient_name: "김명휘", patient_ssn1: 980403, patient_phone: "01038203321", r_date: "2021-06-25", r_time: "11:30", r_status:"접수대기", patient_id:"45463", doctor_id:"2"},
  { r_id: 22, patient_name: "정예원", patient_ssn1: 950211, patient_phone: "01045678902", r_date: "2021-06-25", r_time: "11:00", r_status:"접수대기", patient_id:"34123", doctor_id:"3"},
  { r_id: 21, patient_name: "정윤환", patient_ssn1: 960123, patient_phone: "01029872701", r_date: "2021-06-25", r_time: "10:30", r_status:"접수완료", patient_id:"32319", doctor_id:"3"},

  { r_id: 32, patient_name: "박소라", patient_ssn1: 930516, patient_phone: "01059210192", r_date: "2021-06-24", r_time: "14:30", r_status:"접수완료", patient_id:"23124", doctor_id:"2"},
  { r_id: 31, patient_name: "정예원", patient_ssn1: 950211, patient_phone: "01045678902", r_date: "2021-06-24", r_time: "14:00", r_status:"접수대기", patient_id:"34234", doctor_id:"2"},  
  { r_id: 30, patient_name: "김명휘", patient_ssn1: 980403, patient_phone: "01038203321", r_date: "2021-06-24", r_time: "11:30", r_status:"접수대기", patient_id:"45463", doctor_id:"2"},
  { r_id: 29, patient_name: "정예원", patient_ssn1: 950211, patient_phone: "01045678902", r_date: "2021-06-24", r_time: "11:00", r_status:"접수대기", patient_id:"34123", doctor_id:"3"},
  { r_id: 28, patient_name: "정윤환", patient_ssn1: 960123, patient_phone: "01029872701", r_date: "2021-06-24", r_time: "10:30", r_status:"접수완료", patient_id:"32319", doctor_id:"3"},
  { r_id: 27, patient_name: "김명휘", patient_ssn1: 980403, patient_phone: "01038203321", r_date: "2021-06-24", r_time: "10:00", r_status:"접수완료", patient_id:"65756", doctor_id:"3"},
  { r_id: 26, patient_name: "박소라", patient_ssn1: 930516, patient_phone: "01059210192", r_date: "2021-06-24", r_time: "09:30", r_status:"접수완료", patient_id:"34164", doctor_id:"4"}
]

var list = data;
export function getPatientList(day){
  var patientList = list.filter(list => list.r_date === day);
  return patientList;
}

export default getPatientList;