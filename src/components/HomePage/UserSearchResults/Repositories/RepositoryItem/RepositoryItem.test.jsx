import { shallow } from 'enzyme'

import RepositoryItem from './RepositoryItem'

import Styles from './styles.module.sass'


describe('<RepositoryItem />', () => {
  const node = {
    name: 'adlsiruaweljrsfk',
    description: 'owetgha',
    url: 'htpasod',
  }

  subject(() => shallow(<RepositoryItem
    node={ node }
  />))

  it('renders', () => {
    expect($subject).toExist()
  })

  it('is an <li>', () => {
    expect($subject).toMatchSelector('li')
  })

  it('has the expected `className`', () => {
    expect($subject).toHaveClassName(Styles.root)
  })

  it('has the expected link markup', () => {
    expect($subject).toContainReact(
      <a className={ Styles.name } href={ node.url }>
        { node.name }
      </a>
    )
  })

  it('contains the expected description markup', () => {
    expect($subject).toContainReact(
      <div className={ Styles.description }>
        { node.description }
      </div>
    )
  })
})
