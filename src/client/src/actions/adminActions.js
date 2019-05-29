import axios from "axios";
import { CLEAR_USER, GET_USER, GET_USERS_FAILED } from "./types";

export const getUser = id => async dispatch => {
  try {
    const res = await axios.get(`/api/subject/getStudent/${id}`);

    dispatch({
      type: CLEAR_USER
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
