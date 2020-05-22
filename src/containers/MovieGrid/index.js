import React from 'react';
import MovieCard, { LoadingMovieCard } from '../../components/MovieCard';
import getRandomHue from '../../utils/getRandomHue';
import { useMovies } from '../../state/movies/hooks'
import { usePathSelector } from 'redux-utility';

import './styles.scss';

const Card = ({ children }) => <div className="movie-grid__content__card">
    {children}
</div>

export const LoadingMovieGrid = (props) => {
    const { length = 100, hue = '' } = props;
    const keys = Array.from(Array(length).keys());
    return (
        <>
            {keys.map((key) => (
                <Card>
                    <LoadingMovieCard 
                        key={key.toString()} 
                        hue={ hue === '' ? getRandomHue() : hue }
                    />
                </Card>
            ))}
        </>
    )
}


const MovieGrid = () => {
    const state = usePathSelector("movies.query")
    const { loading, data, error } = useMovies()

    const renderLoading = () => (
        <LoadingMovieGrid length={state.resultsPerPage > 100 ? 80 : state.resultsPerPage}/>
    )

    const renderResults = () => data.movies.edges.map((movie => {
            const genres = movie.node.genres ? movie.node.genres.map((genre => genre.name)) : [];
            return <Card>
                <MovieCard 
                    {...movie.node}
                    genres={genres}
                    src={movie.node.posterUrl}
                    key={movie.node.id}
                />
            </Card>
        }))
    }


    return <div className="movie-grid">
        <div className="movie-grid__content">
        {(!loading && !error) ? renderResults() : renderLoading()}
        </div>
    </div>
}

export default MovieGrid