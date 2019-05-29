import { CLEAR_USER, GET_USER, GET_USERS_FAILED } from "../actions/types";

const initialState = {
  loading: true,
  user: null,
  users: [],
  error: []
};

export default function(state = initialState, action) {
  const { payload, type } = action;

  switch (type) {
    case GET_USER:
      return {
        ...state,
        user: payload,
        loading: false
      };
    case GET_USERS_FAILED:
    case CLEAR_USER:
      return {
        ...state,
        user: null,
        users: [],
        loading: false,
        error: payload
      };
    default:
      return state;
  }
}
