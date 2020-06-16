import React, { useState } from 'react'
import { usePathSelector } from 'redux-utility';
import TopBar from '../TopBar'
import { useDispatch } from 'react-redux';
import { goTo } from '../../state/routing';
import getClassName from '../../utils/getClassName';
import "./styles.scss";
import { resetCursors } from '../../state/movies';

const NavIcon = ({ icon, to }) => {
    const current = usePathSelector("routing.current");
    const dispatch = useDispatch();
    const [hover , setHover] = useState(false);
    const active = current === to;

    const handleClick = e => {
        e.preventDefault();
        if(!active){
            dispatch(goTo(to));
            if( to !== "catalog" ){
                dispatch(resetCursors())
            }
        }
    }

    const linkClass = getClassName({
        "navbar__link": true,
        "navbar__link--hover": hover && !active,
        "navbar__link--current": active
    })
    const figureClass = getClassName({
        "navbar__link__figure": true,
    })
    const iconClass = getClassName({
        "navbar__link__icon": true,
        "navbar__link__icon--hover": hover && !active,
        "navbar__link__icon--current": active,
    })

    return <button
        className={linkClass}
        onClick={handleClick}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
    >
        <figure
            className={figureClass}
        >
            <svg className={iconClass}>
                <use xlinkHref={`/icons/defs.svg#${icon.toLowerCase()}`}></use>
            </svg>
        </figure>
        {icon}
    </button>
}

const NavBar = () => {
    return <nav className="navbar">
        <NavIcon icon="Home" to="home" />
        <NavIcon icon="Top" to="top" />
        <NavIcon icon="Catalog" to="catalog" />
    </nav>
}

const AppContainer = ({ children }) => {
    return <>
        <TopBar />
        <div className="container">
            <NavBar />
            {children}
        </div>
    </>
}

export default AppContainer;