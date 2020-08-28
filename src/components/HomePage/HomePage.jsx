import {
  useCallback,
  useEffect,
  useRef,
} from 'react'

import Head from 'next/head'
import { useLazyQuery, gql } from '@apollo/client'

import Input from './Input'

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
  const inputRef = useRef()

  const [
    getUserRepos,
    {
      loading,
      error,
      data,
    }
  ] = useLazyQuery(QUERY)

  const handleKeyPress = useCallback(({ value, key }) => {
    if ( key !== 'Enter' ) {
      return
    }

    getUserRepos({
      variables: {
        login: value,
      }
    })
  }, [getUserRepos])

  useEffect(() => {
    inputRef.current.focus()
  }, [])

  return (
    <div className={ Styles.container }>
      <Head>
        <title>Search GitHub</title>
      </Head>

      <main className={ Styles.main }>
        <div>
          Username:
          <Input
            type="text"
            handleKeyPress={ handleKeyPress }
            ref={ inputRef }
          />
        </div>
        {
          loading && (<p><b>Loading</b></p>)
        }
        {
          error && (<pre>ERROR: { JSON.stringify(error, '', 2) }</pre>)
        }
        <pre>
          { JSON.stringify(data, '', 2) }
        </pre>
      </main>
    </div>
  )
}
