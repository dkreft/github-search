import nextAuth from 'next-auth'
import Providers from 'next-auth/providers'

import handleRequest from './[...nextauth]'
import * as callbacks from './lib/callbacks'

jest.mock('next-auth')
jest.mock('next-auth/providers')
jest.mock('./lib/callbacks')


describe('[...nextauth]', () => {
  const req = {
    path: 'ausaldkf/alsdfkjh',
  }
  const res = {
    content: 'afodlkfj',
  }

  subject(() => handleRequest(req, res))

  beforeEach(() => {
    nextAuth.mockImplementation(mockImpl)
    Providers.Credentials.mockImplementation(mockImpl)
  })

  it('returns the results from invoking nextAuth()', () => {
    expect($subject).toEqual(nextAuth(req, res, {
      providers: [
        Providers.GitHub({
          clientId: process.env.NEXT_PUBLIC_GITHUB_ID,
          clientSecret: process.env.NEXT_PUBLIC_GITHUB_SECRET,
        }),
      ],
      callbacks,
    }))
  })
})

function mockImpl(...args) {
  return JSON.stringify(args)
}
