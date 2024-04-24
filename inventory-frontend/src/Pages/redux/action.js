// action.js
export const FILTER_DATA = 'FILTER_DATA';

export const filterData = (searchTerm) => ({
  type: FILTER_DATA,
  payload: searchTerm,
});
