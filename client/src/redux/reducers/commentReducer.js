import {
  CREATE_COMMENT,
  EDIT_COMMENT,
  DELETE_COMMENT,
  GET_COMMENTS_BY_POST_ID,
  COMMENT_ERROR,
  CLEAR_COMMENT_ERROR
} from '../actions/types';

const initialState = {
  comment: null,
  comments: [],
  error: null,
  loading: true
};

export default (state = initialState, action) => {
  switch (action.type) {
    case CREATE_COMMENT:
      return {
        ...state,
        comments: [...state.comments, action.payload.comment],
        loading: false
      };
    case GET_COMMENTS_BY_POST_ID:
      return {
        ...state,
        comments: action.payload.comments,
        loading: false
      };
    case COMMENT_ERROR:
      return { ...state, error: action.payload, loading: false };
    case CLEAR_COMMENT_ERROR:
      return { ...state, error: null, loading: false };
    default:
      return state;
  }
};
