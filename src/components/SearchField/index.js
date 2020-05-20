import React from 'react';
import PropTypes from 'prop-types';

import './styles.scss';

const SearchIcon =(props) =>{
    const { value, clearValue } = props;
    const pointer = value? "pointer":""

    return(
        <div className={`search-field button ${pointer}`} onClick={clearValue}>
            <svg 
                role="img" 
                title="delete"  
                className="search-field button icon"
            > 
                <use xlinkHref={`/icons/defs.svg#${value? 'cancel' : 'search'}`} />
            </svg>
        </div>
    )
}


const SearchField = ({...props}) => {
    const { value, onChange, clearValue, placeholder } = props;

    return(
        <div className="search-field" >
            <input 
                type="text" 
                className="search-field input" 
                placeholder={placeholder}
                value={value}
                onChange={onChange}
            />
            <SearchIcon value={value} clearValue={clearValue}/>
         </div>
    );
}
SearchField.defaultProps = {
    placeholder: 'Search',
};

SearchField.propTypes = {
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    clearValue: PropTypes.func.isRequired,
    placeholder: PropTypes.string
};



export default SearchField;