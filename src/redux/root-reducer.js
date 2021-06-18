import { combineReducers } from "redux";
import receptionReducer from "./reception-reducer";

const rootReducer = combineReducers({ //선언된 리듀스들을 다 결합하겠다
  //다른 리듀스들이 더 있다면 ,를 써서 밑에 더 써주면 됨!
  receptionReducer
});

export default rootReducer;