import { useDebugValue } from "react";
import { head, compose, propOr, last, sortBy, prop } from "ramda";
import { useQuery } from "../../queries/hooks"
import { usePathSelector } from "redux-utility"
import { INIT_MOVIES_QUERY } from "../../queries"

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
    const queryOpts = usePathSelector("movies.query");
    const queryObj = useQuery(INIT_MOVIES_QUERY,queryOpts,{ disableCaching: queryOpts.resultsPerPage > 10 });
    const moviesData = {
        loading: queryObj.loading,
        error: queryObj.error,
        data: cleanData(queryObj.data),
        before: compose( propOr(null,"cursor"), head )(queryObj.data?.movies?.edges || []),
        after: compose( propOr(null,"cursor"), last )(queryObj.data?.movies?.edges || []),
        total: queryObj.data?.movies?.totalCount
    }
    useDebugValue(moviesData)
    return moviesData
}