import React, { useState } from 'react'
import { useQuery } from "@apollo/react-hooks"
import { GENRE_LIST, TOP_TEN } from '../../queries'
import TopTen from '../../components/TopTen'
import MovieModal from '../MovieModal'
import MovieCard from '../../components/MovieCard'

import "./styles.scss"

const data = {
    "topListing": [
        {node:{
          "title": "His Girl Friday",
          "posterUrl": "https://image.tmdb.org/t/p/w500/fmQLvnDEL9wlE6FzB1S84yskdkT.jpg",
          "id": 951
        }},
        {node:{
          "title": "Sunset Blvd. (a.k.a. Sunset Boulevard)",
          "posterUrl": "https://image.tmdb.org/t/p/w500/zt8aQ6ksqK6p1AopC5zVTDS9pKT.jpg",
          "id": 922
        }},
        {node:{
          "title": "It Happened One Night",
          "posterUrl": "https://image.tmdb.org/t/p/w500/tr0Tb47eYIjYTT9H7qOYStkOwOc.jpg",
          "id": 905
        }},
        {node:{
          "title": "Philadelphia Story, The",
          "posterUrl": "https://image.tmdb.org/t/p/w500/o4cYWubhrBFF56IyEyce89lMb5y.jpg",
          "id": 898
        }},
        {node:{
          "title": "Harold and Maude",
          "posterUrl": "https://image.tmdb.org/t/p/w500/7aKk1J9Dvuh581x04iRnOvNJozR.jpg",
          "id": 1235
        }},
        {node:{
          "title": "Notorious",
          "posterUrl": "https://image.tmdb.org/t/p/w500/yUjKnpColooH88BFQJwwgNOQ56N.jpg",
          "id": 930
        }},
        {node:{
          "title": "Casablanca",
          "posterUrl": "https://image.tmdb.org/t/p/w500/50CF3t3mc1ShNEIA6N6xtJ7iYu2.jpg",
          "id": 912
        }},
        {node:{
          "title": "Princess Bride, The",
          "posterUrl": "https://image.tmdb.org/t/p/w500/zKyJsVIeu4bTJjF2XCYhPNS4BrZ.jpg",
          "id": 1197
        }},
        {node:{
          "title": "Persuasion",
          "posterUrl": "https://image.tmdb.org/t/p/w500/tYOFCtgLb4hfuwhXKBWwAobWhwS.jpg",
          "id": 28
        }},
        {node:{
          "title": "To Catch a Thief",
          "posterUrl": "https://image.tmdb.org/t/p/w500/9UdAlTenWqxj2l5oFExkjuVHmKO.jpg",
          "id": 933
        }}
      ]
}

const TopRow = ({ id, name, onMovie }) => {
    // const { data, loading, error } = useQuery(TOP_TEN,{
    //     genreId,
    // })

    const loading = false;
    return loading ? <div>Loading</div> : 
    <>
    <h2>{name}</h2>
    <div className="top-row">
        {data.topListing.map(({ node }) => {
            return <MovieCard 
                key={node.id}
                title={node.title}
                genres={[]}
                id={node.id}
                src={node.posterUrl}
                onClick={onMovie}
            />
        })}
    </div>
    </>
}

const TopsContainer = () => {
    const { 
        data, 
        loading, 
        error
    } = useQuery(GENRE_LIST);

    const [ movieId, setMovieId ] = useState('');

    const handleClose = () => {
        setMovieId('');
    }

    return loading ? <div>Loading</div> :
        <div className="tops">
            <MovieModal 
                id={movieId}
                open={movieId}
                onClose={handleClose}
            />
            <h1>Top By Genre</h1>
            <div className="divider"></div>
            {data.genres.map(({ id, name }) => (
                <TopRow 
                    key={id} 
                    id={id} 
                    name={name} 
                    onMovie={setMovieId}
                />
                )
            )}
        </div>
}

export default TopsContainer