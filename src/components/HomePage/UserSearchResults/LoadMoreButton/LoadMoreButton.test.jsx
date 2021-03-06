import { mount } from 'enzyme'

import Loading from '../../Loading'

import LoadMoreButton from './LoadMoreButton'

import Styles from './styles.module.sass'

jest.mock('../../Loading', () => ({
  __esModule: true,
  // eslint-disable-next-line react/prop-types
  default: ({ children }) => (<div>{ children }</div>),
}))


describe('<LoadMoreButton />', () => {
  const className = 'asdflqwer'

  def('handleClick', () => jest.fn())
  def('hasMore', () => void 0)
  def('component', () => mount(<LoadMoreButton
    className={ className }
    handleClick={ $handleClick }
    hasMore={ $hasMore }
  />))

  context('when `hasMore` is false', () => {
    def('hasMore', () => false)

    it('renders nothing', () => {
      expect($component).toBeEmptyRender()
    })
  })

  context('when `hasMore` is true', () => {
    def('hasMore', () => true)

    it('renders', () => {
      expect($component).toExist()
    })

    describe('the <Loading />', () => {
      subject(() => $component.find(Loading))

      it('exists', () => {
        expect($subject).toExist()
      })

      it('has the expected props', () => {
        expect($subject).toHaveProp({
          isLoading: false,
        })
      })

      describe('the <button>', () => {
        subject(() => $subject.find('button'))

        it('exists', () => {
          expect($subject).toExist()
        })

        it('has the expected `className`', () => {
          expect($subject).toHaveClassName(Styles.root)
          expect($subject).toHaveClassName(className)
        })

        it('has the expected text', () => {
          expect($subject).toHaveText('Load more...')
        })

        describe('the `onClick` prop', () => {
          def('e', () => ({
            stopPropagation: jest.fn(),
          }))

          subject(() => $subject.invoke('onClick'))

          beforeEach(() => $subject($e))

          it('stops event propagation', () => {
            expect($e.stopPropagation).toHaveBeenCalled()
          })

          it('cases the component to re-render a loading message', () => {
            expect($component.find(Loading)).toHaveProp({
              isLoading: true,
            })
          })
        })
      })
    })
  })
})
