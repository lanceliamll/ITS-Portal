import axios from "axios";
import setAuthToken from "../helpers/setAuthToken";
import { setAlert } from "./alert";
import {
  AUTH_ERROR,
  LOGIN_FAILED,
  LOGIN_SUCCESS,
  REGISTER_FAILED,
  REGISTER_SUCCESS,
  USER_LOADED
} from "./types";

//Load the user
export const loadUser = () => async dispatch => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }

  try {
    const res = await axios.get("/api/user");

    dispatch({
      type: USER_LOADED,
      payload: res.data
    });
  } catch (error) {
    dispatch({
      type: AUTH_ERROR
    });
  }
};

//Login User
export const loginUser = (schoolId, password) => async dispatch => {
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };
  const body = JSON.stringify({ schoolId, password });

  try {
    const res = await axios.post("api/user/login", body, config);

    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data
    });
    dispatch(loadUser());
  } catch (error) {
    const errors = error.response.data.errors;

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, "secondary", 5000)));
    }

    dispatch({
      type: LOGIN_FAILED
    });
  }
};

//Register a user
export const registerUser = ({
  schoolId,
  firstName,
  lastName,
  email,
  password
}) => async dispatch => {
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  const body = JSON.stringify({
    schoolId,
    firstName,
    lastName,
    email,
    password
  });

  try {
    const res = await axios.post("/api/user/register", body, config);

    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data
    });
    dispatch(loadUser());
  } catch (error) {
    const errors = error.response.data.errors;

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, "secondary", 5000)));
    }

    dispatch({
      type: REGISTER_FAILED
    });
  }
};
