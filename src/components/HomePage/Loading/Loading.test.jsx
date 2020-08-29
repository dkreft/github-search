import Loader from 'react-loader-spinner'

import { shallow } from 'enzyme'

import ErrorMessage from './ErrorMessage'
import Loading from './Loading'


describe('<Loading/>', () => {
  const className = 'qowerlkjjfh'

  def('isLoading', () => void 0)
  def('error', () => void 0)
  def('showChildrenOnError', () => void 0)
  def('children', () => void 0)

  subject(() => shallow(
    <Loading
      className={ className }
      isLoading={ $isLoading }
      error={ $error }
      showChildrenOnError={ $showChildrenOnError }
    >
      { $children }
    </Loading>
  ))

  context('when `isLoading` is true', () => {
    def('isLoading', () => true)

    describe('the <Loader />', () => {
      subject(() => $subject.find(Loader))

      it('exists', () => {
        expect($subject).toExist()
      })

      it('has the supplied `className`', () => {
        expect($subject).toHaveClassName(className)
      })
    })
  })

  context('when `isLoading` is false', () => {
    def('isLoading', () => false)

    context('when `error` is falsy', () => {
      def('error', () => '')

      context('when no children are given', () => {
        def('children', () => void 0)

        it('renders nothing', () => {
          expect($subject).toBeEmptyRender()
        })
      })

      context('when children are supplied', () => {
        def('children', () => <Content />)

        it('renders the children', () => {
          expect($subject).toContainReact($children)
        })

        it('does not render the spinner', () => {
          expect($subject).not.toContainMatchingElement(Loader)
        })
      })
    })

    context('when `error` is truthy', () => {
      def('error', () => ({
        foo: 'asdlkfjdalfxzkj',
      }))

      it('does not render the spinner', () => {
        expect($subject).not.toContainMatchingElement(Loader)
      })

      it('renders a <div> with the supplied `className`', () => {
        expect($subject).toMatchSelector(`div[className="${ className }"]`)
      })

      context('when `showChildrenOnError` is false', () => {
        def('showChildrenOnError', () => false)

        it('renders a <div> with the supplied `className`', () => {
          expect($subject).toMatchSelector(`div[className="${ className }"]`)
        })

        testErrorMessageContent()
      })

      context('when `showChildrenOnError` is true', () => {
        def('showChildrenOnError', () => true)

        it('does not render the spinner', () => {
          expect($subject).not.toContainMatchingElement(Loader)
        })

        context('when there are children', () => {
          def('children', () => <Content />)

          it('renders the children as the first element', () => {
            expect($subject.childAt(0)).toContainReact($children)
          })
        })

        testErrorMessageContent()

        it('does not render the supplied children', () => {
          expect($subject).not.toContainReact(<Content />)
        })
      })
    })
  })
})

function Content() {
  return (
    <div>Hello, World</div>
  )
}

function testErrorMessageContent() {
  describe('the <ErrorMessage /> child', () => {
    subject(() => $subject.find(ErrorMessage))

    it('exists', () => {
      expect($subject).toExist()
    })

    it('has the correct props', () => {
      expect($subject).toHaveProp({
        error: $error,
      })
    })
  })
}
