import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  CLEAR_ERROR,
  USER_LOADED,
  AUTH_ERROR,
  LOGOUT,
  UPLOAD_PROFILE,
  UPLOAD_ERROR,
  CLEAR_STATUS,
  UPDATE_PASSWORD,
  UPDATE_PASSWORD_ERROR
} from '../actions/types';

const intialState = {
  isAuthenticated: null,
  user: null,
  error: null,
  status: null,
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
        token: action.payload.token,
        status: {
          status: 'Login',
          message: 'Logged in successfully!'
        }
      };
    case LOGOUT:
      localStorage.removeItem('jwtToken');
      return {
        ...state,
        isAuthenticated: null,
        user: null,
        token: null,
        error: null,
        status: {
          status: 'Logout',
          message: 'Logout successfully!'
        }
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
    case UPDATE_PASSWORD:
      return {
        ...state,
        status: {
          status: action.payload.status,
          message: 'Password updated successfully'
        },
        loading: false
      };
    case UPDATE_PASSWORD_ERROR:
      return { ...state, error: action.payload, loading: false };
    case UPLOAD_PROFILE:
      return {
        ...state,
        user: { ...state.user, avatar: action.payload.url.url },
        status: {
          status: action.payload.status,
          message: 'Upload profile image successfully'
        },
        loading: false
      };
    case UPLOAD_ERROR:
      return { ...state, error: action.payload };
    case CLEAR_STATUS:
      return { ...state, status: null };
    case CLEAR_ERROR:
      return { ...state, error: null };
    default:
      return state;
  }
};
