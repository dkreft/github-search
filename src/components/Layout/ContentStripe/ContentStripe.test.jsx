import React from 'react'

import { shallow } from 'enzyme'

import ContentStripe from './ContentStripe'

import Styles from './styles.module.sass'

describe('<ContentStripe />', () => {
  def('component', () => shallow((
    <ContentStripe { ...$props }>
      <FakeKid />
    </ContentStripe>
  )))
  def('props', () => ({
    woeirua: 1,
    blskdf: 2,
    className: $className,
  }))
  def('className', () => void 0)

  describe('the `className` property', () => {
    subject(() => $component.prop('className'))

    context('when `className` is supplied', () => {
      def('className', () => 'weoridsd')

      it('contains Styles.root and the supplied className', () => {
        expect($subject).toEqual(`${ Styles.root } ${ $className }`)
      })
    })

    context('when no `className` is supplied', () => {
      def('className', () => void 0)

      it('is Styles.root', () => {
        expect($subject).toEqual(`${ Styles.root } `)
      })
    })
  })

  describe('the first child', () => {
    subject(() => $component.childAt(0))

    it('has the `content` className', () => {
      expect($subject).toHaveClassName(Styles.content)
    })

    it('contains the supplied children', () => {
      expect($subject).toContainExactlyOneMatchingElement(FakeKid)
    })
  })
})

function FakeKid(props) {
  return 'fake'
}
