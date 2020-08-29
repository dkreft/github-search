import { shallow } from 'enzyme'

import Avatar from 'components/Avatar'

import UserInfo from './UserInfo'

import Styles from './styles.module.sass'


describe('<UserInfo />', () => {
  const user = {
    avatarUrl: 'qoweiraslfdhjf',
    name: 'owi asdfl',
    url: 'httpadsjfh',
  }

  subject(() => shallow(<UserInfo
    user={ user }
  />))

  it('renders', () => {
    expect($subject).toExist()
  })

  it('is an <a>', () => {
    expect($subject).toMatchSelector('a')
  })

  it('has the expected props', () => {
    expect($subject).toHaveProp({
      className: Styles.root,
      href: user.url,
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
        url: user.avatarUrl,
      })
    })
  })

  it('contains the user name', () => {
    expect($subject).toIncludeText(user.name)
  })
})
