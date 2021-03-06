import axios from "axios";
import {
  CLEAR_USER,
  CLEAR_USERS,
  ENROLL_STUDENT_FAILED,
  GET_USER,
  GET_USERS,
  GET_USERS_FAILED,
  MAKE_USER_ADMIN,
  MAKE_USER_ADMIN_FAILED
} from "./types";
export const getUser = id => async dispatch => {
  try {
    const res = await axios.get(`/api/subject/getStudent/${id}`);

    dispatch({
      type: CLEAR_USER
    });
    dispatch({
      type: CLEAR_USERS
    });
    dispatch({
      type: GET_USER,
      payload: res.data
    });
  } catch (error) {
    dispatch({
      type: GET_USERS_FAILED,
      payload: { msg: error.response.statusText, status: error.response.status }
    });
  }
};

export const makeUserAnAdmin = id => async dispatch => {
  try {
    const res = await axios.post(`/api/user/makeadmin/${id}`);

    dispatch({
      type: MAKE_USER_ADMIN,
      payload: res.data
    });
  } catch (error) {
    dispatch({
      type: MAKE_USER_ADMIN_FAILED,
      payload: { msg: error.response.statusText, status: error.response.status }
    });
  }
};

export const getUsers = () => async dispatch => {
  try {
    const res = await axios.get("/api/user/students");

    dispatch({
      type: CLEAR_USER
    });
    dispatch({
      type: CLEAR_USERS
    });
    dispatch({
      type: GET_USERS,
      payload: res.data
    });
  } catch (error) {
    dispatch({
      type: GET_USERS_FAILED,
      payload: { msg: error.response.statusText, status: error.response.status }
    });
  }
};

export const enrollStudent = (
  id,
  { subjectName, sectionName }
) => async dispatch => {
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  const body = JSON.stringify({
    subjectName,
    sectionName
  });

  try {
    await axios.post(`/api/subject/enroll/${id}`, body, config);
  } catch (error) {
    dispatch({
      type: ENROLL_STUDENT_FAILED,
      payload: { msg: error.response.statusText, status: error.response.status }
    });
  }
};
