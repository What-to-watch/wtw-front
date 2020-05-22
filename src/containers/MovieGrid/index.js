import React, { useContext } from 'react';
import { useQuery } from '@apollo/react-hooks';
import MovieCard, { LoadingMovieCard } from '../../components/MovieCard';
import getRandomHue from '../../utils/getRandomHue';
import { movies } from '../../state/movieState';

import './styles.scss';
import { INIT_MOVIES_QUERY } from '../../queries';

export const LoadingMovieGrid = (props) => {
    const { length = 100, hue = '' } = props;
    const keys = Array.from(Array(length).keys());
    return (
        <div className="movie-grid">
            {keys.map((key) => (
                <LoadingMovieCard 
                    key={key.toString()} 
                    hue={ hue === '' ? getRandomHue() : hue }
                />
            ))}
        </div>
    )
}


const MovieGrid = () => {
    const { state } = useContext(movies);

    const { loading, data, error } = useQuery(
        INIT_MOVIES_QUERY,  
        { 
            errorPolicy: 'ignore', 
            variables: {
                ...state,
                first: state.resultsPerPage
            }
        }
    );

    const renderLoading = () => (
        <LoadingMovieGrid length={state.resultsPerPage > 100 ? 80 : state.resultsPerPage}/>
    )

    const renderResults = () => (
        <div className="movie-grid">
            {
                data.movies.edges.map((movie => {
                    const genres = movie.node.genres ? movie.node.genres.map((genre => genre.name)) : [];
                    return (
                        <MovieCard 
                            {...movie.node}
                            genres={genres}
                            src={movie.node.posterUrl}
                            key={movie.node.id}
                        />)
                }))
            }
        </div>
    )

    return !loading && !error ? renderResults() : renderLoading();
}

export default MovieGrid