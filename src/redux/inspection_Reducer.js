//상태 초기값 선언
let array=[];
const initialState = {
   pno:'',
   checked:[]
}

//액션 타입 선언
const SET_PATIENT = "patient/setPatient"
const SET_CHECKDOWN = "patient/setCheckDown"
const SET_CHECKUP = "patient/setCheckUp"

//액션 생성 함수 선언
export const createSetPatientAction = (pno) =>{
    return {type:SET_PATIENT,pno}
};

export const createSetCheckDownAction = (id) =>{
    return {type:SET_CHECKDOWN,id}
};

export const createSetCheckUpAction = (id) =>{
    return {type:SET_CHECKUP,id}
};

//리듀스 선언
const inspectionReducer = (state=initialState,action) => {
    console.log(state.checked)

    if(action.type === SET_PATIENT){
        return {pno:action.pno}
    }if(state.checked===undefined){
        state.checked=[]
    }
    if(action.type === SET_CHECKDOWN){
        console.log("왔다")
        return {...state,checked:state.checked.concat(action.id)}
    }
    if(action.type === SET_CHECKUP){
        return {...state,checked:state.checked.filter((el) => el !== action.id)}
    } 
    else{
        return state;
    }
}

export default inspectionReducer;