import {
  GET_POSTS_BY_CATEGORY,
  GET_POST_BY_ID,
  POST_ERROR,
  CREATE_POST,
  CLEAR_POST_ERROR
} from '../actions/types';

const initialState = {
  post: null,
  posts: null,
  loading: true,
  error: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_POSTS_BY_CATEGORY:
      return { ...state, posts: [...action.payload], loading: false };
    case GET_POST_BY_ID:
      return { ...state, post: action.payload, loading: false };
    case CREATE_POST:
      return { ...state, post: action.payload, loading: false };
    case POST_ERROR:
      return { ...state, error: action.payload, loading: false };
    case CLEAR_POST_ERROR:
      return { ...state, error: null };
    default:
      return state;
  }
};
