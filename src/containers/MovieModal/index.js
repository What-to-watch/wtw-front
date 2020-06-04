import React from 'react';
import { useQuery } from '@apollo/react-hooks';


import LineChart from '../../components/LineChart';

import { MOVIE_INFO } from '../../queries';
import getClassName from '../../utils/getClassName';

import './styles.scss';


const MovieModal = (props) => {
    const { id, open, onClose } = props;
    const { data, loading, error } = useQuery(MOVIE_INFO, {
        variables: {
            id
        }
    })

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
                    <img src={posterUrl ? posterUrl : '/movie-posters/NoPoster.png'} alt={title}/>
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
        <div className={classes}>
            <div className="movie-modal__content">
                { loading && renderLoading() }
                { (!loading && !error) && renderContent() }
                { (error && !loading) && renderError() }
            </div>
        </div>
    )
}

export default MovieModal;