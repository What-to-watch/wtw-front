import React, { useState, useEffect } from 'react';
import MovieCard, { LoadingMovieCard } from '../../components/MovieCard';
import getRandomHue from '../../utils/getRandomHue';

import './styles.scss';

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
    const [ results, setResults ] = useState({data:[], length: 100});
    const [ loading, setLoading ] = useState(true);

    useEffect(()=>{
        if(results.data.length > 0) {
            setLoading(false);
        }
    }, [results])

    const renderLoading = () => (
        <LoadingMovieGrid length={100}/>
    )

    const renderResults = () => (
        <div className="movie-grid">
            {
                results.data.map((result => (
                    <MovieCard {...result} key={result.id}/>
                )))
            }
        </div>
    )

    return (results.length > 0) && !loading ? renderResults() : renderLoading();
}

export default MovieGrid