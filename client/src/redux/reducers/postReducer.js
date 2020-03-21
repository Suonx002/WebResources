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
  DELETE_POST,
  CLEAR_STATUS
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
      return {
        ...state,
        post: action.payload.post,
        loading: false
      };
    case CREATE_POST:
      return {
        ...state,
        posts: [...state.posts, action.payload.post],
        status: action.payload.status,
        loading: false
      };
    case UPDATE_POST:
      return {
        ...state,
        posts: state.posts.map(post =>
          post._id === action.payload.post._id ? action.payload.post : post
        ),
        status: action.payload.status,
        loading: false
      };
    case DELETE_POST:
      return {
        ...state,
        posts: state.posts.filter(post => post._id !== action.payload.id),
        status: action.payload.status,
        loading: false
      };

    // posts: state.posts.filter(post => post._id !== action.payload.)
    // posts: state.posts.map(post => post._id === action.payload)
    case CURRENT_POST:
      return { ...state, current: action.payload, loading: false };
    case CLEAR_CURRENT_POST:
      return { ...state, current: null, loading: false };
    case CLEAR_STATUS:
      return { ...state, status: null, loading: false };
    case LIKE_POST:
      console.log(action.payload);
      return {
        ...state,
        posts: state.posts.map(post =>
          post._id === action.payload
            ? { ...post, likes: [...post.likes, action.payload] }
            : post
        ),
        status: 'success',
        loading: false
      };
    case DISLIKE_POST:
      console.log(action.payload);

      return {
        ...state,

        posts: state.posts.map(post =>
          post._id === action.payload
            ? {
                ...post,
                likes: post.likes.filter(like => like !== action.payload)
              }
            : post
        ),
        status: 'success',
        loading: false
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
