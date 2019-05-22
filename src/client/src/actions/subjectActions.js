import axios from "axios";
//import { setAlert } from "./alert";
import { GET_USER_SUBJECTS, GET_USER_SUBJECTS_ERROR } from "./types";

export const getUserSubjects = id => async dispatch => {
  try {
    const res = await axios.get(`api/subject/student/${id}`);

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
