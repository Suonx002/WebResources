import {
  GET_POSTS_BY_CATEGORY,
  GET_POST_BY_ID,
  POST_ERROR
} from '../actions/types';

const initialState = {
  post: null,
  posts: null,
  error: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_POSTS_BY_CATEGORY:
      return { ...state, posts: [...action.payload] };
    case GET_POST_BY_ID:
      return { ...state, post: action.payload };
    case POST_ERROR:
      return { ...state, error: action.payload };
    default:
      return state;
  }
};
