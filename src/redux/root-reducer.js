import {combineReducers} from 'redux';
import inspectReducer from './inspection_Reducer';
import diagnosisReducer from './diagnosis-reducer';

import pastrecordReducer from './pastrecord-reducer';

const rootReducer = combineReducers({
    inspectReducer,
    diagnosisReducer,
    pastrecordReducer

});

export default rootReducer;