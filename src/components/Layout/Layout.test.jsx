import { shallow } from 'enzyme'

import ContentStripe from './ContentStripe'

import Header from './Header'
import Footer from './Footer'
import Layout from './Layout'

import Styles from './styles.module.sass'

jest.mock('./ContentStripe')


describe('<Layout />', () => {
  def('children', () => [
    <FakeChild key="laskdfj" />,
  ])

  subject(() => shallow((
    <Layout>
      { $children }
    </Layout>
  )))

  it('has the "root" `className`', () => {
    expect($subject).toHaveClassName(Styles.root)
  })

  describe('the <header>', () => {
    subject(() => $subject.find('header'))

    it('exists', () => {
      expect($subject).toExist()
    })

    it('has the "header" `className`', () => {
      expect($subject).toHaveClassName(Styles.header)
    })

    it('contains a <Header /> wrapped in a <ContentStripe />', () => {
      expect($subject).toContainReact(
        <ContentStripe>
          <Header />
        </ContentStripe>
      )
    })
  })

  describe('the <main>', () => {
    subject(() => $subject.find('main'))

    it('exists', () => {
      expect($subject).toExist()
    })

    it('has the "main" `className`', () => {
      expect($subject).toHaveClassName(Styles.main)
    })

    describe('the following children', () => {
      subject(() => $subject.children())

      it('wraps the children in a <ContentStripe/>', () => {
        expect($subject).toContainReact(
          <ContentStripe>
            { $children }
          </ContentStripe>
        )
      })
    })
  })

  describe('the <footer>', () => {
    subject(() => $subject.find('footer'))

    it('exists', () => {
      expect($subject).toExist()
    })

    it('has the "footer" `className`', () => {
      expect($subject).toHaveClassName(Styles.footer)
    })

    it('contains a <Footer /> wrapped in a <ContentStripe />', () => {
      expect($subject).toContainReact(
        <ContentStripe>
          <Footer/>
        </ContentStripe>
      )
    })
  })
})

function FakeChild() {
  return ''
}
