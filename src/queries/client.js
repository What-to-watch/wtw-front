import { GraphQLClient } from 'graphql-request';

const client = new GraphQLClient('https://wfh-challenge.herokuapp.com/api/graphql/');

export default client;