
import { ApolloClient, InMemoryCache, ApolloProvider, gql } from '@apollo/client';


const client = new ApolloClient({
    uri: 'http://localhost:4000/graphql?query=query+people%7B%0A++people+%7B%0A++++firstName%0A++++lastName%0A++++dateOfBirth%0A++++function%0A++++experience%0A++++id%0A++++%0A++%7D%0A%7D#',
    cache: new InMemoryCache(),
  });
   

  export default client;