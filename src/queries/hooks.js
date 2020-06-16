import { useReducer, useEffect, useRef, useDebugValue } from "react"
import { createReducer } from "redux-utility"
import { GraphQLClient } from "graphql-request";
import { equals } from "ramda";

const url = 'https://wfh-challenge.herokuapp.com/api/graphql/'

const initial = { 
    loading: true, 
    error: false, 
    data: undefined 
}

const reducer = createReducer({
    "start": (state) => ({ ...state, loading: true, error: false  }),
    "success": (_,{ payload }) => ({ loading: false, error: false, data: payload }),
    "error": (_,{ payload }) => ({ loading: false, error: payload, data: undefined })
})

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
            dispatch({ type: "start" })
            new GraphQLClient(url,queryOptions?.clientOptions)
                .request(query, opts)
                .then(payload => {
                    if(!cancelled){
                        if(!queryOptions?.disableCaching){ 
                            cache.set(key,payload)
                        }
                        dispatch({ type: "success", payload }) 
                    }
                })
                .catch(payload => !cancelled && dispatch({ type: "error", payload }));
        } else {
            !cancelled && dispatch({ type: "success", payload: cache.get(key) }) 
        }
        return () => cancelled = true;
    },[ query, opts, key, queryOptions ])
    useDebugValue({...state, cache, options })
    return state
}