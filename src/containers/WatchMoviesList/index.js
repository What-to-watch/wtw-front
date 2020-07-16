import React from 'react';
import { useQuery } from '../../queries/hooks';
import MovieCard from '../../components/MovieCard';
import WatchListCard from '../../components/WatchListCard';
import { WATCH_LIST } from '../../queries';

import './styles.scss';
import '../MovieGrid/styles.scss';

const WatchMoviesList = (props) => {
    const { data: listData, onClickMovie, goBack = ()=>{} } = props;
    const { id, isPublic } = listData;
    const { data, loading, error } = useQuery(WATCH_LIST, { id });

    const renderLoading = () => (
        <div>
            <img src="https://media.giphy.com/media/sIIhZliB2McAo/giphy.gif" alt="loading"/>
        </div>
    );

    const renderList = () => { 
        return data.watchlist.movies.length > 0 && !error ? (
            <div className="movie-grid">
                { data.watchlist.movies.map((movie => {
                        const genres = movie.genres.map((genre => genre.name));
                        return (
                            <MovieCard 
                                {...movie}
                                genres={genres}
                                src={movie.posterUrl}
                                key={"Movie" + movie.id}
                                onClick={onClickMovie}
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

    return (
        <div className="watch-movie-list">
            <header>
                <WatchListCard data={listData}/>
                <div>
                    <p>{loading ? '-' : data.watchlist.movies.length} Movies / {isPublic ? 'Public' : 'Private'}</p>
                </div>
                <button className="watch-movie-list__back" onClick={handleGoback}>
                    <img src="icons/left-arrow.svg" alt="back"/>
                </button>
            </header>
            <section>
                {loading ? renderLoading() : renderList() }
            </section>
        </div>
    );
}

export default WatchMoviesList;