import { useReducer, useEffect, useRef } from "react"
import { createReducer } from "redux-utility"
import { GraphQLClient } from "graphql-request";
import { equals } from "ramda";

const reducer = createReducer({
    "start": (state) => ({ ...state, loading: true, error: false  }),
    "success": (_,{ payload }) => ({ loading: false, error: false, data: payload }),
    "error": (_,{ payload }) => ({ loading: false, error: payload, data: undefined })
})

const initial = { 
    loading: true, 
    error: false, 
    data: undefined 
}

const url = 'https://wfh-challenge.herokuapp.com/api/graphql/'

const useDeepComparison = val => {
    const ref = useRef(val);
    if( !equals(ref.current,val) ){
        ref.current = val
    }
    return ref.current
}

export const useQuery = (query,vars,clientOpts) => {
    const [ state, dispatch ] = useReducer(reducer,initial);
    const opts = useDeepComparison(vars)
    useEffect(() => {
        let cancelled = false;
        dispatch({ type: "start" })
        new GraphQLClient(url,clientOpts)
            .request(query, opts)
            .then(payload => !cancelled && dispatch({ type: "success", payload }))
            .catch(payload => !cancelled && dispatch({ type: "error", payload }));
        return () => cancelled = true;
    },[ query, clientOpts, opts ])

    return state
}