import { shallow } from 'enzyme'

import Repositories from './Repositories'
import UserInfo from './UserInfo'
import UserSearchResults from './UserSearchResults'

import Styles from './styles.module.sass'

jest.mock('./Repositories')
jest.mock('./UserInfo')


describe('<UserSearchResults />', () => {
  def('data', () => void 0)
  def('loading', () => void 0)
  def('error', () => void 0)

  subject(() => shallow(<UserSearchResults
    data={ $data }
    loading={ $loading }
    error={ $error }
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
    def('data', () => ({
      user: {
        foo: 'a;dsfksjf',
        repositories: {
          totalCount: 23,
          edges: [],
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
  })
})
