import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  CLEAR_ERROR,
  USER_LOADED,
  AUTH_ERROR,
  LOGOUT
} from '../actions/types';

const intialState = {
  isAuthenticated: null,
  user: null,
  error: null,
  token: localStorage.getItem('jwtToken')
};

export default (state = intialState, action) => {
  switch (action.type) {
    case USER_LOADED:
      return {
        ...state,
        user: action.payload.user,
        isAuthenticated: true
      };

    case REGISTER_SUCCESS:
    case LOGIN_SUCCESS:
      localStorage.setItem('jwtToken', action.payload.token);
      return {
        ...state,
        isAuthenticated: true,
        token: action.payload.token
      };

    case LOGOUT:
      localStorage.removeItem('jwtToken');
      return {
        ...state,
        isAuthenticated: null,
        user: null,
        token: null,
        error: null
      };
    case AUTH_ERROR:
    case REGISTER_FAIL:
    case LOGIN_FAIL:
      return {
        ...state,
        isAuthenticated: null,
        user: null,
        token: null,
        error: action.payload
      };
    case CLEAR_ERROR:
      return { ...state, error: null };
    default:
      return state;
  }
};
