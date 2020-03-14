import axios from 'axios';
import {
  GET_POSTS_BY_CATEGORY,
  GET_POST_BY_ID,
  POST_ERROR,
  CREATE_POST,
  CLEAR_POST_ERROR,
  CLEAR_POST,
  LIKE_POST,
  DISLIKE_POST,
  CURRENT_POST,
  CLEAR_CURRENT_POST,
  UPDATE_POST,
  DELETE_POST
} from './types';
// import setAuthorizationToken from '../../utils/setAuthorizationToken';

const baseURL = 'http://localhost:5000';

export const getPostsByCategory = category => async dispatch => {
  try {
    // const res = await axios.get(`${baseURL}/api/v1/posts/category/${category}`);
    const res = await axios.get(`/api/v1/posts/category/${category}`);

    dispatch({
      type: GET_POSTS_BY_CATEGORY,
      payload: res.data.posts
    });
  } catch (err) {
    // console.log(err.response);

    dispatch({
      type: POST_ERROR,
      payload: err.response.data
    });
  }
};

export const getPostById = id => async dispatch => {
  // if (localStorage.jwtToken) {
  //   setAuthorizationToken(localStorage.jwtToken);
  // }

  try {
    // const res = await axios.get(`${baseURL}/api/v1/posts/${id}`);
    const res = await axios.get(`/api/v1/posts/${id}`);

    dispatch({
      type: GET_POST_BY_ID,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: err.response.data
    });
  }
};

export const createPost = dataForm => async dispatch => {
  // if (localStorage.jwtToken) {
  //   // setAuthorizationToken(localStorage.jwtToken);
  // }

  try {
    // const res = await axios.post(`${baseURL}/api/v1/posts/`, dataForm);
    const res = await axios.post(`/api/v1/posts/`, dataForm);

    console.log(res);

    dispatch({
      type: CREATE_POST,
      payload: res.data
    });
  } catch (err) {
    console.log(err.response);
    // console.log(err);
    // console.error(err);

    dispatch({
      type: POST_ERROR,
      payload: err.response.data
    });
  }
};

export const updatePost = dataForm => async dispatch => {
  try {
    const res = await axios.patch(`/api/v1/posts/${dataForm.id}`, dataForm);

    console.log(res.data);

    dispatch({
      type: UPDATE_POST,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: err.response
    });
  }
};

export const deletePost = id => async dispatch => {
  try {
    const res = await axios.delete(`/api/v1/posts/${id}`);

    dispatch({
      type: DELETE_POST,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: err.response
    });
  }
};

export const clearPost = () => dispatch => {
  return dispatch({
    type: CLEAR_POST
  });
};

export const clearPostError = () => dispatch => {
  return dispatch({
    type: CLEAR_POST_ERROR
  });
};

export const likePost = id => async dispatch => {
  try {
    // await axios.patch(`${baseURL}/api/v1/posts/like/${id}`);
    await axios.patch(`/api/v1/posts/like/${id}`);

    // console.log(res);
    dispatch({
      type: LIKE_POST,
      payload: id
    });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: err.response.data
    });
  }
};

export const dislikePost = id => async dispatch => {
  try {
    // await axios.patch(`${baseURL}/api/v1/posts/dislike/${id}`);
    await axios.patch(`/api/v1/posts/dislike/${id}`);

    // console.log(res);
    dispatch({
      type: DISLIKE_POST,
      payload: id
    });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: err.response.data
    });
  }
};

export const currentPost = post => dispatch => {
  dispatch({
    type: CURRENT_POST,
    payload: post
  });
};

export const clearCurrentPost = () => dispatch => {
  dispatch({
    type: CLEAR_CURRENT_POST
  });
};
