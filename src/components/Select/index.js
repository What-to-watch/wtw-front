import React, { useState } from 'react';
import PropTypes from 'prop-types';
import List from '../List';
import getClassName from '../../utils/getClassName';

import './styles.scss';

const Select = (props) => {
    const {initValue, options, open, onChange = x => x, onClick = x => x } = props;

    const selectOption = (value) => {
        return options.filter(option => option.value === value)[0]
    }

    const [ value, setValue ] = useState(initValue);

    const [ selected, setSelected ] = useState(
        selectOption(value)
    );

    const handleChange = (value, props) => {
        setValue(value);
        setSelected(selectOption(value));
        onChange(value, props);
    }

    const handleClick = (e) => {
        onClick(props);
    }

    const classes = getClassName({
        select: true,
        open: open,
    })

    return (
        <div className={classes}>
            <button onClick={handleClick} className="select__button">
                <span>{selected.label}</span>
                <img src="icons/down-arrow.svg" alt="down"/>
            </button>
            <List
                content={options}
                onItemClick={handleChange}
            />
        </div>
    )
}

Select.protoTypes = {
    initValue: PropTypes.string.isRequired,
    onChange: PropTypes.func,
    options: PropTypes.arrayOf({
        value: PropTypes.string,
        label: PropTypes.string,
    }).isRequired,
    open: PropTypes.bool,
    onClick: PropTypes.func
}

export default Select