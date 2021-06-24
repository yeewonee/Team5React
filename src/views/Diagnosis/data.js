let size = 15;

// 환자리스트
let patientList = [
  {patientId:"1", patientName:"정윤환1", patientSsn1:"950621", patientPhone:"01012345671", dDate: "2021-06-22"},
  {patientId:"2", patientName:"정윤환2", patientSsn1:"950622", patientPhone:"01012345672", dDate: "2021-06-22"},
  {patientId:"3", patientName:"정윤환3", patientSsn1:"950623", patientPhone:"01012345673", dDate: "2021-06-21"},
  {patientId:"4", patientName:"정윤환4", patientSsn1:"950624", patientPhone:"01012345674", dDate: "2021-06-21"}
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
let inspectionList = [];
for(var i3=1; i3<=size; i3++) {
  inspectionList.push({
    bundleCode:"L200"+i3, 
    bundleName:"CBC (CBC,PLT,DIFF)"+i3 
  });
}
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
  {bundleCode: "L2001", iId:"검사id", iName: "검사name"},
  {bundleCode: "L2001", iId:"검사id2", iName: "검사name2"},
  {bundleCode: "L2001", iId:"검사id3", iName: "검사name3"},
  {bundleCode: "L2001", iId:"검사id4", iName: "검사name4"},
  {bundleCode: "L2001", iId:"검사id5", iName: "검사name5"},
  {bundleCode: "L2002", iId:"검사id6", iName: "검사name6"},
  {bundleCode: "L2002", iId:"검사id7", iName: "검사name7"},
  {bundleCode: "L2002", iId:"검사id8", iName: "검사name8"},
  {bundleCode: "L2002", iId:"검사id9", iName: "검사name9"},
  {bundleCode: "L2002", iId:"검사id10", iName: "검사name10"}
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
  {patientId: "1", dDate: "2021-06-20"},
  {patientId: "1", dDate: "2021-06-22"}
]

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
  {pId:"1", dDate: "2021-06-20", iId:"검사id", iName:"검사name", inspector:"정예원", iResult:"17"},
  {pId:"1", dDate: "2021-06-20", iId:"검사id2", iName:"검사name2", inspector:"정예원", iResult:"45"}
]

export function getResultIList(id) {
  let list = [];
  for(var i=0; i<resultIList.length; i++){
    if(resultIList[i].pId === (id+"")){
      list.push(resultIList[i]);
    }
  }
  return list;
};

let resultMList = [
  {pId:"1", dDate: "2021-06-20",  mId:"NIZA1", mName:"AXID Cap 1 mg", mCategory:"내복약", mUnit:"C"},
]

export function getResultMList(id) {
  let list = [];
  for(var i=0; i<resultMList.length; i++){
    if(resultMList[i].pId === (id+"")){
      list.push(resultMList[i]);
    }
  }
  return list;
};
