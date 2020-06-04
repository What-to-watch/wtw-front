import { createStore } from 'redux'
import { getDevtoolsCompose } from "redux-utility"
import rootReducer from "./reducer"

const initialState = {
    movies: {
        data: [],
        query: {
            resultsPerPage: 100,
            first: 100,
            last: 100,
            after: null,
            before: null,
            sortField: 'Title',
            sortOrder: 'ASC',
            title: '',
            genres: [],
            pageInfo: {},
        },
    }
}

export const initStore = () => {
    const shouldUseDevtool = () => process.env.NODE_ENV === "development"
    const composeEnhancers = getDevtoolsCompose(shouldUseDevtool)
    const enhancers = []
    const store = createStore(
        rootReducer,
        initialState,
        composeEnhancers(...enhancers)
    )
    return store;
}