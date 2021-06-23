import moment from 'moment';

//상태 초기값 선언
const initialState = {
  comment: "",
  day: moment(new Date()).format('YYYY-MM-DD'),
  mlist: [],
  mId: "",
  ilist: [],
  iId: "",
  pId:""
};

//액션 타입 선언
const SET_COMMENT = "diagnosis/setComment";
const SET_DAY = "diagnosis/setDay";
const SET_ADDMLIST = "diagnosis/setMlist";
const SET_REMOVEMLIST = "diagnosis/setRemoveMlist";
const SET_ADDILIST = "diagnosis/setAddIlist";
const SET_REMOVEILIST = "diagnosis/setRemoveIlist";
const SET_PID = "diagnosis/setPid";

//액션 생성 함수 선언
export const createSetPidAction = (pid) => {
  return {type:SET_PID, pid};
};

export const createSetMemoAction = (comment) => {
  return {type:SET_COMMENT, comment};
};

export const createSetDayAction = (day) => {
  return {type:SET_DAY, day};
};

export const createSetAddMlistAction = (mlist) => {
  return {type:SET_ADDMLIST, mlist};
};

export const createSetRemoveMlistAction = (mid) => {
  return {type:SET_REMOVEMLIST, mid};
};

export const createSetAddIlistAction = (ilist) => {
  return {type:SET_ADDILIST, ilist};
};

export const createSetRemoveIlistAction = (iid) => {
  return {type:SET_REMOVEILIST, iid};
};


//리듀스 선언
const diagnosisReducer = (state=initialState, action) => {
  if(action.type === SET_COMMENT){
    return {...state, comment: action.comment};
  }else if(action.type === SET_DAY){
    return {...state, day: action.day};
  }else if(action.type === SET_ADDMLIST){
    return {...state, mlist: action.mlist};
  }else if(action.type === SET_REMOVEMLIST){
    return {...state, mlist: state.mlist.filter((mlist) => mlist.mId !== action.mid)};
  }else if(action.type === SET_ADDILIST){
    return {...state, ilist: action.ilist};
  }else if(action.type === SET_REMOVEILIST){
    return {...state, ilist: state.ilist.filter((ilist) => ilist.iId !== action.iid)};
  }else if(action.type === SET_PID){
    return {...state, pId: action.pid};
  }else{
    return state;
  }
};


export default diagnosisReducer;