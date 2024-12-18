import { ApolloClient, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
  uri: 'http://localhost:4000', // Adjust the URI to match your server address
  cache: new InMemoryCache(),
});

export default client;
