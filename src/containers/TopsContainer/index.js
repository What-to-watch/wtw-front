import React from 'react'
import { useQuery } from "../../queries/hooks"
import { GENRE_LIST, TOP_TEN } from '../../queries'
import TopTen, { LoadingTopTen } from '../../components/TopTen'
import { sortBy, prop, filter, propEq, compose } from 'ramda'
import "./styles.scss"

const TopRow = ({ id, name, onClickMovie }) => {
  const { data, loading } = useQuery(TOP_TEN,{ id: `${id}` })

  if( loading ){
    return <LoadingTopTen name={name}/>
  } else {
    return <TopTen 
      id={id}
      name={name}
      movies={data}
      onClickItem={onClickMovie}
    />
  }
}

const TopsContainer = ({ onClickMovie }) => {
  const { 
      data, 
      loading
  } = useQuery(GENRE_LIST);
  const sortGenres = sortBy(prop("name"));
  const filterNoGenre = filter(x => !propEq("name","(no genres listed)",x))
  const prepare = compose(sortGenres, filterNoGenre);

  return <div className="tops">
        <h2 className="tops__title">Top By Genre</h2>
        {loading ? <div className="loading-movie-card__dots" /> :
        <>
          {prepare(data.genres).map(({ id, name }) => (
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