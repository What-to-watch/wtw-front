import { createReducer, nullaryActionCreator, unaryActionCreator } from "redux-utility";
import { assoc, last, dropLast, append, propOr } from "ramda";
import { composeReducers as composeChanges } from "../../utils/composeReducers";

export const GO_TO = "GO_TO"
export const GO_BACK = "GO_BACK";
export const GO_FORWARD = "GO_FORWARD";

const payload = propOr("home","payload");
const setCurrent = () => (state,action) => assoc("current",payload(action),state);
const saveCurrent = () => (state) => assoc("previous",[...state.previous, state.current], state)
const resetNext = () => assoc("next",[])
const moveTo = composeChanges(
    saveCurrent(), 
    resetNext(),
    setCurrent()
)

const reducer = createReducer({
    [GO_TO]: moveTo,
    [GO_BACK]: (state) => ({
        current: last(state.previous),
        previous: dropLast(1,state.previous),
        next: append(state.current,state.next)
    }),
    [GO_FORWARD]: (state) => ({
        current: last(state.next),
        previous: append(state.current,state.previous),
        next: dropLast(1,state.next)
    })
})

export default reducer;

export const goTo = unaryActionCreator(GO_TO)
export const goBack = nullaryActionCreator(GO_BACK);
export const goForward = nullaryActionCreator(GO_FORWARD);