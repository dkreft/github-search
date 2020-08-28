import { shallow } from 'enzyme'
import { ApolloProvider } from '@apollo/client'
import { useSession } from 'next-auth/client'

import ApolloProviderWrapper from './ApolloProviderWrapper'

import { makeClient } from './lib/client'

jest.mock('@apollo/client')
jest.mock('next-auth/client')
jest.mock('./lib/client')


describe('<ApolloProviderWrapper />', () => {
  const client = 'alsdfkasdflkj'
  const session = {
    user: {
      name: 'adlskfjdfj',
    }
  }
  const child = (<Child />)

  subject(() => shallow(
    <ApolloProviderWrapper>
      { child }
    </ApolloProviderWrapper>
  ))

  beforeEach(() => {
    useSession.mockImplementation(() => [session])
    makeClient.mockImplementation(() => client)
  })

  it('renders', () => {
    expect($subject).toExist()
  })

  it('is an ApolloProvider', () => {
    expect($subject).toMatchSelector(ApolloProvider)
  })

  it('invokes `makeClient()` with the correct arguments', () => {
    $subject
    expect(makeClient).toHaveBeenCalledWith(session.user)
  })

  it('has the expected props', () => {
    expect($subject).toHaveProp({ client })
  })

  it('renders the children', () => {
    expect($subject).toContainReact(child)
  })
})

function Child() {
  return (
    <b>foo</b>
  )
}
