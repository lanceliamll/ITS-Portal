import { combineReducers } from "redux";
import admin from "./admin";
import alert from "./alert";
import auth from "./auth";
import subject from "./subject";

export default combineReducers({
  alert,
  auth,
  subject,
  admin
});
