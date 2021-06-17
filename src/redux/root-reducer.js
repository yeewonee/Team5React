import { combineReducers } from "redux";

import diagnosisReducer from "redux/diagnosis-reducer";
import pastrecordReducer from "./pastrecord-reducer";

const rootReducer = combineReducers({
  diagnosisReducer,
  pastrecordReducer
});

export default rootReducer;