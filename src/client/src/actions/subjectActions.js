import axios from "axios";
//import { setAlert } from "./alert";
import {
  GET_SUBJECT_BY_USERID,
  GET_SUBJECT_BY_USERID_FAILED,
  GET_USER_SUBJECT,
  GET_USER_SUBJECTS,
  GET_USER_SUBJECTS_ERROR
} from "./types";

export const getUserSubjects = id => async dispatch => {
  try {
    const res = await axios.get(`/api/subject/student/${id}`);

    dispatch({
      type: GET_USER_SUBJECTS,
      payload: res.data
    });
  } catch (error) {
    dispatch({
      type: GET_USER_SUBJECTS_ERROR,
      payload: { msg: error.response.statusText, status: error.response.status }
    });
  }
};

export const getUserSubject = id => async dispatch => {
  try {
    const res = await axios.get(`/api/subject/grade/${id}`);

    dispatch({
      type: GET_USER_SUBJECT,
      payload: res.data
    });
  } catch (error) {
    dispatch({
      type: GET_USER_SUBJECTS_ERROR,
      payload: { msg: error.response.statusText, status: error.response.status }
    });
  }
};

export const getSubjectsByUserId = subjectName => async dispatch => {
  try {
    const res = await axios.get(`/api/subject/student/${subjectName}`);

    dispatch({
      type: GET_SUBJECT_BY_USERID,
      payload: res.data
    });
  } catch (error) {
    dispatch({
      type: GET_SUBJECT_BY_USERID_FAILED
    });
  }
};
