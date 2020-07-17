import React, { useState, useEffect } from 'react';
import { usePathSelector } from 'redux-utility';
import { useQuery, useMutation } from '../../queries/hooks'; 

import RatingStars from '../../components/RatingStars';
import LineChart from '../../components/LineChart';
import { createAuthClientOptions } from '../../utils/createAuthClientOptions';
import OutlineButton from '../../components/OutlineButton';

import { MOVIE_INFO, RATE_MOVIE, MY_WATCH_LIST_NAMES, CREATE_WATCH_LIST, ADD_TO_WATCHLIST } from '../../queries';
import getClassName from '../../utils/getClassName';
import './styles.scss';
import Input from '../../components/Input';

const AddNewList = (props) => {
    const { onSubmit } = props;
    const [open, setOpen] = useState(false)
    const [name, setName] = useState("")

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(name.trim())
        setName("")
    }

    return <div className="movie-modal__list-modal__add-new">
        {open ? 
            <form onSubmit={handleSubmit}>
                <Input fluid placeholder="List Name" onChange={setName} value={name}/>
            </form> :
            <OutlineButton fluid onClick={() => setOpen(true)}>+ Add new</OutlineButton>
        }
    </div>
}

const ListModalItem = ({ id, name, isInWatchlist, onClick }) => {
    const [clicked, setClicked] = useState(false);
    const itemClass = getClassName({
        base: "movie-modal__list-modal__item",
        "&--active": isInWatchlist || clicked
    })

    const imgClass = itemClass.extend("&__check");

    const handleClick = (e) => {
        e.preventDefault()
        setClicked(true);
        if( !clicked && !isInWatchlist){
            onClick(id)
        }
    }

    return <div className={itemClass} onClick={handleClick}>
        <div>{name}</div>
        {(isInWatchlist || clicked) && <img className={imgClass} src="/icons/check.svg" alt="checked"/>}
    </div>
}

const ListModal = (props) => {
    const { data, onSubmit, onSelect, movieId } = props

    const handleItemClick = (id) => {
        onSelect(id)
    }

    return <div className="movie-modal__list-modal">
        {data.map( ({ id, name, movies}) => {
            const isInWatchlist = movies.some( m => m.id === movieId )
            return <ListModalItem key={id} id={id} name={name} isInWatchlist={isInWatchlist} onClick={handleItemClick}/>
        })}
        <AddNewList onSubmit={onSubmit}/>
    </div>
}

const MovieModal = (props) => {
    const { id, onClose } = props;
    const [ userRating, setUserRating ] = useState(null);
    const [ rankingMutation, mutationInfo ] = useMutation(RATE_MOVIE);
    const { authenticated , data: userData } = usePathSelector('user');
    const clientOptions = authenticated ? createAuthClientOptions(userData.token): {}
    const { data, loading, error, forget } = useQuery(MOVIE_INFO, { id } , { clientOptions })
    const [createWatchList] = useMutation(CREATE_WATCH_LIST);
    const [addToWatchList] = useMutation(ADD_TO_WATCHLIST)
    const lists = useQuery(MY_WATCH_LIST_NAMES,{},{ 
        clientOptions, 
        preventQuery: !authenticated,
        disableCaching: true,
    });
    const [ openLists, setOpenLists] = useState(false);

    const handleCreateWatchlist = (name) => {
        const iconArray = [
            'top',
            'boat',
            'worm',
            'knife',
            'arrow',
            'soap',
            'stairs',
            'thunder'
        ];
        const idx = Math.floor((Math.random() * 100) % iconArray.length)
        const icon = iconArray[idx];
        createWatchList({
            name,
            icon,
            isPublic: false,
        },clientOptions)
        setTimeout(() => {
            lists.refresh();
        },500)
    }

    const handleAddToList = (listId) => {
        addToWatchList({
            watchlistId: listId,
            movieId: id
        },clientOptions)
        setTimeout(() => {
            lists.refresh();
        },500)
    }
    
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
            overview
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
                                { openLists && <ListModal 
                                            data={lists.data.myWatchlists}
                                            movieId={id}
                                            onSubmit={handleCreateWatchlist}
                                            onSelect={handleAddToList}
                                        />}
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
                            <p>{overview || "No overview available :("}</p>
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