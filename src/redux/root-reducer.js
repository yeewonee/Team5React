import { combineReducers } from "redux";
import createReceptionReducer from "./createReception-reducer";
import inspectReducer from './inspection_Reducer';
import diagnosisReducer from './diagnosis-reducer';
import pastrecordReducer from './pastrecord-reducer';
import receptionReducer from './reception-reducer';

const rootReducer = combineReducers({
    inspectReducer,
    diagnosisReducer,
    pastrecordReducer,
    createReceptionReducer,
    receptionReducer
});

export default rootReducer;