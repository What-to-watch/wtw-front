import moviesReducer from './state/movies';
import routingReducer from './state/routing';
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
    movies: moviesReducer,
    routing: routingReducer,
})

export default rootReducer