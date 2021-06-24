let data = [
  {patient_id: "12345", patient_name: "송중기", patient_age: "34", patient_sex:"Male", patient_ssn1: "900000", patient_ssn2: "1000000", patient_phone: "010-1234-1234", zip:"05578", address:"서울특별시 송파구 삼전로 37 (잠실동)", address_detail:"홍익빌딩"},
  {patient_id: "12346", patient_name: "박보검", patient_age: "34", patient_sex:"Male", patient_ssn1: "900000", patient_ssn2: "1000000", patient_phone: "010-1234-1234", zip:"05578", address:"서울특별시 송파구 삼전로 37 (잠실동)", address_detail:"깔깔빌딩"},
  {patient_id: "12347", patient_name: "서강준", patient_age: "34", patient_sex:"Male", patient_ssn1: "900000", patient_ssn2: "1000000", patient_phone: "010-1234-1234", zip:"05578", address:"서울특별시 송파구 삼전로 37 (잠실동)", address_detail:"낄낄빌딩"},
  {patient_id: "12348", patient_name: "강동원", patient_age: "39", patient_sex:"Male", patient_ssn1: "900000", patient_ssn2: "1000000", patient_phone: "010-1234-1234", zip:"05578", address:"서울특별시 송파구 삼전로 37 (잠실동)", address_detail:"홍익빌딩"},
  {patient_id: "12349", patient_name: "이동건", patient_age: "40", patient_sex:"Male", patient_ssn1: "900000", patient_ssn2: "1000000", patient_phone: "010-1234-1234", zip:"05578", address:"서울특별시 송파구 삼전로 37 (잠실동)", address_detail:"홍익빌딩"},
  {patient_id: "12350", patient_name: "조인성", patient_age: "34", patient_sex:"Male", patient_ssn1: "921023", patient_ssn2: "1000000", patient_phone: "010-1234-1234", zip:"05578", address:"서울특별시 송파구 삼전로 37 (잠실동)", address_detail:"으악빌딩"},
  {patient_id: "12351", patient_name: "이동욱", patient_age: "35", patient_sex:"Male", patient_ssn1: "921023", patient_ssn2: "1000000", patient_phone: "010-1234-1234", zip:"05578", address:"서울특별시 송파구 삼전로 37 (잠실동)", address_detail:"홍익빌딩"},
  {patient_id: "12352", patient_name: "장기용", patient_age: "32", patient_sex:"Male", patient_ssn1: "921023", patient_ssn2: "1000000", patient_phone: "010-1234-1234", zip:"05578", address:"서울특별시 송파구 삼전로 37 (잠실동)", address_detail:"홍익빌딩"},
  {patient_id: "12353", patient_name: "이수혁", patient_age: "33", patient_sex:"Male", patient_ssn1: "921023", patient_ssn2: "1000000", patient_phone: "010-1234-1234", zip:"05578", address:"서울특별시 송파구 삼전로 37 (잠실동)", address_detail:"송파빌딩"},
  {patient_id: "12354", patient_name: "남주혁", patient_age: "28", patient_sex:"Male", patient_ssn1: "900000", patient_ssn2: "1000000", patient_phone: "010-1234-1234", zip:"05578", address:"서울특별시 송파구 삼전로 37 (잠실동)", address_detail:"홍익빌딩"},
  {patient_id: "12355", patient_name: "박서준", patient_age: "34", patient_sex:"Male", patient_ssn1: "900000", patient_ssn2: "1000000", patient_phone: "010-1234-1234", zip:"05578", address:"서울특별시 송파구 삼전로 37 (잠실동)", address_detail:"홍익빌딩"},
  {patient_id: "12356", patient_name: "고윤정", patient_age: "34", patient_sex:"Female", patient_ssn1: "900000", patient_ssn2: "2000000", patient_phone: "010-1234-1234", zip:"05578", address:"서울특별시 송파구 삼전로 37 (잠실동)", address_detail:"홍익빌딩"},
  {patient_id: "12357", patient_name: "정은지", patient_age: "28", patient_sex:"Female", patient_ssn1: "900000", patient_ssn2: "2000000", patient_phone: "010-1234-1234", zip:"05578", address:"서울특별시 송파구 삼전로 37 (잠실동)", address_detail:"홍익빌딩"},
  {patient_id: "12358", patient_name: "이지은", patient_age: "29", patient_sex:"Female", patient_ssn1: "900000", patient_ssn2: "2000000", patient_phone: "010-1234-1234", zip:"05578", address:"서울특별시 송파구 삼전로 37 (잠실동)", address_detail:"홍익빌딩"},
  {patient_id: "12359", patient_name: "권진아", patient_age: "25", patient_sex:"Female", patient_ssn1: "900000", patient_ssn2: "2000000", patient_phone: "010-1234-1234", zip:"05578", address:"서울특별시 송파구 삼전로 37 (잠실동)", address_detail:"홍익빌딩"},
  {patient_id: "12535", patient_name: "송중기", patient_age: "30", patient_sex:"Male", patient_ssn1: "921020", patient_ssn2: "1000000", patient_phone: "010-1234-1234", zip:"05578", address:"서울특별시 송파구 삼전로 37 (잠실동)", address_detail:"냠냠빌딩"}
];

export function getPatientList(){
  var patientList = data;
  return patientList;
};

export function getPatient(patient_id) {
  const patient = data.find(patient => patient.patient_id === patient_id);
  return patient;
}

export function getPatientListBySearch(patient_name){
  const patientBySearch = data.filter(patient => patient.patient_name.includes(patient_name));
  return patientBySearch
}