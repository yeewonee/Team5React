import moment from "moment";

let data = [
  {r_id: 1, r_date: "2021-06-23", r_time: "9:00", r_status: "접수대기", r_role: "예약접수", patient_id: '04928', doctor_id: '1'},
  {r_id: 2, r_date: "2021-06-23", r_time: "9:30", r_status: "예약완료", r_role: "예약접수", patient_id: '12346', doctor_id: '1'},
  {r_id: 2, r_date: "2021-06-24", r_time: "9:30", r_status: "예약완료", r_role: "예약접수", patient_id: '12347', doctor_id: '1'}
];

export function getReceptionDate(doctor_id, r_date){
  const newDate = moment(r_date).format('YYYY-MM-DD')
  const list = data.filter(list => list.doctor_id == doctor_id && list.r_date === newDate);

  return list;
}