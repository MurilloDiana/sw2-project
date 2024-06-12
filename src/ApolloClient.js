import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink } from '@apollo/client';

// Crea el enlace HTTP para la conexión con el servidor GraphQL
const httpLink = createHttpLink({
  uri: 'http://localhost:8081/graphql', // Asegúrate de que esta URL sea la correcta
});

// Configura Apollo Client
const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});

const ApolloProviderComponent = ({ children }) => (
  <ApolloProvider client={client}>
    {children}
  </ApolloProvider>
);

export default ApolloProviderComponent;
