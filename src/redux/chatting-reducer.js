
//상태 초기값 선언
const initialState = {
  userId:""
};

//액션 타입 선언
const SET_USERID = "chat/setUserId";

//액션 생성 함수 선언
export const createSetUserId = (userId) => {
  return {type:SET_USERID, userId};
};


//리듀스 선언
const chattingReducer = (state=initialState, action) => {
  if(action.type === SET_USERID){
    return {...state, userId: action.userId};
  }else{
    return state;
  }
};


export default chattingReducer;