import React from 'react';
import getClassName from '../../utils/getClassName';

import './styles.scss'

const WatchListCard = (props) => {
    const { onClick, element, data } = props;
    const classes = getClassName({
        base: 'watch-list-card',
        "list-element": element
    });
    const content = (
        <>
            <img src={`icons/watchList/${data.icon}.svg`} alt={data.icon}/>
            <h2>{data.name}</h2>
        </>
    );

    const render = element ? (
        <button className={classes} onClick={onClick}>
            {content}
        </button>
    ) : (
        <div className={classes}>
            {content}
        </div>
    );

    return render;
}

export default WatchListCard;