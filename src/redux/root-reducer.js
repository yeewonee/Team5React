import { combineReducers } from "redux";
import createreceptionReducer from "./createReception-reducer";
import inspectReducer from './inspection_Reducer';
import diagnosisReducer from './diagnosis-reducer';
import receptionReducer from './reception-reducer';
import pastrecordReducer from './pastrecord-reducer';
import authReducer from './auth-reducer'

const rootReducer = combineReducers({
    inspectReducer,
    diagnosisReducer,
    pastrecordReducer,
    createreceptionReducer,
    receptionReducer,
    authReducer
});

export default rootReducer;