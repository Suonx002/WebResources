import axios from 'axios';

import setAuthorizationToken from '../../utils/setAuthorizationToken';
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  CLEAR_ERROR,
  USER_LOADED,
  AUTH_ERROR
} from './types';

const baseURL = 'http://localhost:5000';

export const loadUser = () => async dispatch => {
  try {
    const res = await axios.get('/api/v1/users/me');
    // console.log(res.data);

    dispatch({
      type: USER_LOADED,
      payload: res.data
    });
  } catch (err) {
    // console.log(err.response);
    dispatch({
      type: AUTH_ERROR,
      payload: err.response.data
    });
  }
};

export const registerUser = data => async dispatch => {
  try {
    const res = await axios.post(`${baseURL}/api/v1/users/register`, data);

    // console.log(res);
    setAuthorizationToken(res.data.token);

    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data
    });
  } catch (err) {
    // console.log(err.response.data);

    dispatch({
      type: REGISTER_FAIL,
      payload: err.response.data
    });
  }
};

export const loginUser = data => async dispatch => {
  try {
    const res = await axios.post(`${baseURL}/api/v1/users/login`, data);
    // console.log(res);

    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data
    });
  } catch (err) {
    // console.log(err.response.data);
    dispatch({
      type: LOGIN_FAIL,
      payload: err.response.data
    });
  }
};

export const clearError = () => {
  return {
    type: CLEAR_ERROR
  };
};
