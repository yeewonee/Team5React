
//상태 초기값 선언
const initialState = {
  pId:""
};

//액션 타입 선언
const SET_PID = "past/setPid";

//액션 생성 함수 선언
export const createSetPidAction = (pid) => {
  return {type:SET_PID, pid};
};


//리듀스 선언
const pastrecordReducer = (state=initialState, action) => {
  if(action.type === SET_PID){
    return {...state, pId: action.pid};
  }else{
    return state;
  }
};


export default pastrecordReducer;