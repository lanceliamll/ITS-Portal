import {
  CLEAR_USER_SUBJECTS,
  GET_SUBJECT_BY_USERID,
  GET_SUBJECT_BY_USERID_FAILED,
  GET_USER_SUBJECT,
  GET_USER_SUBJECTS,
  GET_USER_SUBJECTS_ERROR
} from "../actions/types";

const initialState = {
  subject: null,
  subjects: [],
  loading: true,
  error: {}
};

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_SUBJECT_BY_USERID:
      return {
        ...state,
        subjects: payload,
        loading: false
      };
    case GET_USER_SUBJECT:
      return {
        ...state,
        subject: payload,
        loading: false
      };
    case GET_USER_SUBJECTS:
      return {
        ...state,
        subjects: payload,
        loading: false
      };
    case GET_USER_SUBJECTS_ERROR:
    case GET_SUBJECT_BY_USERID_FAILED:
      return {
        ...state,
        error: payload,
        loading: false
      };
    case CLEAR_USER_SUBJECTS:
      return {
        ...state,
        subjects: [],
        loading: false
      };
    default:
      return state;
  }
}
