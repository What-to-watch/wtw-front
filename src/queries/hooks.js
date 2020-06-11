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
        ref.current = val
    }
    return ref.current
}

const keyGen = (query,vars,clientOpts) => {
    return btoa(JSON.stringify({ query, vars, clientOpts }))
}

const cache = (() => {
    const _inner = {}
    return {
        _inner,
        has(key){
            return _inner[key] !== undefined
        },
        set(key,data){
            _inner[key] = data;
        },
        get(key){
            return _inner[key];
        }
    }
})()

const fromCache = key => {
    return {
        loading: false,
        error: false,
        data: cache.get(key)
    }
}

export const useQuery = (query,vars,clientOpts) => {
    const opts = useDeepComparison(vars)
    const key = keyGen(query,opts,clientOpts);
    const [ state, dispatch ] = useReducer(reducer, cache.has(key) ? fromCache(key) : initial);
    useEffect(() => {
        let cancelled = false;
        if( !cache.has(key) ){
            dispatch({ type: "start" })
            new GraphQLClient(url,clientOpts)
                .request(query, opts)
                .then(payload => {
                    if(!cancelled){ 
                        console.log("update")
                        cache.set(key,payload);
                        dispatch({ type: "success", payload }) 
                    }
                })
                .catch(payload => !cancelled && dispatch({ type: "error", payload }));
        } else {
            !cancelled && dispatch({ type: "success", payload: cache.get(key) }) 
        }
        return () => cancelled = true;
    },[ query, clientOpts, opts, key ])
    // For easy debbuging
    useDebugValue({...state, cache: cache._inner })
    return state
}