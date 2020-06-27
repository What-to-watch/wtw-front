import React from 'react';
import MovieCard from '../../components/MovieCard';
import YellowStars from '../../components/YellowStars';
import { useQuery } from '../../queries/hooks';
import { RECOMMENDED_MOVIES } from '../../queries'
import { createAuthClientOptions } from '../../utils/createAuthClientOptions';
import './styles.scss';

const RecommendedMovies = (props) => {
    const { onClickMovie, userData } = props;
    const { data, loading, error } = useQuery(RECOMMENDED_MOVIES,
        {},
        {
            disableCaching: true,
            clientOptions: createAuthClientOptions(userData.token)
        }
    );

    const renderLoading = () => {
        return (
            <div className="recommended-movies__container">
                <img src="https://media.giphy.com/media/sIIhZliB2McAo/giphy.gif" alt="loading"/>
            </div>
        )
    }

    const renderContent = () => {
        const { topRecommendedListing: movies } = data
        if( !movies ){
            return <div className="recommended-movies__container">
                <h1 className="recommended-movies__container__no-rec">
                    Please rate more movies to get recommendations :)
                </h1>
            </div>
        }
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
