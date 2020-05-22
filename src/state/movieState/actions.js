import {
    SET_TITLE_SEARCH,
    SET_GENRES_FILTER,
    SET_SORT_FIELD,
    SET_SORT_ORDER,
    SET_RESULTS_PER_PAGE
} from './constants';

export const setTitleSearch = (title) => {
    return {
        type: SET_TITLE_SEARCH,
        title
    }
}

export const setGenresFilter = (genres) => {
    return {
        type: SET_GENRES_FILTER,
        genres
    }
}

export const setSortField= (field) => {
    return {
        type: SET_SORT_FIELD,
        field
    }
}

export const setSortOrder = (order) => {
    return {
        type: SET_SORT_ORDER,
        order
    }
}

export const setResultsPerPage = (resultsPerPage) => {
    return {
        type: SET_RESULTS_PER_PAGE,
        resultsPerPage
    }
}

export default {
    setTitleSearch,
    setGenresFilter,
    setSortField,
    setSortOrder,
    setResultsPerPage,
};