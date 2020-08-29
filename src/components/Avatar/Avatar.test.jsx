import classnames from 'classnames'
import { shallow } from 'enzyme'

import Avatar from './Avatar'

import Styles from './styles.module.sass'


describe('<Avatar />', () => {
  const className = 'asdflaksdfjlj'
  const url = '/alsdfk/oweriut'

  subject(() => shallow(<Avatar
    className={ className }
    url={ url }
  />))

  it('renders', () => {
    expect($subject).toExist()
  })

  it('is an <img />', () => {
    expect($subject).toMatchSelector('img')
  })

  it('has the expected props', () => {
    expect($subject).toHaveProp({
      className: classnames(Styles.root, className),
      src: url,
      alt: '',
    })
  })
})
