import {
  signin,
  useSession,
} from 'next-auth/client'

import { shallow } from 'enzyme'

import GateKeeper from './GateKeeper'

jest.mock('next-auth/client')


describe('<GateKeeper />', () => {
  def('session', () => void 0)
  def('loading', () => void 0)

  subject(() => shallow(
    <GateKeeper>
      <ChildComp />
    </GateKeeper>
  ))

  beforeEach(() => {
    useSession.mockImplementation(() => {
      return [
        $session,
        $loading,
      ]
    })
  })

  it('renders', () => {
    expect($subject).toExist()
  })

  context('when the session is defined', () => {
    def('session', () => ({}))

    testRendersChildren()
  })

  context('when the session is not defined', () => {
    def('session', () => void 0)

    context('when the app is not loading', () => {
      def('loading', () => false)

      testRedirects()
    })

    context('when the app is loading', () => {
      def('loading', () => true)

      testRendersNull()
    })
  })

})

function testRendersChildren() {
  it('renders the children', () => {
    expect($subject).toContainReact(<ChildComp />)
  })
}

function testRedirects() {
  it('invokes the client `signin()` function', () => {
    $subject
    expect(signin).toHaveBeenCalled()
  })

  testRendersNull()
}

function testRendersNull() {
  it('is a null render', () => {
    expect($subject).toBeEmptyRender()
  })
}

function ChildComp() {
  return (
    <b>Hello</b>
  )
}
