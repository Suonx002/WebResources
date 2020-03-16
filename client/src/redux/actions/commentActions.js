import axios from 'axios';

import {
  CREATE_COMMENT,
  EDIT_COMMENT,
  DELETE_COMMENT,
  GET_COMMENTS_BY_POST_ID,
  COMMENT_ERROR,
  CLEAR_COMMENT_ERROR,
  CURRENT_COMMENT,
  CLEAR_CURRENT_COMMENT
} from './types';

export const createComment = dataForm => async dispatch => {
  console.log('dataform:' + dataForm);
  console.log(dataForm);
  try {
    const res = await axios.post(`/api/v1/comments/${dataForm.post}`, dataForm);

    dispatch({
      type: CREATE_COMMENT,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: COMMENT_ERROR,
      payload: err.response
    });
  }
};

export const getCommentsByPostId = id => async dispatch => {
  try {
    const res = await axios.get(`/api/v1/comments/${id}`);

    dispatch({
      type: GET_COMMENTS_BY_POST_ID,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: COMMENT_ERROR,
      payload: err.response
    });
  }
};

export const updateComment = formData => async dispatch => {
  try {
    const res = await axios.patch(
      `/api/v1/comments/${formData.postId}/${formData.commentId}`,
      formData
    );

    dispatch({
      type: EDIT_COMMENT,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: COMMENT_ERROR,
      payload: err.response
    });
  }
};

export const deleteComment = formData => async dispatch => {
  try {
    const res = await axios.delete(
      `/api/v1/comments/${formData.postId}/${formData.commentId}`
    );

    dispatch({
      type: DELETE_COMMENT,
      payload: formData
    });
  } catch (err) {
    dispatch({
      type: COMMENT_ERROR,
      payload: err.response
    });
  }
};

export const clearCommentError = () => dispatch => {
  dispatch({
    type: CLEAR_COMMENT_ERROR
  });
};

export const setCurrentComment = comment => dispatch => {
  dispatch({
    type: CURRENT_COMMENT,
    payload: comment
  });
};

export const clearCurrentComment = () => dispatch => {
  dispatch({
    type: CLEAR_CURRENT_COMMENT
  });
};
