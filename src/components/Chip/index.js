import React, { useRef } from 'react'
import PropTypes from 'prop-types'
import "./styles.scss"
import { getRandomInteger } from '../../utils/math'

const randomColor = () => {
    const hue = getRandomInteger(360)
    return `hsl(${hue},40%,90%)`
}

const Chip = (props) => {
    const { text, color, onClick = x => x } = props;
    
    const colorRef = useRef(color || randomColor());

    const style = {
        backgroundColor: colorRef.current
    }

    const handleClick = () => {
        onClick(text,props);
    }

    return <span className="chip" style={style} onClick={handleClick}>
        <span className="chip__text">{text}</span> 
        | 
        <span className="chip__close">x</span>
    </span>
}

Chip.propTypes = {
    color: PropTypes.string,
    text: PropTypes.string
}

export default Chip;