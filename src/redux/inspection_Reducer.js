
import { updateInspect } from "views/Inspection/data"

//상태 초기값 선택
const initialState = {
   patient:{},
   checked:[],
}

//액션 타입 선언
const SET_PATIENT = "patient/setPatient"
const SET_CHECKDOWN = "inspection/setCheckDown"
const SET_CHECKUP = "inspection/setCheckUp"
const SET_STATUS = "inspection/setStatus"
// const SET_PSTATUS = "inspection/setPstatus"





//액션 생성 함수 선언
export const createSetPatientAction = (patient) =>{
    console.log(patient)
    return {type:SET_PATIENT,patient}
};

export const createSetCheckDownAction = (id) =>{
    return {type:SET_CHECKDOWN,id}
};

export const createSetCheckUpAction = (id) =>{
    return {type:SET_CHECKUP,id}
};

// export const UpdateStatusAction = (list,status) =>{
//     updateInspect(list,status)
//     return {type:SET_STATUS,status}
// };

export const UpdateStatusAction = () =>{
    return {type:SET_STATUS}
};

// export const UpdatePstatusAction = (status) =>{
//     return {type:SET_PSTATUS,status}
// };





//리듀스 선언
const inspectionReducer = (state=initialState,action) => {

    if(action.type === SET_PATIENT){
        return {...state,patient:action.patient}
    }if(state.checked===undefined){
        state.checked=[]
    }
    if(action.type === SET_CHECKDOWN){
        return {...state,checked:state.checked.concat(action.id)}
    }
    if(action.type === SET_CHECKUP){
        return {...state,checked:state.checked.filter((el) => el !== action.id)}
    } 
    // if(action.type === SET_STATUS){
    //     const arr = state.checked.map((value)=>{
    //         value.istatus = action.status
    //         return value
    //     })
    //     return {...state,checked:arr} 
    // }
    if(action.type ===SET_STATUS){
        return {...state,checked:[]}
    }
    // if(action.type === SET_PSTATUS){
    //     return{state:action.status}
    // }
    else{
        return state;
    }
}

export default inspectionReducer;