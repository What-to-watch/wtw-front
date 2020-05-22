import ApolloClient from 'apollo-boost';

const client = new ApolloClient({
  uri: 'https://wfh-challenge.herokuapp.com/api/graphql/',
});

export default client;