import { combineReducers } from "redux";
import createreceptionReducer from "./createReception-reducer";
import inspectReducer from './inspection_Reducer';
import diagnosisReducer from './diagnosis-reducer';
import pastrecordReducer from './pastrecord-reducer';

const rootReducer = combineReducers({
    inspectReducer,
    diagnosisReducer,
    pastrecordReducer,
    createreceptionReducer,
});

export default rootReducer;