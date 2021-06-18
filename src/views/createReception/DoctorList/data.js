let data = [
  {doctor_id: 1, doctor_name: "정예원", doctor_office: "1진료실", doctor_phone: "010-1234-1234"},
  {doctor_id: 2, doctor_name: "김명휘", doctor_office: "2진료실", doctor_phone: "010-1234-1234"},
  {doctor_id: 3, doctor_name: "정윤환", doctor_office: "3진료실", doctor_phone: "010-1234-1234"},
  {doctor_id: 4, doctor_name: "박소라", doctor_office: "4진료실", doctor_phone: "010-1234-1234"},
  {doctor_id: 5, doctor_name: "남주혁", doctor_office: "5진료실", doctor_phone: "010-1234-1234"},
];


export function getDoctorList(){
  var doctorList = data;
  return doctorList;
};