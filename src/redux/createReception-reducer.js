//상태 초기값 선언
const initialState = { //처음에 컴포넌트가 전역데이터를 읽을 때
  doctor_id: '',
  patient_id: '',
  time: '',
  date: new Date()
};

//액션 타입 선언
const SET_DOCTOR = "doctor_id/setDoctor"; //이를 선언함으로써 밑에서 간편하게 작성가능
const SET_PATIENT = "patient_id/setPatient";
const SET_TIME = "time/setTime"
const SET_DATE = "date/setDate"

//액션 생성 함수 선언
export const createSetDoctor = (doctor_id) => { //얘를 호출해서 얻는 걷은? 액션객체
  return {type:SET_DOCTOR, doctor_id}//이게 액션 객체 역할
}; 

export const createSetPatient = (patient_id) => {
  return {type:SET_PATIENT, patient_id}
};

export const createSetTime = (time) => {
  return {type:SET_TIME, time}
}

export const createSetDate = (date) => {
  return {type:SET_DATE, date}
}

//리듀스 선언
const createReceptionReducer = (state=initialState, action) => {//값이 주어지지않으면 initialState(디폴트 값) 사용
  if(action.type === SET_DOCTOR) {
    return {...state, doctor_id: action.doctor_id};
  } else if(action.type === SET_PATIENT) {
    return {...state, patient_id: action.patient_id};
  } else if(action.type === SET_TIME) {
    return {...state, time: action.time};
  } else if(action.type === SET_DATE) {
    return {...state, date: action.date};
  } else {
    return state;
  }
};

export default createReceptionReducer;