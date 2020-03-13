import { FILTER_CATEGORY, CLEAR_FILTER_CATEGORY } from './types';

export const filterCategory = text => dispatch => {
  console.log(`text: ${text} `);
  dispatch({
    type: FILTER_CATEGORY,
    payload: text
  });
};

export const clearFilterCategory = () => dispatch => {
  dispatch({
    type: CLEAR_FILTER_CATEGORY
  });
};
