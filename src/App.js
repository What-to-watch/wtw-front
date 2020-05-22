import React from 'react';
import { ApolloProvider } from '@apollo/react-hooks';
import { MoviesProvider } from './state/movieState';
import Footer from './containers/Footer';
import MovieGrid from './containers/MovieGrid';


import client from './queries/client';

function App() {
  return (
    <ApolloProvider client={client}>
      <MoviesProvider>
        <MovieGrid />
        <Footer />
      </MoviesProvider>
    </ApolloProvider>
  );
}

export default App;
