import React from 'react';
import PropTypes from 'prop-types';

import './styles.scss';

const MovieCard = ({...props}) => {
    const { title, genres, id, src, hue = getRandomHue() } = props;
    const genresString = genres.join('/');
    const gradient = `linear-gradient(180deg, hsla(${hue}, 100%, 50%, 0) 0%, hsla(${hue}, 100%, 10%, 0.8) 56%, hsla(${hue}, 100%, 0%, 0.9) 100%)`
    return(
        <a className="movie-card" href={`#${id}`}>
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

function getRandomHue() {
    const min = Math.ceil(0);
    const max = Math.floor(360);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }



export default MovieCard;