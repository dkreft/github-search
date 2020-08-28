import PropTypes from 'prop-types'
import { Provider } from 'next-auth/client'

import ApolloProviderWrapper from './ApolloProviderWrapper'
import GateKeeper from './GateKeeper'


export default function App({ Component, pageProps }) {
  return (
    <Provider session={ pageProps.session }>
      <GateKeeper>
        <ApolloProviderWrapper>
          <Component { ...pageProps } />
        </ApolloProviderWrapper>
      </GateKeeper>
    </Provider>
  )
}

App.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.object,
}
