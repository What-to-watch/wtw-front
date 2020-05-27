import {
    SET_TITLE_SEARCH,
    SET_GENRES_FILTER,
    SET_SORT_FIELD,
    SET_SORT_ORDER,
    SET_RESULTS_PER_PAGE
} from '../constants';

import { 
    setTitleSearch,
    setGenresFilter,
    setSortField,
    setSortOrder,
    setResultsPerPage
} from '../actions';

describe('Actions Tests', () => {
    it('Set title action', ()=> {
        const action = {
            type: SET_TITLE_SEARCH,
            title: ''
        }
        expect(setTitleSearch('')).toStrictEqual(action);
    })
    it('Set Genres action', ()=> {
        const action = {
            type: SET_GENRES_FILTER,
            genres: ['', '']
        }
        expect(setGenresFilter(['', ''])).toStrictEqual(action);
    })
    it('Set Sort field action', ()=> {
        const action = {
            type: SET_SORT_FIELD,
            field: ''
        }
        expect(setSortField('')).toStrictEqual(action);
    })
    it('Set Sort Order action', ()=> {
        const action = {
            type: SET_SORT_ORDER,
            order: ''
        }
        expect(setSortOrder('')).toStrictEqual(action);
    })
    it('Set Results per page action', ()=> {
        const action = {
            type: SET_RESULTS_PER_PAGE,
            resultsPerPage: 10
        }
        expect(setResultsPerPage(10)).toStrictEqual(action);
    })
})