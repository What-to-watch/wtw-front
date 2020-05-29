import { useEffect, useDebugValue } from "react";
import { head, compose, propOr, last } from "ramda";
import { useQuery } from "@apollo/react-hooks"
import { usePathSelector } from "redux-utility"
import { useDispatch } from "react-redux";
import { INIT_MOVIES_QUERY } from "../../queries"
import { setMovies } from './index'
import debounce from "../../utils/debounce";

const debouncedSetMovies = debounce((data,dispatch) => dispatch(setMovies(data)),500)

export const useMovies = () => {
    const dispatch = useDispatch()
    const queryOpts = usePathSelector("movies.query");
    const queryObj = useQuery(INIT_MOVIES_QUERY,{
        ...queryOpts,
        errorPolicy: "ignore",
        pollInterval: 0,
    })
    useEffect(() => {
        queryObj.refetch({
            ...queryOpts,
            errorPolicy: "ignore",
            pollInterval: 0,
        })
    },[queryOpts,queryObj])
    debouncedSetMovies(queryObj.data,dispatch)
    const moviesData = {
        loading: queryObj.loading,
        error: queryObj.error,
        data: queryObj.data,
        before: compose( propOr(null,"cursor"), head )(queryObj.data?.movies?.edges || []),
        after: compose( propOr(null,"cursor"), last )(queryObj.data?.movies?.edges || []),
        total: queryObj.data?.movies?.totalCount
    }
    useDebugValue(moviesData)
    return moviesData
}