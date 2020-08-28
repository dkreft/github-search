import nextAuth from 'next-auth'
import Providers from 'next-auth/providers'

import handleRequest from './[...nextauth]'

jest.mock('next-auth')
jest.mock('next-auth/providers')

const ORIGINAL_ENV = { ...process.env }


describe('[...nextauth]', () => {
  const GITHUB_ID = 'qowslfdajhfgaoksdgjh'
  const GITHUB_SECRET = 'http://alfsdkfhj'

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

    process.env.GITHUB_ID = GITHUB_ID
    process.env.GITHUB_SECRET = GITHUB_SECRET
  })

  afterEach(() => {
    process.env = { ...ORIGINAL_ENV }
  })

  it('returns the results from invoking nextAuth()', () => {
    expect($subject).toEqual(nextAuth(req, res, {
      providers: [
        Providers.GitHub({
          clientId: process.env.GITHUB_ID,
          clientSecret: process.env.GITHUB_SECRET
        }),
      ],
    }))
  })
})

function mockImpl(...args) {
  return JSON.stringify(args)
}
