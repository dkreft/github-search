import PropTypes from 'prop-types'
import { ApolloProvider } from '@apollo/client'
import { useSession } from 'next-auth/client'

import { makeClient } from './lib/client'


export default function ApolloProviderWrapper({ children }) {
  const [session] = useSession()

  const client = makeClient(session.user.accessToken)

  return (
    <ApolloProvider client={ client }>
      { children }
    </ApolloProvider>
  )
}

ApolloProviderWrapper.propTypes = {
  children: PropTypes.node,
}
