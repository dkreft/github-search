import PropTypes from 'prop-types'
import { ApolloProvider } from '@apollo/client'

import client from 'lib/client'


export default function App ({ Component, pageProps }) {
  return (
    <ApolloProvider client={ client }>
      <Component { ...pageProps } />
    </ApolloProvider>
  )
}

App.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.object,
}
