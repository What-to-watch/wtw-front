import React from 'react';
import { Provider } from 'react-redux'
import { ApolloProvider } from '@apollo/react-hooks';
import client from './queries/client';
import { initStore } from './store';
import Router from './containers/Router';

const store = initStore();

function App() {
  return (
    <ApolloProvider client={client}>
      <Provider store={store}>
        <Router />
      </Provider>
    </ApolloProvider>
  );
}

export default App;
