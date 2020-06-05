import React, { useState, useRef } from 'react'
import { find } from 'ramda'
import { useDispatch } from 'react-redux'
import { useQuery } from '@apollo/react-hooks'
import SearchField from '../../components/SearchField'
import FilterModal from '../../components/FilterModal'
import { GENRE_LIST } from '../../queries'
import { setGenresFilter, setTitleSearch, resetCursors } from '../../state/movies'
import { goTo } from '../../state/routing'
import debounce from '../../utils/debounce'
import logo from './wtw_logo.svg'
import getClassName from '../../utils/getClassName'
import "./styles.scss"
import { usePathSelector } from 'redux-utility'

const debounceSearch = debounce((value,dispatch) => {
    dispatch(setTitleSearch(value))
    dispatch(resetCursors())
},200)


const TopBar = () => {
    const { data, loading } = useQuery(GENRE_LIST)
    const current = usePathSelector("routing.current");
    const dispatch = useDispatch();
    const countRef = useRef(0)
    const isCatalog = current === "catalog"
    const handleSeachChange = (e) => {
        if( !isCatalog ){
            dispatch(goTo("catalog"))
        }
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
    const [hover, setHover] = useState(false)

    const figureClass = getClassName({
        "topbar__left-content__filter": true,
        "topbar__left-content__filter--hover": open || hover
    })

    const filterIconClass = getClassName({
       "topbar__left-content__filter__icon": true,
       "topbar__left-content__filter__icon--active": open || countRef.current !== 0
    })

    return (
        <header className="topbar">
            <figure className="topbar__logo">
                <img src={logo} alt="logo"/>
            </figure>
            <section className="topbar__left-content">
                {isCatalog && <figure 
                    aria-label="filter icon"
                    className={figureClass}
                    onClick={() => setOpen(!open)}
                    onMouseEnter={() => setHover(true)}
                    onMouseLeave={() => setHover(false)}
                >
                    <svg className={filterIconClass}>
                        <use xlinkHref={"/icons/defs.svg#filter"}></use>
                    </svg>
                </figure>}
                <SearchField onChange={handleSeachChange} />
                <FilterModal open={open} onGenreChange={handleGenreChange} />
            </section>
        </header>
    )
}

export default TopBar