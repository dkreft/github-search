import React from 'react'
import {
  signout,
  useSession,
} from 'next-auth/client'

import { shallow } from 'enzyme'

import Avatar from 'components/Avatar'

import Header from './Header'

import Styles from './styles.module.sass'

jest.mock('next-auth/client')


describe('<Header />', () => {
  const name = 'Foo Bar'
  const image = 'http://fo.asdfaldfs.com'
  const session = {
    user: {
      image,
      name,
    }
  }

  subject(() => shallow(<Header />))

  beforeEach(() => {
    useSession.mockImplementation(() => [session])
  })

  it('renders', () => {
    expect($subject).toExist()
  })

  it('has the "root" className', () => {
    expect($subject).toHaveClassName(Styles.root)
  })

  describe('the first child', () => {
    subject(() => $subject.childAt(0))

    it('has the "titleCell" className', () => {
      expect($subject).toHaveClassName(Styles.titleCell)
    })

    it('contains the expected markup', () => {
      expect($subject).toContainReact(
        <span className={ Styles.titleText }>
          GURST (GitHub User Repository Search Thing)
        </span>
      )
    })
  })

  describe('the second child', () => {
    subject(() => $subject.childAt(1))

    it('has the "centerCell" className', () => {
      expect($subject).toHaveClassName(Styles.centerCell)
    })
  })

  describe('the third child', () => {
    subject(() => $subject.childAt(2))

    it('has the "rightCell" className', () => {
      expect($subject).toHaveClassName(Styles.rightCell)
    })

    describe('the logout button', () => {
      subject(() => $subject.find('button'))

      it('exists', () => {
        expect($subject).toExist()
      })

      it('has the expected `className`', () => {
        expect($subject).toHaveClassName(Styles.logout)
      })

      context('when clicked', () => {
        def('e', () => ({
          stopPropagation: jest.fn(),
        }))

        beforeEach(() => {
          $subject.prop('onClick')($e)
        })

        it('invokes `stopPropagation()` on the event', () => {
          expect($e.stopPropagation).toHaveBeenCalled()
        })

        it('invokes `handleLogoutButtonClick` callback', () => {
          expect(signout).toHaveBeenCalled()
        })
      })
    })

    describe('the <Avatar />', () => {
      subject(() => $subject.find(Avatar))

      it('exists', () => {
        expect($subject).toExist()
      })

      it('has the expected props', () => {
        expect($subject).toHaveProp({
          className: Styles.avatar,
          url: image,
        })
      })
    })

    it('greets the user by name', () => {
      expect($subject).toIncludeText(`Hello, ${ name }`)
    })
  })
})
