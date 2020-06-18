import { createReducer, nullaryActionCreator, unaryActionCreator } from "redux-utility";
import { always, assoc, prop } from "ramda";
import { composeReducers } from "../../utils/composeReducers";

export const ATTEMPT_LOGIN = "ATTEMPT_LOGIN";
export const AUTH_SUCCESS = "AUTH_SUCCESS";
export const AUTH_ERROR = "AUTH_ERROR";
export const LOGOUT = "LOGOUT";

const initial = {
    authenticated: false,
    data: {},
    error: false,
    loading: false,
}

const setFromPayload = (att) => (state,action) => assoc(att,prop("payload",action),state);

export default createReducer({
    [ATTEMPT_LOGIN]: always({ ...initial, loading: true }),
    [AUTH_SUCCESS]: composeReducers(
        setFromPayload("data"),
        assoc("authenticated",true),
        assoc("error",false),
        assoc("loading", false)
    ),
    [AUTH_ERROR]: composeReducers(
        setFromPayload("error"),
        assoc("authenticated",false),
        assoc("data",{}),
        assoc("loading", false)
    ),
    [LOGOUT]: always(initial)
})

export const attempLogin = nullaryActionCreator(ATTEMPT_LOGIN);
export const loginSuccess = unaryActionCreator(AUTH_SUCCESS);
export const loginError = unaryActionCreator(AUTH_ERROR);
export const logout = nullaryActionCreator(LOGOUT);