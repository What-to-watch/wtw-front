import React from 'react'
import { useQuery } from "@apollo/react-hooks"
import { GENRE_LIST, TOP_TEN } from '../../queries'
import TopTen, { LoadingTopTen } from '../../components/TopTen'
import { sortBy, prop } from 'ramda'
import "./styles.scss"

const mockdata = {
  "topListing": [
    {
      "title": "His Girl Friday",
      "posterUrl": "https://image.tmdb.org/t/p/w500/fmQLvnDEL9wlE6FzB1S84yskdkT.jpg",
      "id": 951,
      "genres": [
        {
          "name": "Comedy"
        },
        {
          "name": "Romance"
        }
      ]
    },
    {
      "title": "Sunset Blvd. (a.k.a. Sunset Boulevard)",
      "posterUrl": "https://image.tmdb.org/t/p/w500/zt8aQ6ksqK6p1AopC5zVTDS9pKT.jpg",
      "id": 922,
      "genres": [
        {
          "name": "Drama"
        },
        {
          "name": "Film-Noir"
        },
        {
          "name": "Romance"
        }
      ]
    },
    {
      "title": "It Happened One Night",
      "posterUrl": "https://image.tmdb.org/t/p/w500/tr0Tb47eYIjYTT9H7qOYStkOwOc.jpg",
      "id": 905,
      "genres": [
        {
          "name": "Comedy"
        },
        {
          "name": "Romance"
        }
      ]
    },
    {
      "title": "Philadelphia Story, The",
      "posterUrl": "https://image.tmdb.org/t/p/w500/o4cYWubhrBFF56IyEyce89lMb5y.jpg",
      "id": 898,
      "genres": [
        {
          "name": "Comedy"
        },
        {
          "name": "Drama"
        },
        {
          "name": "Romance"
        }
      ]
    },
    {
      "title": "Harold and Maude",
      "posterUrl": "https://image.tmdb.org/t/p/w500/7aKk1J9Dvuh581x04iRnOvNJozR.jpg",
      "id": 1235,
      "genres": [
        {
          "name": "Comedy"
        },
        {
          "name": "Drama"
        },
        {
          "name": "Romance"
        }
      ]
    },
    {
      "title": "Notorious",
      "posterUrl": "https://image.tmdb.org/t/p/w500/yUjKnpColooH88BFQJwwgNOQ56N.jpg",
      "id": 930,
      "genres": [
        {
          "name": "Film-Noir"
        },
        {
          "name": "Romance"
        },
        {
          "name": "Thriller"
        }
      ]
    },
    {
      "title": "Casablanca",
      "posterUrl": "https://image.tmdb.org/t/p/w500/50CF3t3mc1ShNEIA6N6xtJ7iYu2.jpg",
      "id": 912,
      "genres": [
        {
          "name": "Drama"
        },
        {
          "name": "Romance"
        }
      ]
    },
    {
      "title": "Princess Bride, The",
      "posterUrl": "https://image.tmdb.org/t/p/w500/zKyJsVIeu4bTJjF2XCYhPNS4BrZ.jpg",
      "id": 1197,
      "genres": [
        {
          "name": "Action"
        },
        {
          "name": "Adventure"
        },
        {
          "name": "Comedy"
        },
        {
          "name": "Fantasy"
        },
        {
          "name": "Romance"
        }
      ]
    },
    {
      "title": "Persuasion",
      "posterUrl": "https://image.tmdb.org/t/p/w500/tYOFCtgLb4hfuwhXKBWwAobWhwS.jpg",
      "id": 28,
      "genres": [
        {
          "name": "Drama"
        },
        {
          "name": "Romance"
        }
      ]
    },
    {
      "title": "To Catch a Thief",
      "posterUrl": "https://image.tmdb.org/t/p/w500/9UdAlTenWqxj2l5oFExkjuVHmKO.jpg",
      "id": 933,
      "genres": [
        {
          "name": "Crime"
        },
        {
          "name": "Mystery"
        },
        {
          "name": "Romance"
        },
        {
          "name": "Thriller"
        }
      ]
    }
  ]
}

const TopRow = ({ id, name, onClickMovie }) => {
  const { data, loading, error } = useQuery(TOP_TEN,{
    variables: {id: `${id}`},
  })

  return loading ? <LoadingTopTen name={name}/> : 
  <TopTen 
    id={id}
    name={name}
    movies={data}
    onClickItem={onClickMovie}
  />
}

const TopsContainer = ({ onClickMovie }) => {
  const { 
      data, 
      loading
  } = useQuery(GENRE_LIST);
  const sortGenres = sortBy(prop("name"));

  return <div className="tops">
        <h1 className="tops__title">Top By Genre</h1>
        <div className="divider"></div>
        {loading ? <div className="loading-movie-card__dots" /> :
        <>
          {sortGenres(data.genres).map(({ id, name }) => (
              <TopRow 
                  key={id} 
                  id={id} 
                  name={name} 
                  onClickMovie={onClickMovie}
              />
              )
          )}
        </>}
      </div>
}

export default TopsContainer