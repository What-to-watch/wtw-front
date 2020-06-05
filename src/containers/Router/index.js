import React, { useState } from 'react'
import { usePathSelector } from 'redux-utility'
import { pathEq, propEq } from 'ramda'
import AppContainer from '../AppContainer'
import MovieGrid from '../MovieGrid'
import Home from '../Home'
import Footer from '../Footer'
import MovieModal from '../MovieModal'
import TopsContainer from '../TopsContainer'

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

    const handleClose = () => {
        setMovieId('');
    }

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
        <MovieModal id={movieId} open={movieId} onClose={handleClose}/>
    </AppContainer>
}

export default Router;