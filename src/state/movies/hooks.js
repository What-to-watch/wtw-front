import { useEffect, useDebugValue, useRef } from "react";
import { head, compose, propOr, last, equals, sortBy, prop } from "ramda";
import { useQuery } from "@apollo/react-hooks"
import { usePathSelector } from "redux-utility"
import { useDispatch } from "react-redux";
import { INIT_MOVIES_QUERY } from "../../queries"
import { setMovies } from './index'
import debounce from "../../utils/debounce";

const debouncedSetMovies = debounce((data,dispatch) => dispatch(setMovies(data)),500)

const cleanData = data => {
    if( data ){
        data.movies.edges = data.movies.edges.map( (edge) => {
            edge.node.genres = sortBy(prop("name"),edge.node.genres)
            return edge
        })
        return data;
    }
    return data;
}

export const useMovies = () => {
    const dispatch = useDispatch()
    const queryOpts = usePathSelector("movies.query");
    const queryObj = useQuery(INIT_MOVIES_QUERY,{
        ...queryOpts,
        pollInterval: 0,
    })
    const dataRef = useRef(queryObj.data);
    useEffect(() => {
        queryObj.refetch({
            ...queryOpts,
            pollInterval: 0,
        })
    },[queryOpts,queryObj])
    const cleaned = cleanData(queryObj.data)
    if( !equals( dataRef.current , cleaned) ){
        dataRef.current = cleaned;
        debouncedSetMovies(cleaned,dispatch)
    }
    const moviesData = {
        loading: queryObj.loading,
        error: queryObj.error,
        data: cleaned,
        before: compose( propOr(null,"cursor"), head )(queryObj.data?.movies?.edges || []),
        after: compose( propOr(null,"cursor"), last )(queryObj.data?.movies?.edges || []),
        total: queryObj.data?.movies?.totalCount
    }
    useDebugValue(moviesData)
    return moviesData
}