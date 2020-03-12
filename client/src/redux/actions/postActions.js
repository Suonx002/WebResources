import axios from 'axios';
import {
  GET_POSTS_BY_CATEGORY,
  GET_POST_BY_ID,
  POST_ERROR,
  CREATE_POST,
  CLEAR_POST_ERROR
} from './types';
import setAuthorizationToken from '../../utils/setAuthorizationToken';

const baseURL = 'http://localhost:5000';

export const getPostsByCategory = category => async dispatch => {
  try {
    const res = await axios.get(`${baseURL}/api/v1/posts/category/${category}`);

    dispatch({
      type: GET_POSTS_BY_CATEGORY,
      payload: res.data.posts
    });
  } catch (err) {
    console.log(err.response);
    dispatch({
      type: POST_ERROR,
      payload: err.response.data
    });
  }
};

export const getPostById = id => async dispatch => {
  if (localStorage.jwtToken) {
    setAuthorizationToken(localStorage.jwtToken);
  }

  try {
    const res = await axios.get(`${baseURL}/api/v1/posts/${id}`);

    dispatch({
      type: GET_POST_BY_ID,
      payload: res.data.post
    });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: err.response.data
    });
  }
};

export const createPost = dataForm => async dispatch => {
  if (localStorage.jwtToken) {
    setAuthorizationToken(localStorage.jwtToken);
  }

  try {
    const res = await axios.post(`${baseURL}/api/v1/posts/`, dataForm);

    console.log(res);

    dispatch({
      type: CREATE_POST,
      payload: res.data.post
    });
  } catch (err) {
    // console.log(err.response);
    // console.log(err);
    // console.error(err);

    dispatch({
      type: POST_ERROR,
      payload: err.response.data
    });
  }
};

export const clearPostError = () => dispatch => {
  return dispatch({
    type: CLEAR_POST_ERROR
  });
};
