import React from 'react';
import MovieCard, { LoadingMovieCard } from '../../components/MovieCard';
import getRandomHue from '../../utils/getRandomHue';
import { useMovies } from '../../state/movies/hooks';
import { usePathSelector } from 'redux-utility';

import './styles.scss';

const removeDuplicates = arr => {
    return arr.reduce(
        (acc,movie) => {
            return acc.find(x => x.node.id === movie.node.id) ?
                acc:
                [...acc, movie]
        }
        ,[]
    )
}

export const LoadingMovieGrid = (props) => {
    const { length = 100, hue = '' } = props;
    const keys = Array.from(Array(length).keys());
    return (
        <div className="movie-grid">
            {keys.map((key) => (
                <LoadingMovieCard 
                    key={ key.toString()} 
                    hue={ hue === '' ? getRandomHue() : hue }
                />
            ))}
        </div>
    )
}


const MovieGrid = (props) => {
    const { onClickMovie } = props;
    const state = usePathSelector("movies.query")
    const { loading, data, error } = useMovies()

    const renderLoading = () => (
        <LoadingMovieGrid length={state.resultsPerPage > 100 ? 80 : state.resultsPerPage}/>
    )

    const renderResults = () => (
        <div className="movie-grid">
            {
                removeDuplicates(data.movies.edges).map((movie => {
                    const genres = movie.node?.genres?.map((genre => genre.name));
                    return (
                        <MovieCard 
                            {...movie.node}
                            genres={genres}
                            src={movie.node.posterUrl}
                            key={"Movie" + movie.node.id}
                            onClick={onClickMovie}
                        />)
                }))
            }
        </div>
    )

    return !loading && !error ? renderResults() : renderLoading();
}

export default MovieGrid