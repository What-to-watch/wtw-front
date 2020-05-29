import React, { useState, useRef, useImperativeHandle } from 'react';
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


const SearchField = React.forwardRef((props,ref) => {
    const { intialValue='',id, name, placeholder = 'Search', onChange = x=>x} = props
    const [value, setValue] = useState(intialValue);

    const handleChange = (e) => {
		setValue(e.target.value);
		onChange(e, props)
    }
    const clearValue = () => {
        setValue('')
        onChange({ target: {value:""}},props)
    }

    const innerRef = useRef()
    useImperativeHandle(ref, () => ({
        clear: () => {
            clearValue();
        }
    }))

    return(
        <div className="search-field" >
            <input 
                type="text" 
                className="search-field input" 
                id={id}
                name={name}
                placeholder={placeholder}
                value={value}
                onChange={handleChange}
                ref={innerRef}
            />
            <SearchIcon value={value} clearValue={clearValue}/>
         </div>
    );
})

SearchField.propTypes = {
    intialValue: PropTypes.string,
    placeholder: PropTypes.string,
    onChange: PropTypes.func,
    id: PropTypes.string,
    name: PropTypes.string,
};



export default SearchField;