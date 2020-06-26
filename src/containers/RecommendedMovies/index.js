import React from 'react';
import MovieCard from '../../components/MovieCard';
import YellowStars from '../../components/YellowStars';
import { useQuery } from '../../queries/hooks';
import { RECOMMENDED_MOVIES } from '../../queries'

import './styles.scss';

const RecommendedMovies = (props) => {
    const { data, loading, error } = useQuery(RECOMMENDED_MOVIES,{id:85899345920});
    const { onClickMovie } = props;

    const renderLoading = () => {
        return (
            <div className="recommended-movies__container">
                <img src="https://media.giphy.com/media/sIIhZliB2McAo/giphy.gif" alt="loading"/>
            </div>
        )
    }

    const renderContent = () => {
        const { topListing: movies } = data
        return (
            <div className="recommended-movies__container">
                { movies.map(movie => {
                    const genres = movie.genres.map((genre => genre.name));
                    return (
                        <div className="recommended-movies__movie"  key={"Movie" + movie.id}>
                            <MovieCard 
                                {...movie} 
                                onClick={onClickMovie} 
                                src={movie.posterUrl}
                                genres={genres}
                            />
                            <div className="recommended-movies__movie__prediction">
                                <h6>Predicted rating</h6>
                                <YellowStars n={3} />
                            </div>
                        </div>
                    )
                }) }
            </div>
        );
    }

    return (
        <div className="recommended-movies">
            <h2 className="recommended-movies__title">WTW for you</h2>
            {loading || error ? renderLoading() : renderContent() }
        </div>
    );
}

export default RecommendedMovies;
