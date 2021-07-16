import { combineReducers } from "redux";
import createReceptionReducer from "./createReception-reducer";
import inspectReducer from './inspection_Reducer';
import diagnosisReducer from './diagnosis-reducer';
import receptionReducer from './reception-reducer';
import authReducer from "./auth-reducer"
import managePatientReducer from "./managePatient-reducer";
import chattingReducer from "./chatting-reducer";


const rootReducer = combineReducers({
    inspectReducer,
    diagnosisReducer,
    createReceptionReducer,
    receptionReducer,
    authReducer,
    managePatientReducer,
    chattingReducer
});

export default rootReducer;