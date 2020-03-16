import {
  CREATE_COMMENT,
  EDIT_COMMENT,
  DELETE_COMMENT,
  GET_COMMENTS_BY_POST_ID,
  COMMENT_ERROR,
  CLEAR_COMMENT_ERROR,
  CURRENT_COMMENT,
  CLEAR_CURRENT_COMMENT
} from '../actions/types';

const initialState = {
  comment: null,
  comments: [],
  current: null,
  error: null,
  status: null,
  loading: true
};

export default (state = initialState, action) => {
  switch (action.type) {
    case CREATE_COMMENT:
      return {
        ...state,
        comments: [...state.comments, action.payload.comment],
        status: action.payload.status,
        loading: false
      };
    case GET_COMMENTS_BY_POST_ID:
      return {
        ...state,
        comments: action.payload.comments,
        loading: false
      };
    case EDIT_COMMENT:
      return {
        ...state,
        comments: state.comments.map(comment =>
          comment._id === action.payload.commentId ? action.payload : comment
        ),
        status: action.payload.status,
        loading: false
      };
    case DELETE_COMMENT:
      return {
        ...state,
        comments: state.comments.filter(
          comment => comment._id !== action.payload.commentId
        ),
        loading: false
      };
    case CURRENT_COMMENT:
      return {
        ...state,
        current: action.payload,
        loading: false
      };
    case CLEAR_CURRENT_COMMENT:
      return {
        ...state,
        current: null,
        loading: false
      };
    case COMMENT_ERROR:
      return { ...state, error: action.payload.data, loading: false };
    case CLEAR_COMMENT_ERROR:
      return { ...state, error: null, loading: false };
    default:
      return state;
  }
};
