import { combineReducers } from 'redux';

import authReducer from './authReducer';
import postReducer from './postReducer';
import categoryReducer from './categoryReducer';

export default combineReducers({
  auth: authReducer,
  post: postReducer,
  category: categoryReducer
});
