import React, { useState } from 'react'
import { usePathSelector } from 'redux-utility'
import { pathEq, propEq } from 'ramda'
import AppContainer from '../AppContainer'
import MovieGrid from '../MovieGrid'
import Home from '../Home'
import Footer from '../Footer'
import MovieModal from '../MovieModal'
import TopsContainer from '../TopsContainer'
import LoginModal from '../LoginModal'
import WatchList from '../WatchList'
import { useDispatch } from 'react-redux'
import { goTo, goBack } from '../../state/routing'

const Route = ({ path, children }) => children

const Switch = ({ value, children }) => {
    return React.Children
            .toArray(children)
            .filter(propEq("type",Route))
            .find(pathEq(["props","path"],value)) || <div>No route available</div>
}

const Router = () => {
    const current = usePathSelector("routing.current");
    const dispatch = useDispatch()
    const [ movieId, setMovieId ] = useState('');
    const [ loginOpen, setLoginOpen ] = useState(false);

    const handleClose = () => {
        setMovieId('');
        dispatch(goBack())
    }

    const handleMovieClick = (id) => {
        setMovieId(id)
        dispatch(goTo("movie-details"));
    }

    const handleLoginClose = () => setLoginOpen(false)
    const handleLoginOpen = (auth) => setLoginOpen(auth)

    return <AppContainer onSignInClick={handleLoginOpen}>
        <Switch value={current}>
            <Route path="home">
                <Home onClickMovie={handleMovieClick}/>
            </Route>
            <Route path="top">
                <TopsContainer onClickMovie={handleMovieClick}/>
            </Route>
            <Route path="lists">
                <WatchList onClickMovie={handleMovieClick}/>
            </Route>
            <Route path="catalog">
                <MovieGrid onClickMovie={handleMovieClick}/>
                <Footer />
            </Route>
            <Route path="movie-details">
                <MovieModal id={movieId} onClose={handleClose}/>
            </Route>
        </Switch>
        {loginOpen === "anonymous" && <LoginModal open={loginOpen} onClose={handleLoginClose}/>}
    </AppContainer>
}

export default Router;