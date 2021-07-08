import moment from "moment";

//상태 초기값 선언
const initialState = { //처음에 컴포넌트가 전역데이터를 읽을 때
  day: moment(new Date()).format('YYYY-MM-DD'),
  Rday: moment(new Date()).day()
};

//액션 타입 선언
const SET_DAY = "reception/setDay"; //이를 선언함으로써 밑에서 간편하게 작성가능
const SET_RDAY = "reception/setRDay"
//액션 생성 함수 선언
export const setReceptionDay = (day) => { //얘를 호출해서 얻는 걷은? 액션객체
  return {type:SET_DAY, day}//이게 액션 객체 역할
}; 
export const setRday = (Rday) => { //얘를 호출해서 얻는 걷은? 액션객체
  return {type:SET_RDAY, Rday}//이게 액션 객체 역할
}; 


//리듀스 선언
const receptionReducer = (state=initialState, action) => {//값이 주어지지않으면 initialState(디폴트 값) 사용
  if(action.type === SET_DAY) {
    return {...state, day: action.day};
  }else if(action.type === SET_RDAY) {
    return {...state, Rday: action.Rday};
  } 
  else {
    return state;
  }
};

export default receptionReducer;