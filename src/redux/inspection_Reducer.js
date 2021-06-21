//상태 초기값 선택
const initialState = {
   pno:'',
   checked:[],
}

//액션 타입 선언
const SET_PATIENT = "patient/setPatient"
const SET_CHECKDOWN = "inspection/setCheckDown"
const SET_CHECKUP = "inspection/setCheckUp"
const SET_STATUS = "inspection/setStatus"
// const DELETE_STATUS = "inspection/deleteStatus"


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

export const UpdateStatusAction = (status) =>{
    //여기서 디비 업데이트 해주고
    return {type:SET_STATUS,status}
};

//리듀스 선언
const inspectionReducer = (state=initialState,action) => {

    if(action.type === SET_PATIENT){
        return {pno:action.pno}
    }if(state.checked===undefined){
        state.checked=[]
    }
    if(action.type === SET_CHECKDOWN){
        return {...state,checked:state.checked.concat(action.id)}
    }
    if(action.type === SET_CHECKUP){
        return {...state,checked:state.checked.filter((el) => el !== action.id)}
    } 
    if(action.type === SET_STATUS){
        const arr = state.checked.map((value)=>{
            value.istatus = action.status
            return value
        })
        return {checked:arr} 
    }
    // if(action.type === DELETE_STATUS){
    //     return {...state,status:state.status.filter((el) => el !== action.status)}
    // } 
    else{
        return state;
    }
}

export default inspectionReducer;