import React, { useState } from 'react'
import { usePathSelector } from 'redux-utility'
import { pathEq, propEq } from 'ramda'
import AppContainer from '../AppContainer'
import MovieGrid from '../MovieGrid'
import Home from '../Home'
import Footer from '../Footer'
import MovieModal from '../MovieModal'

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
                <MovieModal id={movieId} open={movieId} onClose={handleClose}/>
            </Route>
            <Route path="top">Top</Route>
            <Route path="catalog">
                <MovieGrid onClickMovie={setMovieId}/>
                <MovieModal id={movieId} open={movieId} onClose={handleClose}/>
                <Footer />
            </Route>
        </Switch>
    </AppContainer>
}

export default Router;