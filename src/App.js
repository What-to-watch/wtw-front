import React, { useState } from 'react';
import { Provider } from 'react-redux'
import { ApolloProvider } from '@apollo/react-hooks';
import Footer from './containers/Footer';
import MovieGrid from './containers/MovieGrid';
import MovieModal from './containers/MovieModal';
import TopBar from './containers/TopBar';

import client from './queries/client';
import { initStore } from './store';

const store = initStore();

function App() {
  const [ movieId, setMovieId ] = useState('');

  const handleMovieId = (id) => {
    setMovieId(id);
  }

  const handleClose = () => {
    setMovieId('');
  }

  return (
    <ApolloProvider client={client}>
      <Provider store={store}>
        <TopBar />
        <MovieGrid onClickMovie={handleMovieId}/>
        <Footer />
        <MovieModal id={movieId} open={movieId !== ''} onClose={handleClose}/>
      </Provider>
    </ApolloProvider>
  );
}

export default App;
