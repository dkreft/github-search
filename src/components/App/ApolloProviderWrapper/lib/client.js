/* eslint-disable no-process-env */

import {
  ApolloClient,
  createHttpLink,
  InMemoryCache,
} from '@apollo/client'

import { setContext } from '@apollo/client/link/context'

const URI = process.env.NEXT_PUBLIC_CLIENT_ENDPOINT


/**
 * @param {String} accessToken
 *
 * @returns {ApolloClient}
 */
export function makeClient(accessToken) {
  const httpLink = createHttpLink({
    uri: URI,
  })

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
