import PropTypes from 'prop-types'

import ContentStripe from './ContentStripe'
import Header from './Header'
import Footer from './Footer'

import Styles from './styles.module.sass'


export default function Layout({ children }) {
  return (
    <div className={ Styles.root }>
      <header className={ Styles.header }>
        <ContentStripe>
          <Header />
        </ContentStripe>
      </header>
      <main className={ Styles.main }>
        <ContentStripe>
          { children }
        </ContentStripe>
      </main>
      <footer className={ Styles.footer }>
        <ContentStripe>
          <Footer />
        </ContentStripe>
      </footer>
    </div>
  )
}

Layout.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ])
}
