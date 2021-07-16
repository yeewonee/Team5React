//상태 초기값 선언
const initialState = { //처음에 컴포넌트가 전역데이터를 읽을 때
  patient_id: ''
};

//액션 타입 선언
const SET_PATIENT = "patient_id/setPatient"; //이를 선언함으로써 밑에서 간편하게 작성가능

//액션 생성 함수 선언
export const createSetManagePatient = (patient_id) => {  //얘를 호출해서 얻는 걷은? 액션객체
  return {type:SET_PATIENT, patient_id} //이게 액션 객체 역할
};

//리듀스 선언
const managePatientReducer = (state=initialState, action) => {//값이 주어지지않으면 initialState(디폴트 값) 사용
  if(action.type === SET_PATIENT) {
    return {...state, patient_id: action.patient_id};
  }else {
    return state;
  }
};

export default managePatientReducer;