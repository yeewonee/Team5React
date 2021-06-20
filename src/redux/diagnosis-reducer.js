import moment from 'moment';

//상태 초기값 선언
const initialState = {
  comment: "",
  day: moment(new Date()).format('YYYY-MM-DD'),
  mlist: [],
  ilist: [],
};

//액션 타입 선언
const SET_COMMENT = "diagnosis/setComment";
const SET_DAY = "diagnosis/setDay";
const SET_MLIST = "diagnosis/setMlist";
const SET_ILIST = "diagnosis/setIlist";

//액션 생성 함수 선언
export const createSetMemoAction = (comment) => {
  return {type:SET_COMMENT, comment};
};

export const createSetDayAction = (day) => {
  return {type:SET_DAY, day};
};

export const createSetMlistAction = (mlist) => {
  console.log(mlist);
  return {type:SET_MLIST, mlist};
};

export const createSetIlistAction = (ilist) => {
  return {type:SET_ILIST, ilist};
};

//리듀스 선언
const diagnosisReducer = (state=initialState, action) => {
  if(action.type === SET_COMMENT){
    return {...state, comment: action.comment};
  }else if(action.type === SET_DAY){
    return {...state, day: action.day};
  }else if(action.type === SET_MLIST){
    return {...state, mlist: action.mlist};
  }else if(action.type === SET_ILIST){
    return {...state, ilist: action.ilist};
  }else{
    return state;
  }
};


export default diagnosisReducer;