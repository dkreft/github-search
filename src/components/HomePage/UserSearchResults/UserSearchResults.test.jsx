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

  subject(() => shallow(<UserSearchResults
    data={ $data }
    handleLoadMore={ handleLoadMore }
  />))

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
