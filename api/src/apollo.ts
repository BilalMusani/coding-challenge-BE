import fetch from 'cross-fetch';
import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client/core';

export const apolloClient = new ApolloClient({
    link: new HttpLink({
        uri: `${process.env.NODE_APP_GRAPHQL_URL}`, fetch,
        credentials: 'same-origin', // Additional fetch() options like `credentials` or `headers`
    }),
    cache: new InMemoryCache()
});
