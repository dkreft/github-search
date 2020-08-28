/* eslint-disable no-process-env */

import {
  ApolloClient,
  InMemoryCache,
} from '@apollo/client'

export default new ApolloClient({
  uri: process.env.NEXT_PUBLIC_CLIENT_ENDPOINT,
  cache: new InMemoryCache(),
})
