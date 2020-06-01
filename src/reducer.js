import moviesReducer from './state/movies';
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
    movies: moviesReducer,
})

export default rootReducer