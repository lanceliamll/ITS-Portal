import {
  CLEAR_USER_SUBJECTS,
  GET_USER_SUBJECTS,
  GET_USER_SUBJECTS_ERROR
} from "../actions/types";

const initialState = {
  subject: [],
  subjects: [],
  loading: true,
  error: {}
};

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_USER_SUBJECTS:
      return {
        ...state,
        subjects: payload,
        loading: false
      };
    case GET_USER_SUBJECTS_ERROR:
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
