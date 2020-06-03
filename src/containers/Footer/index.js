import React, { useState, useEffect } from 'react';
import Pagination from '../../components/Pagination';
import Select from '../../components/Select';
import getClassName from '../../utils/getClassName';
import { setResultsPerPage, setSortField, setSortOrder, setAfterCursor, setBeforeCursor, resetCursors } from '../../state/movies';

import './styles.scss';
import { usePathSelector } from 'redux-utility';
import { useDispatch } from 'react-redux';
import { useMovies } from '../../state/movies/hooks';
import { clamp } from 'ramda';

const parameterOptions = [
    { label: 'Title', value: 'Title' },
    { label: 'Release date', value: 'ReleaseDate' },
    { label: 'Budget', value: 'Budget' }
]
const orderOptions = [
    { label: 'Ascending', value: 'ASC' },
    { label: 'Descending', value: 'DESC' },
]

const resultOptions = [
    { label: '10', value: 10 },
    { label: '100', value: 100 },
    { label: '1000', value: 1000 }
]

const getNextPagination = (perPage,total) => p => {
    const base = p.from - 1;
    const restrict = clamp(1,total)
    return {
        from: restrict(base + perPage + 1),
        to: restrict(base + perPage + perPage)
    }
}


const getPrevPagination = (perPage,total) => p => {
    const base = p.from - 1;
    const restrict = clamp(1,total)
    return {
        from: restrict(base - perPage + 1),
        to: restrict(restrict(base - perPage) + perPage)
    }
}

const Footer = () => {
    const queryOptions = usePathSelector("movies.query");
    const dispatch = useDispatch();
    const { before, after, total, loading } = useMovies()

    const results = queryOptions.resultsPerPage;

    const [ open, setOpen ] = useState('');

    const [ openedFooter, setOpenedFooter ] = useState(false);

    const [ pagination, setPagination ] = useState({
        from: 1,
        to: 100,
    })

    useEffect(() => {
        setPagination(() => ({ 
            from: total === 0 ? 0 : 1, 
            to: total === 0 ? 0 : clamp(1,total)(results)
        }))
    },[total,setPagination, results])
    
    const handleSortChange = (sort) => (value) => {
        if ( sort === 'parameter' ) {
            dispatch(setSortField(value));
        } else {
            dispatch(setSortOrder(value));
        }
        setOpen('');
    }

    const handleResultChange = (value) => {
        dispatch(setResultsPerPage(value));
        setPagination( p => ({ 
            from: total === 0 ? 0 : p.from , 
            to:  total === 0 ? 0 : clamp(1,total)(p.from + value - 1) 
        }))
        setOpen('');
    }

    const handlePagination = (type) => {
        if( type === "next" ){
            setPagination(getNextPagination(results,total))
            dispatch(setAfterCursor(after))
        }
        if( type === "previous" ){
            setPagination(getPrevPagination(results,total))
            dispatch(setBeforeCursor(before))
        }
        if( type === "first" ){
            setPagination({ from: 1 , to: results})
            dispatch(resetCursors())
        }
    }

    const handleOpenSelects = (select) => () => {
        open === select ? setOpen('') : setOpen(select);
    }

    const handleOpenFooter = () => {
        const opened = openedFooter;
        setOpen('');
        setOpenedFooter(!opened);
    }

    const classes = getClassName({
        footer: true,
        open: openedFooter,
    });
    
    return (
        <footer className={classes}>
            <div className="footer__open">
                <button onClick={handleOpenFooter}>
                    <img src="icons/down-arrow.svg" alt="arrow"/>
                </button>
            </div>
            <div className="footer__pagination">
                <Pagination {...pagination} loading={loading} total={total} onChangePage={handlePagination} />
            </div> 
            <div className="footer__results-number">
                <div className="footer__results-number__select">
                    <p>Results per page:</p>
                    <Select 
                        options={resultOptions}
                        initValue={results}
                        onChange={handleResultChange}
                        open={open === 'results'}
                        onClick={handleOpenSelects('results')}
                    />
                </div>
                <div className="footer__results-number__powered">
                    <p>Powered by: </p>
                    <img src="icons/movie-database.svg" alt="movie database"/>
                </div>
            </div>
            <div className="footer__sort">
                <p>Sort by:</p>
                <Select 
                    options={parameterOptions}
                    initValue={queryOptions.sortField}
                    onChange={handleSortChange('parameter')}
                    open={open === 'parameter'}
                    onClick={handleOpenSelects('parameter')}
                />
                <Select 
                    options={orderOptions}
                    initValue={queryOptions.sortOrder}
                    onChange={handleSortChange('order')}
                    open={open === 'order'}
                    onClick={handleOpenSelects('order')}
                />
            </div>
        </footer>
    )
}


export default Footer;