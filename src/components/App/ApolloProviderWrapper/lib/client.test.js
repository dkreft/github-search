import {
  ApolloClient,
  createHttpLink,
  InMemoryCache,
} from '@apollo/client'

import { setContext } from '@apollo/client/link/context'

import { makeClient } from './client'

jest.mock('@apollo/client')
jest.mock('@apollo/client/link/context')


describe('client', () => {
  describe('makeClient()', () => {
    const accessToken = 'qoweiasdfniasdfgkhugafdshf'
    const httpLink = { httpLink: 'asdlkajfladfjk' }
    const authLink = [
      'blarg',
    ]

    subject(() => makeClient(accessToken))

    beforeEach(() => {
      createHttpLink.mockImplementation(() => httpLink)
      setContext.mockImplementation(() => authLink)

      ApolloClient.mockImplementation((args) => ({
        __type: 'ApolloClient',
        ...args,
      }))
    })

    it('invokes createHttpLink() with the correct arguments', () => {
      $subject
      expect(createHttpLink).toHaveBeenCalledWith({
        uri: process.env.NEXT_PUBLIC_CLIENT_ENDPOINT,
      })
    })

    it('invokes `setContext()` with a function', () => {
      $subject
      expect(setContext).toHaveBeenCalledWith(expect.any(Function))
    })

    describe('the fn supplied to `setContext()`', () => {
      const headers = {
        a: 1,
        b: 2,
      }

      subject(() => {
        $subject

        const fn = setContext.mock.calls[0][0]

        return fn(null, { headers })
      })

      it('returns the expected object', () => {
        const authorization = `Bearer ${ accessToken }`

        expect($subject).toEqual({
          headers: {
            ...headers,
            authorization,
          },
        })
      })
    })

    it('returns the ApolloClient instance', () => {
      expect($subject).toEqual({
        __type: 'ApolloClient',
        link: authLink.concat(httpLink),
        cache: expect.any(InMemoryCache),
      })
    })
  })
})
