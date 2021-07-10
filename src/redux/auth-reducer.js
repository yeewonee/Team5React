//상태 초기값 선언
const initialState = { //처음에 컴포넌트가 전역데이터를 읽을 때
  uid: "",
  authToken: "",
  role: "",
  name: ""
};

//액션 타입 선언
const SET_UID = "auth/setUid"; //이를 선언함으로써 밑에서 간편하게 작성가능
const SET_AUTH_TOKEN ="auth/setAuthToken";
const SET_ROLE ="auth/setRole";
const SET_NAME ="auth/setName";


//액션 생성 함수 선언
export const createSetUidAction = (uid) => { //얘를 호출해서 얻는 걷은? 액션객체
  return {type:SET_UID, uid}//이게 액션 객체 역할
};
export const createSetAuthTokenAction = (authToken) => { //얘를 호출해서 얻는 걷은? 액션객체
  return {type:SET_AUTH_TOKEN, authToken}//이게 액션 객체 역할
}; 

export const createSetRoleAction = (role) => { //얘를 호출해서 얻는 걷은? 액션객체
  return {type:SET_ROLE, role}//이게 액션 객체 역할
}; 

export const createSetNameAction = (name) => { //얘를 호출해서 얻는 걷은? 액션객체
  return {type:SET_NAME, name}//이게 액션 객체 역할
}; 
//리듀스 선언
const authReducer = (state=initialState, action) => {//값이 주어지지않으면 initialState(디폴트 값) 사용
  if(action.type === SET_UID){
    return {...state, uid:action.uid};
  } else if(action.type===SET_AUTH_TOKEN){
    return {...state, authToken:action.authToken};
  } else if(action.type===SET_ROLE){
    return {...state, role:action.role};
  } else if(action.type===SET_NAME){
    return {...state, name:action.name};
  } else {
    return state;
  }
};

export default authReducer;