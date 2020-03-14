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
} from '../actions/types';

const initialState = {
  post: null,
  posts: null,
  loading: true,
  error: null,
  status: null,
  current: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_POSTS_BY_CATEGORY:
      return { ...state, posts: [...action.payload], loading: false };
    case GET_POST_BY_ID:
    case CREATE_POST:
      return {
        ...state,
        post: action.payload.post,
        loading: false,
        status: action.payload.status
      };
    case UPDATE_POST:
      return {
        ...state,
        post: action.payload.post,
        status: action.payload.status,
        loading: false
      };
    case DELETE_POST:
      return { ...state, loading: false, status: action.payload.status };
    // posts: state.posts.map(post => post._id === action.payload)
    case CURRENT_POST:
      return { ...state, current: action.payload, loading: false };

    case CLEAR_CURRENT_POST:
      return { ...state, current: null, loading: false };

    case LIKE_POST:
      return {
        ...state,
        loading: false,
        posts: state.posts.map(post =>
          post._id === action.payload
            ? { ...post, likes: [action.payload, ...post.likes] }
            : post
        )
      };
    case DISLIKE_POST:
      return {
        ...state,
        loading: false,
        posts: state.posts.map(post =>
          post._id === action.payload
            ? {
                ...post,
                likes: post.likes.filter(like => like !== action.payload)
              }
            : post
        )
      };
    case CLEAR_POST:
      return { ...state, post: null, loading: false };
    case POST_ERROR:
      return { ...state, error: action.payload, loading: false };
    case CLEAR_POST_ERROR:
      return { ...state, error: null };
    default:
      return state;
  }
};
