import React, { useState } from 'react'
import SearchField from '../../components/SearchField'
import FilterModal from '../../components/FilterModal'
import "./styles.scss"
import logo from './wtw_logo.svg'
import filterIcon from './filter.svg'
import { useQuery } from '@apollo/react-hooks'
import { GENRE_LIST } from '../../queries'
import { useDispatch } from 'react-redux'
import { setGenresFilter } from '../../state/movies'
import { find } from 'ramda'

const TopBar = () => {
    const { data, loading } = useQuery(GENRE_LIST)
    const dispatch = useDispatch();

    const handleSeachChange = (value) => {
        
    }

    const handleGenreChange = (genres) => {
        if( !loading ){
            const mapped = genres.map(genreName => {
                return find(
                    g => {
                        return g.name.toLowerCase() === genreName.toLowerCase() ? g : null
                    }, 
                    data.genres
                )
            }).filter(Boolean)
            dispatch(setGenresFilter(mapped))
        }
    }

    const [open, setOpen] = useState(false)
    return (
        <header className="topbar">
            <figure className="topbar__logo">
                <img src={logo} alt="logo"/>
            </figure>
            <section className="topbar__left-content">
                <figure className="topbar__left-content__filter" onClick={() => setOpen(!open)}>
                    <img src={filterIcon} alt="filter"/>
                </figure>
                <SearchField onChange={handleSeachChange} />
                <FilterModal open={open} onGenreChange={handleGenreChange} />
            </section>
        </header>
    )
}

export default TopBar