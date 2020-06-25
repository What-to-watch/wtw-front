import moviesReducer from './state/movies';
import routingReducer from './state/routing';
import userReducer from './state/user';
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
    movies: moviesReducer,
    routing: routingReducer,
    user: userReducer,
})

export default rootReducer