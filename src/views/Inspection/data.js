let data = [
  { sequence: 1, pno: "12345", pname: "김지호", sex: "male", age: 33, rtime: "15:00", tstatus: "대기" },
  { sequence: 2, pno: "2234", pname: "이서아", sex: "female", age: 17, rtime: "16:00", tstatus: "진행중" },
  { sequence: 3, pno: "546546", pname: "박시우", sex: "male", age: 55, rtime: "17:00", tstatus: "대기" },
  { sequence: 4, pno: "76543", pname: "김도윤", sex: "male", age: 60, rtime: "18:00", tstatus: "진행중" },
  { sequence: 5, pno: "98643", pname: "박민준", sex: "male", age: 31, rtime: "18:00", tstatus: "대기" },
  { sequence: 6, pno: "47243", pname: "김서윤", sex: "female", age: 76, rtime: "19:00", tstatus: "대기" },
  { sequence: 7, pno: "90612", pname: "오주원", sex: "male", age: 87, rtime: "20:00", tstatus: "대기" },
  { sequence: 8, pno: "63879", pname: "윤하은", sex: "female", age: 22, rtime: "21:00", tstatus: "진행중" },
  { sequence: 9, pno: "19843", pname: "김서진", sex: "male", age: 34, rtime: "18:00", tstatus: "대기" },
  { sequence: 10, pno: "21345", pname: "이지우", sex: "female", age: 30, rtime: "09:00", tstatus: "대기" },
  { sequence: 11, pno: "34712", pname: "유상우", sex: "male", age: 38, rtime: "10:00", tstatus: "대기" },
  { sequence: 12, pno: "58433", pname: "윤현덕", sex: "male", age: 42, rtime: "13:00", tstatus: "대기" },
  { sequence: 13, pno: "22345", pname: "이지안", sex: "female", age: 53, rtime: "12:00", tstatus: "대기" },
];

let data2 = [
  { pno: "00001", bno: "L2001", iname: "WBC", ino: "L2010", unit: "x10^3/mm3", inspector: "김명휘", istatus: "대기" },
  { pno: "00001", bno: "L2001", iname: "RBC", ino: "L2011", unit: "x10^3/mm3", inspector: "김명휘", istatus: "대기" },
  { pno: "00001", bno: "L2001", iname: "Hb (광전비색법)", ino: "L2012", unit: "x10^3/mm3", inspector: "김명휘", istatus: "대기" },
  { pno: "00001", bno: "L2001", iname: "Hct(Hematocrit)", ino: "L2013", unit: "x10^3/mm3", inspector: "김명휘", istatus: "대기" },
  { pno: "00001", bno: "L3001", iname: "Platelet", ino: "L2014", unit: "x10^3/mm3", inspector: "김명휘", istatus: "대기" },
  { pno: "00001", bno: "L3001", iname: "Platelet", ino: "L2030", unit: "x10^3/mm3", inspector: "김명휘", istatus: "대기" },
  { pno: "546546", bno: "L3001", iname: "II응고인자정량*(11366036)", ino: "L2015", unit: "x10^3/mm3", inspector: "김명휘", istatus: "대기" },
  { pno: "546546", bno: "L3001", iname: "응고인자정량*(11366036)SCL", ino: "L2016", unit: "x10^3/mm3", inspector: "김명휘", istatus: "대기" },
  { pno: "63879", bno: "L2001", iname: "VII응고인자정량*(11366036)SCL", ino: "L2017", unit: "x10^3/mm3", inspector: "정윤환", istatus: "접수" },
  { pno: "63879", bno: "L2001", iname: "'VIII응고인자정량*(11366036)SCL", ino: "L2018", unit: "x10^3/mm3", inspector: "정윤환", istatus: "대기" },
  { pno: "63879", bno: "L2201", iname: "IX응고인자정량*(11366036)SCL", ino: "L2019", unit: "x10^3/mm3", inspector: "정윤환", istatus: "대기" },
  { pno: "63879", bno: "L2201", iname: "Glucose(fasting) 정량", ino: "L2020", unit: "x10^3/mm3", inspector: "정윤환", istatus: "대기" },
  { pno: "63879", bno: "L2201", iname: "'Total protein", ino: "L2021", unit: "x10^3/mm3", inspector: "정윤환", istatus: "대기" },
  { pno: "2234", bno: "L5001", iname: "Albumin", ino: "L2022", unit: "x10^3/mm3", inspector: "김명휘", istatus: "접수" },
  { pno: "2234", bno: "L5001", iname: "'Bilirubin, total", ino: "L2023", unit: "x10^3/mm3", inspector: "김명휘", istatus: "대기" },
  { pno: "2234", bno: "L5001", iname: "SGOT", ino: "L2024", unit: "x10^3/mm3", inspector: "김명휘", istatus: "대기" },
  { pno: "2234", bno: "L5001", iname: "BUN", ino: "L2025", unit: "x10^3/mm3", inspector: "김명휘", istatus: "대기" },
  { pno: "76543", bno: "L5002", iname: "Albumin", ino: "L2026", unit: "x10^3/mm3", inspector: "김명휘", istatus: "접수" },
  { pno: "76543", bno: "L5002", iname: "'Bilirubin, total", ino: "L2027", unit: "x10^3/mm3", inspector: "김명휘", istatus: "대기" },
  { pno: "76543", bno: "L5003", iname: "SGOT", ino: "L2028", unit: "x10^3/mm3", inspector: "김명휘", istatus: "대기" },
  { pno: "76543", bno: "L5003", iname: "BUN", ino: "L2029", unit: "x10^3/mm3", inspector: "김명휘", istatus: "대기" },
  { pno: "98643", bno: "L5001", iname: "BUN", ino: "L2030", unit: "x10^3/mm3", inspector: "김명휘", istatus: "대기" },
  { pno: "47243", bno: "L5001", iname: "II응고인자정량*(11366036)", ino: "L2031", unit: "x10^3/mm3", inspector: "김명휘", istatus: "대기" },
  { pno: "47243", bno: "L5001", iname: "응고인자정량*(11366036)SCL", ino: "L2032", unit: "x10^3/mm3", inspector: "김명휘", istatus: "대기" },
  { pno: "90612", bno: "L5006", iname: "'Bilirubin, total", ino: "L2033", unit: "x10^3/mm3", inspector: "김명휘", istatus: "대기" },
  { pno: "90612", bno: "L5006", iname: "SGOT", ino: "L2034", unit: "x10^3/mm3", inspector: "김명휘", istatus: "대기" },
  { pno: "90612", bno: "L5006", iname: "BUN", ino: "L2035", unit: "x10^3/mm3", inspector: "김명휘", istatus: "대기" },
  { pno: "90612", bno: "L5006", iname: "BUN", ino: "L2036", unit: "x10^3/mm3", inspector: "김명휘", istatus: "대기" },
  { pno: "90612", bno: "L5007", iname: "II응고인자정량*(11366036)", ino: "L2037", unit: "x10^3/mm3", inspector: "김명휘", istatus: "대기" },
  { pno: "90612", bno: "L5007", iname: "응고인자정량*(11366036)SCL", ino: "L2038", unit: "x10^3/mm3", inspector: "김명휘", istatus: "대기" },
  { pno: "19843", bno: "L5008", iname: "Hct(Hematocrit)", ino: "L2039", unit: "x10^3/mm3", inspector: "김명휘", istatus: "대기" },
  { pno: "21345", bno: "L5008", iname: "Hct(Hematocrit)", ino: "L2039", unit: "x10^3/mm3", inspector: "김명휘", istatus: "대기" },
  { pno: "34712", bno: "L2001", iname: "WBC", ino: "L2010", unit: "x10^3/mm3", inspector: "김명휘", istatus: "대기" },
  { pno: "34712", bno: "L2001", iname: "RBC", ino: "L2011", unit: "x10^3/mm3", inspector: "김명휘", istatus: "대기" },
  { pno: "58433", bno: "L2001", iname: "WBC", ino: "L2010", unit: "x10^3/mm3", inspector: "김명휘", istatus: "대기" },
  { pno: "58433", bno: "L2001", iname: "RBC", ino: "L2011", unit: "x10^3/mm3", inspector: "김명휘", istatus: "대기" },
  { pno: "22345", bno: "L3001", iname: "Platelet", ino: "L2014", unit: "x10^3/mm3", inspector: "김명휘", istatus: "대기" },
  { pno: "22345", bno: "L3001", iname: "Platelet", ino: "L2030", unit: "x10^3/mm3", inspector: "김명휘", istatus: "대기" },
];

export function getPatientList() {
  data.sort((a, b) => a.sequence - b.sequence);
  var boardList = data.slice(0, data.length);
  return boardList;
}

export function getUser(pno) {
  const user = data.find((idata) => idata.pno === pno);
  return user;
}

export function getInspectList(pno) {
  data.sort((a, b) => a.sequence - b.sequence);
  const inspectList = data2.filter((idata) => idata.pno === pno);
  return inspectList;
}

export function updateInspect(board, status) {
  for (let i = 0; i < board?.length; i++) {
    const row = data2.find((row) => row.ino === board[i].ino);
    row.istatus = status;
  }
}

export function patientInspect(pno,status) {
  
  const row =data.find((row)=>row.pno===pno)
  
  row.tstatus = status
  
}