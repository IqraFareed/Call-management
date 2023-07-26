import { combineReducers } from "redux";
import callsReducer from "./CallReducer";

const reducers = (history: any) =>
  combineReducers({
    calls: callsReducer,
  });

export default reducers;
