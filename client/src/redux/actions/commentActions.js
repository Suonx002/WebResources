import axios from 'axios';

import {
  CREATE_COMMENT,
  EDIT_COMMENT,
  DELETE_COMMENT,
  GET_COMMENTS_BY_POST_ID,
  COMMENT_ERROR,
  CLEAR_COMMENT_ERROR
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

export const clearCommentError = () => dispatch => {
  dispatch({
    type: CLEAR_COMMENT_ERROR
  });
};
