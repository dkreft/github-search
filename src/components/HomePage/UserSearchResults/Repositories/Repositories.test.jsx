import { shallow } from 'enzyme'

import Repositories from './Repositories'
import RepositoryItem from './RepositoryItem'


describe('<Repositories />', () => {
  const edges = [
    {
      node: {
        name: 'repo1',
      }
    },
    {
      node: {
        name: 'repo2',
      }
    }
  ]

  def('edges', () => void 0)
  def('totalCount', () => void 0)
  def('repositories', () => ({
    edges: $edges,
    totalCount: $totalCount,
  }))

  subject(() => shallow(<Repositories
    repositories={ $repositories }
  />))


  it('renders', () => {
    expect($subject).toExist()
  })

  describe('the summary', () => {
    subject(() => $subject.find('.t-summary'))

    it('exists', () => {
      expect($subject).toExist()
    })

    context('when the `totalCount` is 0', () => {
      def('totalCount', () => 0)

      it('contains the correct text', () => {
        expect($subject).toHaveText(
          `Found ${ $totalCount } repositories`
        )
      })
    })

    context('when the `totalCount` is 1', () => {
      def('totalCount', () => 1)

      it('contains the correct text', () => {
        expect($subject).toHaveText(
          `Found ${ $totalCount } repository`
        )
      })
    })

    context('when the `totalCount` > 1', () => {
      def('totalCount', () => 10)

      it('contains the correct text', () => {
        expect($subject).toHaveText(
          `Found ${ $totalCount } repositories`
        )
      })
    })
  })

  describe('the repo list', () => {
    subject(() => $subject.find('.t-repos'))

    context('when `edges` is undefined', () => {
      def('edges', () => void 0)

      it('does not exist', () => {
        expect($subject).not.toExist()
      })
    })

    context('when `edges` is empty', () => {
      def('edges', () => [])

      it('does not exist', () => {
        expect($subject).not.toExist()
      })
    })

    context('when `edges` is non-empty', () => {
      def('edges', () => edges)

      it('exists', () => {
        expect($subject).toExist()
      })

      it('contains one <RepositoryItem /> per edge', () => {
        $edges.forEach(({ node }, i) => {
          expect($subject.childAt(i)).toContainReact(
            <RepositoryItem
              node={ node }
            />
          )
        })
      })
    })
  })
})
