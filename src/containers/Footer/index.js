import React, { useState, useContext } from 'react';
import Pagination from '../../components/Pagination';
import Select from '../../components/Select';
import getClassName from '../../utils/getClassName';
import { movies } from '../../state/movieState';
import { setResultsPerPage, setSortField, setSortOrder } from '../../state/movieState/actions';

import './styles.scss';

const Footer = () => {
    const { state, dispatch } = useContext(movies);

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

    const [ sortBy, setSortBy ] = useState({
        parameter: state.sortField,
        order: state.sortOrder,
    });

    const [ results, setResults ] = useState(state.resultsPerPage);

    const [ pagination, setPagination ] = useState({
        page: 1,
        pages: 5,
        total: 450,
        perPage: 100,
        length: 100,
    });

    const [ open, setOpen ] = useState('');

    const [ openedFooter, setOpenedFooter ] = useState(false);
    
    const handleSortChange = (sort) => (value) => {
        if ( sort === 'parameter' ) {
            dispatch(setSortField(value));
        } else {
            dispatch(setSortOrder(value));
        }
        setSortBy({...sortBy, [sort]: value})
        setOpen('');
    }

    const handleResultChange = (value) => {
        dispatch(setResultsPerPage(value));
        setResults(value)
        setOpen('');
    }

    const handlePagination = (page) => {
        const { pages, total, perPage } = pagination;
        let length;
        if( page === pages ){
            length = total - perPage * (pages - 1)
        } else {
            length = perPage;
        }
        setPagination({...pagination, page, length})
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
                <Pagination {...pagination} onChangePage={handlePagination} />
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
                    initValue={sortBy.parameter}
                    onChange={handleSortChange('parameter')}
                    open={open === 'parameter'}
                    onClick={handleOpenSelects('parameter')}
                />
                <Select 
                    options={orderOptions}
                    initValue={sortBy.order}
                    onChange={handleSortChange('order')}
                    open={open === 'order'}
                    onClick={handleOpenSelects('order')}
                />
            </div>
        </footer>
    )
}


export default Footer;