/* eslint-disable no-process-env */

import {
  ApolloClient,
  createHttpLink,
  InMemoryCache,
} from '@apollo/client'

import { setContext } from '@apollo/client/link/context'


const httpLink = createHttpLink({
  uri: process.env.NEXT_PUBLIC_CLIENT_ENDPOINT,
});

export function makeClient(user) {
  const { accessToken } = user
  const authorization = `Bearer ${ accessToken }`

  const authLink = setContext((_, { headers }) => {
    return {
      headers: {
        ...headers,
        authorization,
      },
    }
  })

  return new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache()
  })
}
