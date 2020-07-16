import React, { useState, useEffect } from 'react';
import { usePathSelector } from 'redux-utility';
import { useQuery, useMutation } from '../../queries/hooks'; 

import RatingStars from '../../components/RatingStars';
import LineChart from '../../components/LineChart';
import { createAuthClientOptions } from '../../utils/createAuthClientOptions';
import OutlineButton from '../../components/OutlineButton';

import { MOVIE_INFO, RATE_MOVIE, MY_WATCH_LIST_NAMES } from '../../queries';
import getClassName from '../../utils/getClassName';
import './styles.scss';


const ListModal = (props) => {
    const { data } = props
    return <div className="movie-modal__list-modal">
        {data.map( ({ id, name}) => {
            return <div key={id} className="movie-modal__list-modal__item">{name}</div>
        })}
    </div>
}

const MovieModal = (props) => {
    const { id, onClose } = props;
    const [ userRating, setUserRating ] = useState(null);
    const [ rankingMutation, mutationInfo ] = useMutation(RATE_MOVIE);
    const { authenticated , data: userData } = usePathSelector('user');
    const clientOptions = authenticated ? createAuthClientOptions(userData.token): {}
    const { data, loading, error, forget } = useQuery(MOVIE_INFO, { id } , { clientOptions })
    const lists = useQuery(MY_WATCH_LIST_NAMES,{},{ clientOptions, preventQuery: !authenticated });
    const [ openLists, setOpenLists] = useState(false);
    
    const handleRatingMutation = (number) => {
        if(!mutationInfo.loading) {
            rankingMutation({ id, stars: number },createAuthClientOptions(userData.token));
            setUserRating(number);
            forget()
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

    const handleOpenWatchlists = () => {
        setOpenLists(!openLists)
    }

    const CloseButton = () => {
        return(
            <button onClick={handleResetId} className="movie-modal__close">
                <img src="icons/close.svg" alt="x"/>
            </button>
        )
    }

    const renderLoading = () => {
        return (
            <div className="movie-modal__loading">
                <CloseButton/>
                <img src="https://media.giphy.com/media/sIIhZliB2McAo/giphy.gif" alt="loading"/>
            </div>
        )
    }

    const renderError = () => {
        return (
            <div className="movie-modal__error">
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
            <>
                <CloseButton/>
                <header className="movie-modal__content__header">
                    <div>
                        <h2 className="movie-modal__content__header__title">{title}</h2>
                        <p className="movie-modal__content__header__genres">
                            Genres: 
                            <span className="movie-modal__content__header__genres__list">
                                {genresString}
                            </span>
                        </p>
                    </div>
                </header>
                <section className="movie-modal__content__body">
                    <div className="movie-modal__content__body__poster">
                        <figure className="movie-modal__content__body__poster__image">
                            <img src={posterUrl ? posterUrl : '/movie-posters/NoPoster.png'} alt={title}/>
                        </figure>
                        { authenticated && <>
                            <div className="movie-modal__content__body__poster__rating">
                                <RatingStars onChange={ handleRatingMutation } rating={userRating} />
                                <h5>Your Rating</h5>
                            </div>
                            <div className="movie-modal__content__body__poster__add-to-watchlist">
                                { openLists && <ListModal data={lists.myWatchLists}/>}
                                <OutlineButton loading={lists.loading} onClick={handleOpenWatchlists}>
                                    + Add to watchlist
                                </OutlineButton>
                            </div>
                        </>
                        }
                    </div>
                    <div className="movie-modal__content__body__data">
                        <div className="movie-modal__content__body__data__overview">
                            <h3 className="movie-modal__content__body__data__overview__header">Overview</h3>
                            <p>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed porta massa a lectus congue, 
                                id malesuada ipsum porttitor. Praesent auctor erat vel dictum consequat. Integer orci diam, 
                                tincidunt at ex nec, blandit bibendum est. Donec egestas condimentum tempor.
                            </p>
                            <article className="movie-modal__content__body__data__overview__details">
                                <p className="movie-modal__content__body__data__overview__details__item">Budget: <strong>{ budget ? `$${budget/1000000} Million` : 'N/A' }</strong></p>
                                <p className="movie-modal__content__body__data__overview__details__item">Avg. Rating: <strong>{rating}/5</strong></p>
                                <p className="movie-modal__content__body__data__overview__details__item">Release date: <strong>{releaseDate}</strong></p>
                            </article>
                            <div className="movie-modal__content__body__data__overview__divider"></div>
                        </div>
                        <div className="movie-modal__content__body__data__chart">
                            <h3>Average rating by year</h3>
                            <div className="movie-modal__content__body__data__chart__graph">
                                <LineChart data={chartData}/>
                            </div>
                        </div>
                    </div>
                </section>
            </>
        )
    }

    return (
        <div className="movie-modal" >
            <div className="movie-modal__content">
                { loading && renderLoading() }
                { (!loading && !error) && renderContent() }
                { (error && !loading) && renderError() }
            </div>
            <footer className="movie-modal__footer">
                <div className="movie-modal__footer__powered">
                    <p className="movie-modal__footer__powered__text">Powered by: </p>
                    <img src="icons/movie-database.svg" alt="movie database"/>
                </div>
            </footer>
        </div>
    )
}

export default MovieModal;