import React from 'react';
import getClassName from '../../utils/getClassName';
import './styles.scss';

const YellowStars = (props) => {
    const { n } = props;
    const array = [...Array(n).keys()];
    const classes = getClassName({
        base: 'yellow-stars',
        'opacity': n <=3
    })
    return (
        <div className={classes}>
            {array.map((star, i)=>{ return <img src='icons/yellow-star.svg' alt="star"/>})}
        </div>
    )
}

export default YellowStars; 