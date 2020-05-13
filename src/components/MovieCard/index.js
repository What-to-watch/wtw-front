import React from 'react';
import PropTypes from 'prop-types';

import './styles.scss';

const MovieCard = ({...props}) => {
    const { title, genres, color, id, src } = props;
    const genresString = genres.join('/');
    return(
        <a className="movie-card" href={`#${id}`}>
            <div className="movie-card__background">
                <div className={"movie-card__background__gradient " + color}></div>
                <img className="movie-card__background__image" src={src} alt={title}/>
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
    color: 'red',
    id: 1,
    src: 'movie-posters/1.jpg',
};

MovieCard.propTypes = {
    title: PropTypes.string,
    genres: PropTypes.array,
    color: PropTypes.string,
    id:PropTypes.number,
    src: PropTypes.string,
};



export default MovieCard;