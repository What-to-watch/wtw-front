import { reduce } from "ramda"

export const composeReducers = (...reducers) => (state,action) => {
    return reduce((accState,nextReducer) => nextReducer(accState,action) , state)(reducers)
}