import axios from 'axios';

import setAuthorizationToken from '../../utils/setAuthorizationToken';
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  CLEAR_ERROR,
  USER_LOADED,
  AUTH_ERROR
} from './types';

const baseURL = 'http://localhost:5000';

export const loadUser = () => async dispatch => {
  setAuthorizationToken(localStorage.jwtToken);

  try {
    // const res = await axios.get(`${baseURL}/api/v1/users/me`);
    const res = await axios.get(`/api/v1/users/me`);
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
    // const res = await axios.post(`${baseURL}/api/v1/users/register`, data);
    const res = await axios.post(`/api/v1/users/register`, data);

    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data
    });

    dispatch(loadUser());
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
    // const res = await axios.post(`${baseURL}/api/v1/users/login`, data);
    const res = await axios.post(`/api/v1/users/login`, data);
    // console.log(res);

    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data
    });

    dispatch(loadUser());
  } catch (err) {
    console.log(err.response);
    console.log(err.response.data);
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

export const logoutUser = () => dispatch => {
  dispatch({
    type: LOGOUT
  });
};
