import PropTypes from 'prop-types'
import { Provider } from 'next-auth/client'

import Layout from 'components/Layout'

import ApolloProviderWrapper from './ApolloProviderWrapper'
import GateKeeper from './GateKeeper'


export default function App({ Component, pageProps }) {
  return (
    <Provider session={ pageProps.session }>
      <GateKeeper>
        <ApolloProviderWrapper>
          <Layout>
            <Component { ...pageProps } />
          </Layout>
        </ApolloProviderWrapper>
      </GateKeeper>
    </Provider>
  )
}

App.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.object,
}
