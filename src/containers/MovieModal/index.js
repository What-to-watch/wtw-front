import React, { useState, useEffect } from 'react';
import { usePathSelector } from 'redux-utility';
import { useQuery, useMutation } from '../../queries/hooks'; 

import RatingStars from '../../components/RatingStars';
import LineChart from '../../components/LineChart';
import { createAuthClientOptions } from '../../utils/createAuthClientOptions';

import { MOVIE_INFO, RATE_MOVIE } from '../../queries';
import getClassName from '../../utils/getClassName';

import './styles.scss';

const MovieModal = (props) => {
    const { id, open, onClose } = props;
    const [ userRating, setUserRating ] = useState(null);
    const [ rankingMutation, mutationInfo ] = useMutation(RATE_MOVIE);
    const { authenticated , data: userData } = usePathSelector('user');
    const clientOptions = authenticated ? createAuthClientOptions(userData.token): {}
    const { data, loading, error, refresh } = useQuery(MOVIE_INFO, { id } , { clientOptions })
    
    const handleRatingMutation = (number) => {
        if(!mutationInfo.loading && !userRating) {
            rankingMutation({ id, stars: number },createAuthClientOptions(userData.token));
            setUserRating(number);
            refresh()
        }
    }

    useEffect(() => {
        if(data?.movie.myRating){
            setUserRating(data.movie.myRating)
        }
    },[data])

    const handleResetId = () => {
        onClose();
    }

    const CloseButton = () => {
        return(
            <button onClick={handleResetId} className="movie-modal__button">
                <img src="icons/close.svg" alt="x"/>
            </button>
        )
    }

    const renderLoading = () => {
        return (
            <div className="movie-modal__content__loading">
                <CloseButton/>
                <img src="https://media.giphy.com/media/sIIhZliB2McAo/giphy.gif" alt="loading"/>
            </div>
        )
    }

    const renderError = () => {
        return (
            <div className="movie-modal__content__error">
                <CloseButton/>
                <img src="https://media.giphy.com/media/Rkis28kMJd1aE/giphy.gif" alt="error"/>
            </div>
        )
    }

    const renderContent = () => {
        const { 
            title,
            genres,
            posterUrl,
            releaseDate,
            budget,
            averageRating,
            yearlyAverageRating,
        } = data.movie;
        const rating = averageRating.rating.toFixed(1);
        const genresString = genres.map(x=>x.name).join('/');
        const chartData = yearlyAverageRating.map(x=>{return{...x, date: x.date.toString()}})
        return (
            <div className="movie-modal__content__info">
                <CloseButton/>
                <header>
                    <div>
                        <h2>{title}</h2>
                        <p>Genres: <span>{genresString}</span></p>
                    </div>
                    
                </header>
                <section>
                    <div className="movie-modal__content__info__poster">
                        <img src={posterUrl ? posterUrl : '/movie-posters/NoPoster.png'} alt={title}/>
                        { authenticated && (
                            <div className="movie-modal__content__info__poster__rating">
                                <h4>Your Rating</h4>
                                <RatingStars onChange={ handleRatingMutation } rating={userRating} />
                            </div>
                        )}
                    </div>
                    
                    <div className="movie-modal__content__info__chart">
                        <h3>Rating by year</h3>
                        <div>
                            <LineChart data={chartData}/>
                        </div>
                    </div>
                </section>
                <footer>
                    <div>
                        <h3>Budget</h3>
                        <p>{ budget ? `$${budget/1000000} Million` : 'N/A' }</p>
                    </div>
                    <div><h3>Release date</h3><p>{releaseDate}</p></div>
                    <div><h3>Avg. Rating</h3><p>{rating}<span>/5</span></p></div>
                </footer>
            </div>
        )
    }

    const classes = getClassName({
        'movie-modal': true,
        open
    })

    return (
        <div className={classes} onClick={onClose}>
            <div className="movie-modal__content" onClick={e => e.stopPropagation()}>
                { loading && renderLoading() }
                { (!loading && !error) && renderContent() }
                { (error && !loading) && renderError() }
            </div>
        </div>
    )
}

export default MovieModal;