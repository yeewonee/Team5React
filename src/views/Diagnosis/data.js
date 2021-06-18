let size = 15;

// 환자리스트
let patientList = [];
for(var i=1; i<=size; i++) {
  patientList.push({
    patientId:i, 
    patientName:"정윤환"+i, 
    patientSsn1:"95062"+i, 
    patientPhone:"0101234567"+i, 
  });
}
export function getPatientList() {
  return patientList;
};

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

