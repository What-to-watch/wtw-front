import { useReducer, useEffect, useRef, useDebugValue } from "react"
import { createReducer, nullaryActionCreator, unaryActionCreator } from "redux-utility"
import { GraphQLClient } from "graphql-request";
import { equals } from "ramda";

const url = 'https://wfh-challenge.herokuapp.com/api/graphql/'

const initial = { 
    loading: true, 
    error: false, 
    data: undefined,
    called: false
}

const reducer = createReducer({
    "reset": (state) => ({ ...state, error: false, called: false }),
    "start": (state) => ({ ...state, loading: true, error: false, called: true  }),
    "success": (_,{ payload }) => ({ loading: false, error: false, data: payload, called: true }),
    "error": (_,{ payload }) => ({ loading: false, error: payload, data: undefined, called: true })
})
const reset = nullaryActionCreator("reset")
const start = nullaryActionCreator("start");
const success = unaryActionCreator("success");
const error = unaryActionCreator("error");

const useDeepComparison = val => {
    const ref = useRef(val);
    if( !equals(ref.current,val) ){
        ref.current = {...val}
    }
    return ref.current
}

const keyGen = (query,vars,clientOpts) => {
    return btoa(JSON.stringify({ query, vars, clientOpts }))
}

const cache = new Map();

const fromCache = key => {
    return {
        loading: false,
        error: false,
        data: cache.get(key)
    }
}

export const useQuery = (query,vars,options) => {
    const queryOptions = useDeepComparison(options)
    const opts = useDeepComparison(vars)
    const key = keyGen(query,opts,options);
    const [ state, dispatch ] = useReducer(reducer, cache.has(key) ? fromCache(key) : initial);
    useEffect(() => {
        let cancelled = false;
        if( !cache.has(key) ){
            dispatch(start())
            new GraphQLClient(url,queryOptions?.clientOptions)
                .request(query, opts)
                .then(payload => {
                    if(!cancelled){
                        if(!queryOptions?.disableCaching){ 
                            cache.set(key,payload)
                        }
                        dispatch(success(payload))
                    }
                })
                .catch(payload => !cancelled && dispatch(error(payload)));
        } else {
            !cancelled && dispatch({ type: "success", payload: cache.get(key) }) 
        }
        return () => cancelled = true;
    },[ query, opts, key, queryOptions ])
    useDebugValue({...state, cache, options })
    return state
}

export const useMutation = (mutation) => {
    const [state, dispatch] = useReducer(reducer,{ ...initial, loading: false })
    let cancelled = false;
    const unsafeRun = (vars,clientOpts) => {
        dispatch(start());
        new GraphQLClient(url,clientOpts)
            .request(mutation,vars)
            .then( data => !cancelled && dispatch(success(data)))
            .catch( err => !cancelled && dispatch(error(err)))
        return () => cancelled = true;
    }
    unsafeRun.cancel = () => cancelled = true;
    unsafeRun.reset = () => dispatch(reset())
    useDebugValue({...state, cancelled })
    return [unsafeRun, state]
}