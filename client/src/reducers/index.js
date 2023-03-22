import { combineReducers } from "redux";
import alert from "../reducers/Alert";
import auth from "../reducers/auth";
export default combineReducers({ alert, auth });
