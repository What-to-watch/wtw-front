import React, { useState } from 'react';
import { useQuery, useMutation } from '../../queries/hooks';
import MovieCard from '../../components/MovieCard';
import WatchListCard from '../../components/WatchListCard';
import OutlineButton from '../../components/OutlineButton';
import { WATCH_LIST, REMOVE_FROM_WATCHLIST, DELETE_WATCH_LIST } from '../../queries';

import './styles.scss';
import '../MovieGrid/styles.scss';
import { usePathSelector } from 'redux-utility';
import { createAuthClientOptions } from '../../utils/createAuthClientOptions';


const DeleteModal = ({ onClose, onSubmit, name }) => {
    return <div className="delete-modal">
        <div className="delete-modal__body">
            <h1>Delete watch list?</h1>
            <p className="delete-modal__body__message">
                You are about to delete {name} and this action is irreversible. Are you sure you want to continue?
            </p>
            <div className="delete-modal__body__actions">
                <OutlineButton white onClick={onClose}>Cancel</OutlineButton>
                <OutlineButton danger onClick={onSubmit}>Delete watch list</OutlineButton>
            </div>
        </div>
    </div>
}

const WatchMoviesList = (props) => {
    const token = usePathSelector("user.data.token");
    const { data: listData, onClickMovie, goBack = ()=>{}, onDelete=() => {} } = props;
    const { id, isPublic, owned } = listData;
    const { data, loading, error } = useQuery(WATCH_LIST, { id }, { disableCaching: true });
    const [removeMovie] = useMutation(REMOVE_FROM_WATCHLIST);
    const [deleteWatchList] = useMutation(DELETE_WATCH_LIST);
    const [marks, setMarks] = useState([])
    const [editing, setEditing] = useState(false);
    const [deleting, setDeleting] = useState(false);
    const removedMovies = []

    const renderLoading = () => (
        <div>
            <img src="https://media.giphy.com/media/sIIhZliB2McAo/giphy.gif" alt="loading"/>
        </div>
    );

    const handleRemoveMovie = (id) => {
        setMarks([...marks, id])
    }

    const isMovieMarked = (movie) => marks.includes(movie.id)

    const renderList = () => { 
        return data.watchlist.movies.length > 0 && !error ? (
            <div className="movie-grid">
                { data.watchlist.movies.filter(m => !isMovieMarked(m)).map((movie => {
                    const genres = movie.genres.map((genre => genre.name));
                    return (
                        <MovieCard 
                            {...movie}
                            genres={genres}
                            src={movie.posterUrl}
                            key={"Movie" + movie.id}
                            onClick={onClickMovie}
                            showDelete={editing}
                            onDelete={handleRemoveMovie}
                        />)
                    }))
                }
            </div>
        ) : (
            <div className="watch-movie-list__no-results">
                <h1>No Movies added</h1>
            </div>
        )
    };

    const handleGoback = (e) => {
        e.preventDefault();
        e.stopPropagation();
        goBack();
    }

    const handleEnableEditing = (e) => {
        setEditing(true)
    }

    const handleSave = () => {
        marks.forEach( movieId => {
            if( !removedMovies.includes(movieId) ){
                removeMovie({ watchlistId: id, movieId },createAuthClientOptions(token))
                removedMovies.push(movieId)
            }
        })
        setEditing(false)
    }

    const handleDeleteList = () => {
        setDeleting(true);
    }

    const handleDeleteListConfirm = () => {
        deleteWatchList({ id },createAuthClientOptions(token));
        onDelete(id)
        goBack();
    }

    const handleCloseModal = () => {
        setDeleting(false);
    }

    return (
        <>
        <div className="watch-movie-list">
            <header>
                <WatchListCard data={listData}/>
                <div>
                    <p>{loading ? '-' : data.watchlist.movies.length} Movies / {isPublic ? 'Public' : 'Private'}</p>
                </div>
                <button className="watch-movie-list__back" onClick={handleGoback}>
                    <img src="icons/left-arrow.svg" alt="back"/>
                </button>
                {owned && 
                    <div className="watch-movie-list__actions">
                        { !editing ?
                            <OutlineButton white onClick={handleEnableEditing}>Edit</OutlineButton> :
                            <><OutlineButton danger onClick={handleDeleteList}>Delete</OutlineButton>
                            <OutlineButton white onClick={handleSave}>Save changes</OutlineButton></>
                        }
                    </div>
                }
            </header>
            <section>
                {loading ? renderLoading() : renderList() }
            </section>
        </div>
        { deleting && <DeleteModal onClose={handleCloseModal} onSubmit={handleDeleteListConfirm}/>}
        </>
    );
}

export default WatchMoviesList;