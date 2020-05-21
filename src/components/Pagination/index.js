import React from 'react';
import PropTypes from 'prop-types';

import './styles.scss';

const Pagination = (props) => {
    const {page, perPage, total, length, pages, onChangePage = x => x} = props;
    const first = ( perPage * page ) - perPage + 1;
    const last = first + length -1;

    const handlePage = (page) => () => {
        onChangePage(page, props)
    }
    
    return (
        <div className="pagination">
            <button onClick={handlePage(1)} disabled={page===1}>
                <img src="icons/pagination-line.svg" alt="|"/>
                <img src="icons/left-arrow.svg" alt="<"/>
            </button>
            <button onClick={handlePage(page-1)} disabled={page===1}>
                <img src="icons/left-arrow.svg" alt="<"/>
            </button>
            <div className="pagination__description">
                <span>{first}</span>
                <span>-</span>
                <span>{last}</span>
                <span> of {total} </span>
            </div>
            <button onClick={handlePage(page+1)} disabled={page===pages}>
                <img src="icons/right-arrow.svg" alt=">"/>
            </button>
            <button onClick={handlePage(pages)} disabled={page===pages}>
                <img src="icons/right-arrow.svg" alt=">"/>
                <img src="icons/pagination-line.svg" alt="|"/>
            </button>
        </div>
    )
}

Pagination.propTypes = {
    page: PropTypes.number.isRequired,
    perPage: PropTypes.number.isRequired,
    total: PropTypes.number.isRequired,
    length: PropTypes.number.isRequired,
    pages: PropTypes.number.isRequired,
    onChangePage: PropTypes.func,
};

export default Pagination;