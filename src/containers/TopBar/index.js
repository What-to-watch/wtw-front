import { find } from 'ramda'
import { useDispatch } from 'react-redux'
import { useQuery } from '@apollo/react-hooks'
import React, { useState, useRef } from 'react'
import SearchField from '../../components/SearchField'
import FilterModal from '../../components/FilterModal'
import { GENRE_LIST } from '../../queries'
import { setGenresFilter, setTitleSearch, resetCursors } from '../../state/movies'
import debounce from '../../utils/debounce'

import logo from './wtw_logo.svg'
import filterIcon from './filter.svg'
import "./styles.scss"

const debounceSearch = debounce((value,dispatch) => {
    dispatch(setTitleSearch(value))
    dispatch(resetCursors())
},200)


const TopBar = () => {
    const { data, loading } = useQuery(GENRE_LIST)
    const dispatch = useDispatch();
    const countRef = useRef(0)

    const handleSeachChange = (e) => {
        debounceSearch(e.target.value,dispatch);
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
            if( mapped.length !== countRef.current ){
                countRef.current = mapped.length
                dispatch(resetCursors())
            }
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