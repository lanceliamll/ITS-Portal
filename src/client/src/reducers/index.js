import { combineReducers } from "redux";
import alert from "./alert";
import auth from "./auth";
import subject from "./subject";

export default combineReducers({
  alert,
  auth,
  subject
});
