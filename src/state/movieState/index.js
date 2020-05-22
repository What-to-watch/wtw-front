import React, {createContext, useReducer} from 'react';
import {
  SET_TITLE_SEARCH,
  SET_GENRES_FILTER,
  SET_SORT_FIELD,
  SET_SORT_ORDER,
  SET_RESULTS_PER_PAGE
} from './constants';


const initialState = {
    resultsPerPage: 100,
    sortField: 'Title',
    sortOrder: 'ASC',
    title: '',
    genres: [],
    pageInfo: {}
};
const movies = createContext(initialState);
const { Provider } = movies;

const MoviesProvider = ( { children } ) => {
  const [state, dispatch] = useReducer((state, action) => {
    switch(action.type) {
      case SET_TITLE_SEARCH:
        return { ...state, title: action.title };
      case SET_GENRES_FILTER:
        return { ...state, genres: action.genres };
      case SET_SORT_FIELD:
        return { ...state, sortField: action.field };
      case SET_SORT_ORDER:
        return { ...state, sortOrder: action.order };
      case SET_RESULTS_PER_PAGE:
        return { ...state, resultsPerPage: action.resultsPerPage };
      default:
        throw new Error();
    };
  }, initialState);

  return <Provider value={{ state, dispatch }}>{children}</Provider>;
};

export { movies, MoviesProvider }