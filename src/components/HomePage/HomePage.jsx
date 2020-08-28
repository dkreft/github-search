import { useCallback } from 'react'
import Head from 'next/head'
import { useLazyQuery, gql } from '@apollo/client'

import Styles from './styles.module.sass'

const QUERY = gql(`
  query UserRepos($login: String!) {
    user(login: $login) {
      id
      name
      repositories(last: 100) {
        edges {
          node {
            name
            url
          }
        }
        pageInfo {
          endCursor
          startCursor
        }
      }
    }
  }
`)

export default function HomePage() {
  const [
    getUserRepos,
    {
      loading,
      error,
      data,
    }
  ] = useLazyQuery(QUERY)

  const onKeyPress = useCallback((e) => {
    e.stopPropagation()

    const {
      target: {
        value: login,
      },
      key,
    } = e

    if ( key !== 'Enter' ) {
      return
    }

    console.log({ login })

    console.log('calling getUserRepos...', getUserRepos)
    getUserRepos({
      variables: {
        login,
      }
    })
  }, [getUserRepos])

  console.log({ data })
  
  return (
    <div className={ Styles.container }>
      <Head>
        <title>Search GitHub</title>
      </Head>

      <main className={ Styles.main }>
        Username:
        <input
          type="text"
          onKeyPress={ onKeyPress }
        />
        {
          loading && (<p><b>Loading</b></p>)
        }
        {
          error && (<pre>ERROR: { JSON.stringify(error, '', 2) }</pre>)
        }
        <pre>
          { JSON.stringify(data) }
        </pre>
      </main>
    </div>
  )
}
