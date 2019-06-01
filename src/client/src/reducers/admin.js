import {
  CLEAR_USER,
  GET_USER,
  GET_USERS,
  GET_USERS_FAILED,
  MAKE_USER_ADMIN,
  MAKE_USER_ADMIN_FAILED
} from "../actions/types";

const initialState = {
  loading: true,
  user: null,
  users: [],
  error: []
};

export default function(state = initialState, action) {
  const { payload, type } = action;

  switch (type) {
    case GET_USERS:
      return {
        ...state,
        users: payload,
        loading: false
      };
    case MAKE_USER_ADMIN:
      return {
        ...state,
        loading: false,
        user: payload
      };

    case GET_USER:
      return {
        ...state,
        user: payload,
        loading: false
      };
    case GET_USERS_FAILED:
    case CLEAR_USER:
    case MAKE_USER_ADMIN_FAILED:
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
