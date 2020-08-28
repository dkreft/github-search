import { Provider } from 'next-auth/client'
import { shallow } from 'enzyme'

import ApolloProviderWrapper from './ApolloProviderWrapper'
import App from './App'
import GateKeeper from './GateKeeper'

jest.mock('next-auth/client')
jest.mock('./ApolloProviderWrapper')
jest.mock('./GateKeeper')


describe('<App />', () => {
  const Component = () => (<b>Hello</b>)
  const session = {
    stuff: 'things',
  }
  const pageProps = {
    session,
    foo: 1,
    bar: 2,
  }

  subject(() => shallow(<App
    Component={ Component }
    pageProps={ pageProps }
  />))

  it('renders', () => {
    expect($subject).toExist()
  })

  describe('the <Provider />', () => {
    subject(() => $subject.find(Provider))

    it('exists', () => {
      expect($subject).toExist()
    })

    it('has the expected props', () => {
      expect($subject).toHaveProp({
        session,
      })
    })

    describe('the <GateKeeper />', () => {
      subject(() => $subject.find(GateKeeper))

      it('exists', () => {
        expect($subject).toExist()
      })

      describe('the <ApolloProviderWrapper />', () => {
        subject(() => $subject.find(ApolloProviderWrapper))

        it('exists', () => {
          expect($subject).toExist()
        })

        it('has the expected children', () => {
          expect($subject.children()).toContainReact(
            <Component { ...pageProps } />
          )
        })
      })
    })
  })
})
