import React, { useState } from 'react'
import { usePathSelector } from 'redux-utility';
import { useDispatch } from 'react-redux';
import TopBar from '../TopBar'
import { goTo } from '../../state/routing';
import { resetCursors } from '../../state/movies';
import getClassName from '../../utils/getClassName';
import "./styles.scss";

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
        base: "navbar__link",
        "&--hover": hover && !active,
        "&--current": active
    })
    const figureClass = linkClass.extend("&__figure")
    const iconClass = getClassName({
        base: linkClass.extend("&__icon"),
        "&--hover": hover && !active,
        "&--current": active,
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
        <NavIcon icon="Lists" to="lists" />
        <NavIcon icon="Catalog" to="catalog" />
    </nav>
}

const AppContainer = ({ children, onSignInClick=()=>{} }) => {
    return <>
        <TopBar onSignInClick={onSignInClick} />
        <div className="container">
            <NavBar />
            {children}
        </div>
    </>
}

export default AppContainer;