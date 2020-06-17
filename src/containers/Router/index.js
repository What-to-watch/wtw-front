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

const Route = ({ path, children }) => children

const Switch = ({ value, children }) => {
    return React.Children
            .toArray(children)
            .filter(propEq("type",Route))
            .find(pathEq(["props","path"],value)) || <div>No route available</div>
}

const Router = () => {
    const current = usePathSelector("routing.current");
    const [ movieId, setMovieId ] = useState('');
    const [ open, setOpen ] = useState(true);

    const handleClose = () => {
        setMovieId('');
    }

    const handleLoginClose = () => setOpen(false)

    return <AppContainer>
        <Switch value={current}>
            <Route path="home">
                <Home onClickMovie={setMovieId}/>
            </Route>
            <Route path="top">
                <TopsContainer onClickMovie={setMovieId}/>
            </Route>
            <Route path="catalog">
                <MovieGrid onClickMovie={setMovieId}/>
                <Footer />
            </Route>
        </Switch>
        {movieId && <MovieModal id={movieId} open={movieId} onClose={handleClose}/>}
        {open && <LoginModal open={open} onClose={handleLoginClose}/>}
    </AppContainer>
}

export default Router;