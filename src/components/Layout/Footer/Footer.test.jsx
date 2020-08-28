import React from 'react'

import { shallow } from 'enzyme'

import Footer from './Footer'
import Styles from './styles.module.sass'

describe('<Footer />', () => {
  def('component', () => shallow(<Footer />))

  it('renders', () => {
    expect($component).toExist()
  })

  it('has the "root" className', () => {
    expect($component).toHaveClassName(Styles.root)
  })

  it('appears to contain a copyright notice', () => {
    expect($component.text()).toMatch(/Copyright © 2020 Daniel L\. Kreft/)
  })
})
