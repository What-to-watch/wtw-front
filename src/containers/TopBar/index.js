import React, { useState, useRef } from 'react'
import { find } from 'ramda'
import { useDispatch } from 'react-redux'
import { usePathSelector } from 'redux-utility'
import { GENRE_LIST } from '../../queries'
import { useQuery } from '../../queries/hooks'
import Modal from '../../components/Modal'
import SearchField from '../../components/SearchField'
import FilterModal from '../../components/FilterModal'
import OutlineButton from '../../components/OutlineButton'
import { goTo } from '../../state/routing'
import { logout } from '../../state/user'
import { setGenresFilter, setTitleSearch, resetCursors } from '../../state/movies'
import debounce from '../../utils/debounce'
import getClassName from '../../utils/getClassName'
import logo from './wtw_logo.svg'
import profile from './profile.svg'
import "./styles.scss"

const debounceSearch = debounce((value,dispatch) => {
    dispatch(setTitleSearch(value))
    dispatch(resetCursors())
},200)

const TopBar = (props) => {
    const { onSignInClick=()=>{} } = props
    const { data, loading } = useQuery(GENRE_LIST)
    const [ modalOpen, setModalOpen] = useState(false);
    const user = usePathSelector("user");
    const current = usePathSelector("routing.current");
    const dispatch = useDispatch();
    const countRef = useRef(0)
    const isCatalog = current === "catalog"

    const handleLogOut = (e) => {
        e.stopPropagation && e.stopPropagation();
        setModalOpen(false)
        dispatch(logout())
    }

    const handleSignInClick = () => {
        onSignInClick(user.authenticated ? "authenticated" : "anonymous");
        if(user.authenticated){
            setModalOpen(!modalOpen)
        }
    }

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
        base: "topbar__center-content__filter",
        "&--hover": open || hover
    })

    const filterIconClass = getClassName({
        base: figureClass.extend("&__icon"),
        "&--active": open || countRef.current !== 0
    })

    return (
        <header className="topbar">
            <figure className="topbar__logo" onClick={() => dispatch(goTo("home"))}>
                <img src={logo} alt="logo"/>
            </figure>
            <section className="topbar__center-content">
                <SearchField onChange={handleSeachChange} />
                <FilterModal open={open} onGenreChange={handleGenreChange} />
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
            </section>
            <section className="topbar__left-content" onClick={handleSignInClick}>
                <figure className="topbar__left-content__figure">
                    <img src={profile} alt="sign in" />
                </figure>
                <div className="topbar__left-content__label">
                    {user.authenticated ? 
                        user.data.username : "Sign in"
                    }
                </div>
            </section>
            <Modal open={modalOpen} className="topbar__logout-modal">
                <OutlineButton onClick={handleLogOut}>Log out</OutlineButton>
            </Modal>
        </header>
    )
}

export default TopBar