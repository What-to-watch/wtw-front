import React from 'react';
import { usePathSelector } from 'redux-utility';
import { useQuery } from '../../queries/hooks';
import MovieCard from '../../components/MovieCard';
import RecommendedMovies from '../RecommendedMovies';
import TopTen, { LoadingTopTen } from '../../components/TopTen';
import { TOP_TEN, TOP_100 } from '../../queries';
import { LoadingMovieGrid } from '../MovieGrid';

import '../MovieGrid/styles.scss';
import './styles.scss';

const Top100 = (props) => {
    const { movies, onClickMovie } = props;
    
    return (
        <div className="movie-grid">
            {
                movies.topListing.map((movie => {
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
    )
}

const Home = (props) => {
    const { onClickMovie } = props;
    const top10 = useQuery(TOP_TEN, { id: 1571958030336 });
    const top100 = useQuery(TOP_100,{ n: 100 });
    const authenticated = usePathSelector('user.authenticated');
    
    return (
        <div className="home">
            {authenticated && (<RecommendedMovies onClickMovie={onClickMovie}/>)}
            <div className="home__top-ten">
                <h2 className="home__subtitle">Top</h2>
                <div>
                    { top10.loading ? 
                        <LoadingTopTen name="Action"/> :
                        <TopTen movies={top10.data} name="Action" id={345} onClickItem={onClickMovie}/>
                    }
                </div>
            </div>
            <div className="home__top-100">
                <h2 className="home__subtitle">Top 100</h2>
                <div>
                    { top100.loading ? 
                        <LoadingMovieGrid name="Action"/> :
                        <Top100 movies={top100.data} onClickMovie={onClickMovie}/>
                    }
                </div>
            </div>
        </div>
    )
}

export default Home;