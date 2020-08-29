import React from 'react'
import { shallow } from 'enzyme'

import ErrorMessage from './ErrorMessage'

import Styles from './styles.module.sass'

jest.mock('lib/error-message-extractor', () => ({
  getMessageFromError: mockGetMessageFromError,
}))

describe('<ErrorMessage/>', () => {
  const className = 'alsdkfjalsdfj'

  def('error', () => void 0)

  subject(() => shallow(<ErrorMessage
    className={ className }
    error={ $error }
  />))

  context('when `error` is falsy', () => {
    def('error', () => '')

    it('renders nothing', () => {
      expect($subject).toBeEmptyRender()
    })
  })

  context('when `error` is truthy', () => {
    def('error', () => 'aldskfjfslajdf')

    it('renders the error message extracted by getMessageFromError()', () => {
      expect($subject).toIncludeText(mockGetMessageFromError($error))
    })

    it('has the correct `className`', () => {
      expect($subject).toHaveClassName(Styles.root)
      expect($subject).toHaveClassName(className)
    })
  })
})

function mockGetMessageFromError(error) {
  return `mockGMFE-${ error }`
}
