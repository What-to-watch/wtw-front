import React, { useState } from 'react';
import Pagination from '../../components/Pagination';
import Select from '../../components/Select';
import getClassName from '../../utils/getClassName';

import './styles.scss';

const Footer = () => {
    const parameterOptions = [
        { label: 'Title', value: 'title' },
        { label: 'Release date', value: 'release-date' },
        { label: 'Budget', value: 'budget' }
    ]
    const orderOptions = [
        { label: 'Ascending', value: 'asc' },
        { label: 'Descending', value: 'des' },
    ]

    const resultOptions = [
        { label: '10', value: 10 },
        { label: '100', value: 100 },
        { label: '1000', value: 1000 }
    ]

    const [ sortBy, setSortBy ] = useState({
        parameter: parameterOptions[0].value,
        order: orderOptions[0].value,
    });

    const [ results, setResults ] = useState(100);

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
        setSortBy({...sortBy, [sort]: value})
        setOpen('');
    }

    const handleResultChange = (value) => {
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