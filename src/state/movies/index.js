import { assocPath, propOr, reduce } from 'ramda'
import { createReducer, unaryActionCreator, nullaryActionCreator } from "redux-utility";

export const SET_TITLE_SEARCH = 'SET_TITLE_SEARCH';
export const SET_GENRES_FILTER = 'SET_GENRES_FILTER';
export const SET_SORT_FIELD = 'SET_SORT_FIELD';
export const SET_SORT_ORDER = 'SET_SORT_ORDER';
export const SET_RESULTS_PER_PAGE ='SET_RESULTS_PER_PAGE';
export const SET_AFTER_CURSOR = 'SET_AFTER_CURSOR';
export const SET_BEFORE_CURSOR = 'SET_BEFORE_CURSOR';
export const RESET_CURSORS = 'RESET_CURSORS';

const setPath = (p,value,obj) => assocPath(p.split("."),value,obj)
const payloadOr = (or,action) => propOr(or,"payload",action)
const setQueryOption = (opt,or) => (state,action) => setPath(`query.${opt}`,payloadOr(or,action),state);
const composeQueryOpts = (...muts) => (state,action) =>  reduce((accState,nextReducer) => nextReducer(accState,action) , state)(muts)

const moviesReducer = createReducer({
    [SET_TITLE_SEARCH]: setQueryOption("title",""),
    [SET_GENRES_FILTER]: setQueryOption("genres",[]),
    [SET_SORT_FIELD]: setQueryOption("sortField",'Title'),
    [SET_SORT_ORDER]: setQueryOption("sortOrder",'ASC'),
    [SET_RESULTS_PER_PAGE]: composeQueryOpts(
        setQueryOption("last",100),
        setQueryOption("first",100),
        setQueryOption("resultsPerPage",100),
    ),
    [SET_AFTER_CURSOR]: composeQueryOpts(
        setQueryOption("after",null),
        (state) => setQueryOption("before",null)(state,{})
    ),
    [SET_BEFORE_CURSOR]: composeQueryOpts(
        setQueryOption("before",null),
        (state) => setQueryOption("after",null)(state,{})
    ), 
    [RESET_CURSORS]: composeQueryOpts(
        setQueryOption("after" ,null),
        setQueryOption("before",null)
    )
})

export default moviesReducer;

export const setTitleSearch = unaryActionCreator(SET_TITLE_SEARCH);
export const setGenresFilter = unaryActionCreator(SET_GENRES_FILTER);
export const setSortField = unaryActionCreator(SET_SORT_FIELD);
export const setSortOrder = unaryActionCreator(SET_SORT_ORDER);
export const setResultsPerPage = unaryActionCreator(SET_RESULTS_PER_PAGE);
export const setAfterCursor = unaryActionCreator(SET_AFTER_CURSOR);
export const setBeforeCursor = unaryActionCreator(SET_BEFORE_CURSOR);
export const resetCursors = nullaryActionCreator(RESET_CURSORS);