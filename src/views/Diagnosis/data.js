let size = 15;

// 환자리스트
let patientList = [
  {patientId:"1", patientName:"정윤환", patientSsn1:"950621", patientPhone:"01012345671", dDate: "2021-06-22"},
  {patientId:"2", patientName:"정예원", patientSsn1:"950622", patientPhone:"01012345672", dDate: "2021-06-22"},
  {patientId:"3", patientName:"김명휘", patientSsn1:"950623", patientPhone:"01012345673", dDate: "2021-06-21"},
  {patientId:"4", patientName:"박소라", patientSsn1:"950624", patientPhone:"01012345674", dDate: "2021-06-21"}
];

export function getPatient(pid) {
  let patient = {};
  for(var p=0; p<patientList.length; p++){
    if(patientList[p].patientId === (pid+"")){
      patient = patientList[p];
    }
  }
  return patient;
};

export function getPatientList(day) {
  let list = [];
  for(var d=0; d<patientList.length; d++){
    if(patientList[d].dDate === day){
      list.push(patientList[d]);
    }
  }
  return list;
};

export function getPatientName(id){
  let p = "";
  for(var d=0; d<patientList.length; d++){
    if(patientList[d].patientId === id){
      p = patientList[d].patientName;
      break;
    }
  }
  return p;
}

export function getPatientSearchList(day, keyword){
  let list = [];
  for(var d2=0; d2<patientList.length; d2++){
    if(patientList[d2].dDate === day && (patientList[d2].patientName).includes(keyword)){
      list.push(patientList[d2]);
    }
  }
  return list;
}

//약 목록
let medicineList = [];
for(var i2=1; i2<=size; i2++) {
  medicineList.push({
    mId:"NIZA"+i2, 
    mName:"AXID Cap"+i2+" mg", 
    mCategory:"내복약", 
    mUnit:"C"+i2, 
  });
}
export function getMedicineList() {
  return medicineList;
};

export function getMedicineSearchList(keyword){
  let list = [];
  for(var m=0; m<patientList.length; m++){
    if((medicineList[m].mName).includes(keyword)){
      list.push(medicineList[m]);
    }
  }
  return list;
}

//검사 목록
let inspectionList = [
  {bundleCode:"L2001", bundleName:"CBC (CBC,PLT,DIFF)"},
  {bundleCode:"L2002", bundleName:"CBC(CBC,PLT)"},
  {bundleCode:"L2116", bundleName:"Factor Assay(8종)*(11366036)SCL"},
  {bundleCode:"L3001", bundleName:"Routine BC(13종목)"},
  {bundleCode:"L300101", bundleName:"Routine BC(순환기내과12종)"},
  {bundleCode:"L300102", bundleName:"Routine BC(11종목)-신경과"},
];
export function getInspectionList() {
  return inspectionList;
};

export function getInspectionSearchList(keyword){
  let list = [];
  for(var i6=0; i6<inspectionList.length; i6++){
    if((inspectionList[i6].bundleName).includes(keyword)){
      list.push(inspectionList[i6]);
    }
  }
  return list;
}

const iData = [
  {bundleCode: "L2001", iId:"L2010", iName: "WBC"},
  {bundleCode: "L2001", iId:"L2011", iName: "RBC"},
  {bundleCode: "L2001", iId:"L2012", iName: "Hb (광전비색법)"},
  {bundleCode: "L2001", iId:"L2013", iName: "Hct(Hematocrit)"},
  {bundleCode: "L2001", iId:"L2015", iName: "Platelet"},
  {bundleCode: "L2002", iId:"L2010", iName: "WBC"},
  {bundleCode: "L2002", iId:"L2011", iName: "RBC"},
  {bundleCode: "L2002", iId:"L2012", iName: "Hb (광전비색법)"},
  {bundleCode: "L2002", iId:"L2013", iName: "Hct(Hematocrit)"},
  {bundleCode: "L2002", iId:"L2015", iName: "Platelet"}
];

export function getInspection(bundleCode) {
  let list = [];
  for(var i4=0; i4<iData.length; i4++){
    if(iData[i4].bundleCode === bundleCode){
      list.push(iData[i4]);
    }
  }
  return list;
};

const dignosisDate = [
  {patientId: "1", dDate: "2021-06-20", memo: "고열 증세 있음."},
  {patientId: "1", dDate: "2021-06-22", memo: "고열 상태 호전, 정상 체온"}
]

export function getMemo(patientId, day){
  let memo;
  for(var i=0; i<dignosisDate.length; i++){
    if(dignosisDate[i].patientId === (patientId+"") && dignosisDate[i].dDate === day){
      memo = dignosisDate[i].memo;
      break;
    }
  }
  return memo;
}

export function getPastRecord(patientId){
  let list = [];
  for(var i5=0; i5<dignosisDate.length; i5++){
    if(dignosisDate[i5].patientId === (patientId+"")){
      list.push(dignosisDate[i5]);
    }
  }
  return list;
}

let resultIList = [
  {pId:"1", dDate: "2021-06-20", iId:"L2010", iName:"WBC", inspector:"정예원", iResult:"17"},
  {pId:"1", dDate: "2021-06-20", iId:"L2011", iName:"RBC", inspector:"정예원", iResult:"45"},
  {pId:"1", dDate: "2021-06-22", iId:"L2012", iName:"Hb (광전비색법)", inspector:"김명휘", iResult:"58"},
  {pId:"1", dDate: "2021-06-22", iId:"L2013", iName:"Hct(Hematocrit)", inspector:"김명휘", iResult:"36"}
]

export function getResultIList(id, day) {
  let list = [];
  for(var i=0; i<resultIList.length; i++){
    if(resultIList[i].pId === (id+"") && resultIList[i].dDate === day){
      list.push(resultIList[i]);
    }
  }
  return list;
};

let resultMList = [
  {pId:"1", dDate: "2021-06-20",  mId:"NIZA1", mName:"AXID Cap 1 mg", mCategory:"내복약", mUnit:"C"},
  {pId:"1", dDate: "2021-06-22",  mId:"NIZA2", mName:"AXID Cap 2 mg", mCategory:"내복약", mUnit:"C2"},
  {pId:"1", dDate: "2021-06-22",  mId:"NIZA3", mName:"AXID Cap 3 mg", mCategory:"내복약", mUnit:"C3"},
]

export function getResultMList(id, day) {
  let list = [];
  for(var i=0; i<resultMList.length; i++){
    if(resultMList[i].pId === (id+"") && resultMList[i].dDate === day){
      list.push(resultMList[i]);
    }
  }
  return list;
};
