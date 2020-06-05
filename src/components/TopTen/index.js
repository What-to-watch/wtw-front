import React from 'react';
import Flickity from 'react-flickity-component';
import MovieCard, { LoadingMovieCard } from '../MovieCard';

import './styles.scss';


const flickityOptions = {
    initialIndex: 2,
    pageDots: false,
    prevNextButtons: true,
    draggable: true,
    contain: true,
}

export const LoadingTopTen = (props) => {
    const { name } = props;
    const keys = Array.from(Array(10).keys());
    return (
        <div className="top-ten">
            <h3 className="top-ten__title">{name}</h3>
            <Flickity
                className={'carousel'}
                elementType={'div'} 
                options={flickityOptions} 
                disableImagesLoaded={false}
                reloadOnUpdate
                static
            >
                {
                    keys.map( key => {
                        return (
                            <LoadingMovieCard 
                                key={key.toString()}
                            />
                        )
                    })
                }
            </Flickity>
        </div>
    )
}

const TopTen = (props) => {
    const { id, name, movies, onClickItem } = props;
    return (
        <div id={id} className="top-ten">
            <h3 className="top-ten__title">{name}</h3>
            <Flickity
                className={'carousel'}
                elementType={'div'} 
                options={flickityOptions} 
                disableImagesLoaded={false}
                reloadOnUpdate
                static
            >
                {
                    movies.topListing.map( movie => {
                        const genres = movie.genres.map((genre => genre.name));
                        return (
                            <MovieCard 
                                {...movie}
                                genres={genres}
                                src={movie.posterUrl}
                                key={"Movie" + movie.id}
                                onClick={onClickItem}
                            />
                        )
                    })
                }
            </Flickity>
        </div>
    )
}

export default TopTen;
