import React from 'react';
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
  return (
    <ApolloProvider client={client}>
      <Provider store={store}>
        <TopBar />
        <MovieGrid />
        <Footer />
        <MovieModal />
      </Provider>
    </ApolloProvider>
  );
}

export default App;
