import { combineReducers } from "redux";
import receptionReducer from "./reception-reducer";
import inspectReducer from './inspection_Reducer';
import diagnosisReducer from './diagnosis-reducer';

import pastrecordReducer from './pastrecord-reducer';

const rootReducer = combineReducers({
    inspectReducer,
    diagnosisReducer,
    pastrecordReducer,
    receptionReducer
});

export default rootReducer;