import { combineReducers } from "redux";
import createReceptionReducer from "./createReception-reducer";
import inspectReducer from './inspection_Reducer';
import diagnosisReducer from './diagnosis-reducer';
import receptionReducer from './reception-reducer';

const rootReducer = combineReducers({
    inspectReducer,
    diagnosisReducer,
    createReceptionReducer,
    receptionReducer
});

export default rootReducer;