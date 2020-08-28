import { shallow } from 'enzyme'

import App from './App'


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
})
