import moment from "moment";

let data = [
  {r_id: 3, r_date: "2021-06-28", r_time: "10:30", r_status: "접수대기", r_role: "예약접수", patient_id: '32319', doctor_id: '1'},
  {r_id: 2, r_date: "2021-06-29", r_time: "9:30", r_status: "예약완료", r_role: "예약접수", patient_id: '12346', doctor_id: '1'},
  {r_id: 1, r_date: "2021-06-30", r_time: "9:30", r_status: "예약완료", r_role: "예약접수", patient_id: '12346', doctor_id: '1'},
  {r_id: 4, r_date: "2021-06-30", r_time: "10:30", r_status: "예약완료", r_role: "예약접수", patient_id: '12347', doctor_id: '1'},
  {r_id: 5, r_date: "2021-06-30", r_time: "10:00", r_status: "예약완료", r_role: "예약접수", patient_id: '12347', doctor_id: '2'},
  {r_id: 6, r_date: "2021-06-30", r_time: "09:30", r_status: "예약완료", r_role: "예약접수", patient_id: '12347', doctor_id: '2'},
  {r_id: 7, r_date: "2021-06-30", r_time: "15:30", r_status: "예약완료", r_role: "예약접수", patient_id: '12346', doctor_id: '2'},
  {r_id: 8, r_date: "2021-06-30", r_time: "16:00", r_status: "예약완료", r_role: "예약접수", patient_id: '12347', doctor_id: '2'},
];

export function getReceptionDate(doctor_id, r_date){
  const newDate = moment(r_date).format('YYYY-MM-DD')
  const list = data.filter(list => list.doctor_id == doctor_id && list.r_date === newDate);

  return list;
}