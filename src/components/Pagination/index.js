import React from 'react';
import PropTypes from 'prop-types';

import './styles.scss';

const Pagination = (props) => {
    const {from, to, total, loading, onChangePage = x => x} = props;

    const handlePage = (type) => () => {
        onChangePage(type, props)
    }
    
    return (
        <div className="pagination">
            <button onClick={handlePage("first")} disabled={from === 1 || loading}>
                <img src="icons/pagination-line.svg" alt="|"/>
                <img src="icons/left-arrow.svg" alt="<"/>
            </button>
            <button onClick={handlePage("previous")} disabled={from === 1 || loading}>
                <img src="icons/left-arrow.svg" alt="<"/>
            </button>
            <div className="pagination__description">
                <span>{from}</span>
                <span>-</span>
                <span>{to}</span>
                <span> of {total} </span>
            </div>
            <button onClick={handlePage("next")} disabled={to === total || loading}>
                <img src="icons/right-arrow.svg" alt=">"/>
            </button>
            <button onClick={handlePage("last")} disabled={to === total || loading}>
                <img src="icons/right-arrow.svg" alt=">"/>
                <img src="icons/pagination-line.svg" alt="|"/>
            </button>
        </div>
    )
}

Pagination.propTypes = {
    from: PropTypes.number,
    to: PropTypes.number,
    total: PropTypes.number,
    loading: PropTypes.bool,
    onChangePage: PropTypes.func,
};

export default Pagination;