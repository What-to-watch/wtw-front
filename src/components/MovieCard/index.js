import React from 'react';
import PropTypes from 'prop-types';
import getRandomHue from '../../utils/getRandomHue';

import './styles.scss';

const getGradient = (hue) => {
    return `linear-gradient(180deg, hsla(${hue}, 100%, 50%, 0) 0%, hsla(${hue}, 100%, 10%, 0.8) 56%, hsla(${hue}, 100%, 0%, 0.9) 100%)`;
}

const MovieCard = ({...props}) => {
    const { title, genres, id, src, hue = getRandomHue(), onClick = x=>x } = props;
    const genresString = genres.join('/');
    const gradient = getGradient(hue);
    const handleClick = () => {
        onClick(id);
    }
    return(
        <a className="movie-card" href={`#${id}`} onClick={handleClick}>
            <div className="movie-card__background" >
                <img 
                    className="movie-card__background__image" 
                    src={src ? src : '/movie-posters/NoPoster.png'}
                    alt={title}
                />
                <div className={"movie-card__background__gradient "}  style={{backgroundImage:gradient}}></div>
                
            </div>
            <div className="movie-card__info">
                <h2>{title}</h2>
                <p>{genresString}</p>
            </div>
        </a>
    );
}

export const LoadingMovieCard = (props) => {
    const { hue = getRandomHue() } = props;
    const gradient = getGradient(hue);
    return (
        <div className="loading-movie-card">
            <div className="loading-movie-card__dots">
            .
            </div>
            <div className={"loading-movie-card__gradient"}  style={{backgroundImage:gradient}}></div>
        </div>
    )
}

MovieCard.defaultProps = {
    title: 'Movie1',
    genres: ['Comedy'],
    id: 1,
    src: '/movie-posters/NoPoster.png',
};

MovieCard.propTypes = {
    title: PropTypes.string,
    genres: PropTypes.array,
    id:PropTypes.number,
    src: PropTypes.string,
    hue: PropTypes.number,
};

export default MovieCard;