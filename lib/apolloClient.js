import { useMemo } from 'react';
import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client';

let apolloClient;

export const APOLLO_STATE_PROP_NAME = '__APOLLO_STATE__'

function createApolloClient() {
  return new ApolloClient({
    ssrMode: typeof window === 'undefined',
    // link: new HttpLink({
    //   uri: 'http://localhost:3000/api/graphql', // Server URL (must be absolute)
    //   credentials: 'same-origin', // Additional fetch() options like `credentials` or `headers`
    // }),
    uri: 'http://localhost:4000/graphql',
    cache: new InMemoryCache(),
    connectToDevTools: true,
  });
}

export function initializeApollo(initialState = null) {
  const _apolloClient = apolloClient ?? createApolloClient();

  if (initialState) {
    _apolloClient.cache.restore(initialState);
  }
  if (typeof window === 'undefined') {
    return _apolloClient;
  }
  if (!apolloClient) {
    apolloClient = _apolloClient;
  }
  return _apolloClient;
}

export function addApolloState(client, pageProps) {
  if (pageProps?.props) {
    pageProps.props[APOLLO_STATE_PROP_NAME] = client.cache.extract()
  }

  return pageProps
}

export function useApollo(initialState) {
  const store = useMemo(() => initializeApollo(initialState), [initialState]);
  return store;
}