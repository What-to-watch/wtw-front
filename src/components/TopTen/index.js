import React from 'react';
import Flickity from 'react-flickity-component';
import MovieCard from '../MovieCard';

import './styles.scss';


const flickityOptions = {
    initialIndex: 1,
    pageDots: false,
    prevNextButtons: false,
    draggable: true,
    contain: true,
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
                    movies.map( movie => {
                        const genres = movie.node?.genres?.map((genre => genre.name));
                        return (
                            <MovieCard 
                                {...movie.node}
                                genres={genres}
                                src={movie.node.posterUrl}
                                key={"Movie" + movie.node.id}
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
