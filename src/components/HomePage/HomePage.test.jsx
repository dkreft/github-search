import React, { useRef } from 'react'
import { mount } from 'enzyme'

import Head from 'next/head'

import HomePage from './HomePage'
import Input from './Input'
import UserSearchResults from './UserSearchResults'

import useLazyUserReposQuery from './lib/useLazyUserReposQuery'
import useLoadMore from './lib/useLoadMore'

import Styles from './styles.module.sass'

const mockRef = {
  current: {
    a: 1,
    focus: jest.fn(),
  },
}
jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useRef: jest.fn(() => mockRef),
}))

jest.mock('next/head')
jest.mock('./Input')
jest.mock('./UserSearchResults')
jest.mock('./lib/useLazyUserReposQuery')
jest.mock('./lib/useLoadMore')


describe('<HomePage />', () => {
  const data = { snap: 1 }
  const error = { message: 'aldfskasjf' }
  const fetchMore = jest.fn()
  const getUserRepos = jest.fn()
  const handleLoadMore = jest.fn()
  const loading = true

  def('component', () => mount(<HomePage />))

  beforeEach(() => {
    Head.mockImplementation(MockComponent)
    UserSearchResults.mockImplementation(MockComponent)

    useLoadMore.mockImplementation(() => handleLoadMore)
    useLazyUserReposQuery.mockImplementation(() => [
      getUserRepos,
      {
        data,
        error,
        fetchMore,
        loading,
      }
    ])
  })

  it('renders', () => {
    expect($component).toExist()
  })

  context('initialization', () => {
    beforeEach(() => $component)

    it('invokes `useLazyUserReposQuery`', () => {
      expect(useLazyUserReposQuery).toHaveBeenCalledWith()
    })

    it('invokes `useLoadMore` with the correct args', () => {
      expect(useLoadMore).toHaveBeenCalledWith({
        data,
        fetchMore,
      })
    })

    it('focuses on the input', () => {
      expect(mockRef.current.focus).toHaveBeenCalled()
    })
  })

  it('has the expected `className`', () => {
    // Have to use .childAt() because mount() is weird
    expect($component.childAt(0)).toHaveClassName(Styles.root)
  })

  it('contains the expected <Head>', () => {
    expect($component).toContainReact(
      <Head>
        <title>GURST</title>
      </Head>
    )
  })

  it('contains the correct <h1>', () => {
    expect($component).toContainReact(
      <h1 className="pageTitle">
        GitHub User Search
      </h1>
    )
  })

  describe('the input section', () => {
    subject(() => $component.find('.t-inputSection'))

    it('exists', () => {
      expect($subject).toExist()
    })

    it('has the expected user label markup', () => {
      expect($subject).toContainReact(
        <span className={ Styles.userLabel }>
          Username
        </span>
      )
    })

    describe('the <Input />', () => {
      subject(() => $subject.find(Input))

      it('exists', () => {
        expect($subject).toExist()
      })

      it('has the expected props', () => {
        expect($subject).toHaveProp({
          handleKeyPress: expect.any(Function),
          type: 'text',
        })
      })

      describe('the `handleKeyPress` prop', () => {
        const value = 'alsdkfjalsfj'

        def('key', () => void 0)

        subject(() => $subject.prop('handleKeyPress'))

        beforeEach(() => $subject({
          key: $key,
          value,
        }))

        context('when key is not `Enter`', () => {
          def('key', () => 'a')

          it('does not invoke `getUserRepos()`', () => {
            expect(getUserRepos).not.toHaveBeenCalled()
          })
        })

        context('when key is `Enter`', () => {
          def('key', () => 'Enter')

          it('invokes `getUserRepos()` with the correct args', () => {
            expect(getUserRepos).toHaveBeenCalledWith({
              variables: {
                login: value,
              },
            })
          })
        })
      })
    })
  })

  describe('the <UserSearchResults />', () => {
    subject(() => $component.find(UserSearchResults))

    it('exists', () => {
      expect($subject).toExist()
    })

    it('has the expected props', () => {
      expect($subject).toHaveProp({
        data,
        error,
        handleLoadMore,
        loading,
      })
    })
  })
})

function MockComponent() {
  return (
    <i></i>
  )
}
