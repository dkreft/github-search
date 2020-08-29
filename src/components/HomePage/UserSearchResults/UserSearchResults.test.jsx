import { shallow } from 'enzyme'

import LoadMoreButton from './LoadMoreButton'
import Repositories from './Repositories'
import UserInfo from './UserInfo'
import UserSearchResults from './UserSearchResults'

import Styles from './styles.module.sass'

jest.mock('./Repositories')
jest.mock('./UserInfo')


describe('<UserSearchResults />', () => {
  const handleLoadMore = jest.fn()

  def('data', () => void 0)
  def('loading', () => void 0)
  def('error', () => void 0)

  subject(() => shallow(<UserSearchResults
    data={ $data }
    loading={ $loading }
    error={ $error }
    handleLoadMore={ handleLoadMore }
  />))

  context('when `loading` is true', () => {
    def('loading', () => true)

    it('renders a loading message', () => {
      expect($subject).toContainReact(
        <b>Loading...</b>
      )
    })
  })

  context('when `error` is defined', () => {
    def('error', () => ({ message: 'foo' }))

    it('dumps the pre-formated JSON', () => {
      expect($subject).toContainReact(
        <pre>
          Error: { JSON.stringify($error, '', 2) }
        </pre>
      )
    })
  })

  context('when `data` is undefined', () => {
    def('data', () => void 0)

    it('renders null', () => {
      expect($subject).toBeEmptyRender()
    })
  })

  context('when `data` is defined', () => {
    const pageInfo = {
      hasNextPage: true,
    }

    def('data', () => ({
      user: {
        foo: 'a;dsfksjf',
        repositories: {
          totalCount: 23,
          edges: [],
          pageInfo,
        }
      },
    }))

    it('renders', () => {
      expect($subject).toExist()
    })

    it('renders a <div>', () => {
      expect($subject).toMatchSelector('div')
    })

    it('has the expected `className`', () => {
      expect($subject).toHaveClassName(Styles.root)
    })

    it('contains the expected <UserInfo />', () => {
      expect($subject).toContainReact(
        <UserInfo user={ $data.user } />
      )
    })

    it('contains the expected <Repositories />', () => {
      expect($subject).toContainReact(
        <Repositories
          repositories={ $data.user.repositories }
        />
      )
    })

    it('contains the expected <LoadMoreButton />', () => {
      expect($subject).toContainReact(
        <LoadMoreButton
          className={ Styles.loadMoreButton }
          hasMore={ pageInfo.hasNextPage }
          handleClick={ handleLoadMore }
        />
      )
    })
  })
})
