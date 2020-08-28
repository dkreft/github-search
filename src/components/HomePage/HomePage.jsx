import {
  useCallback,
  useEffect,
  useRef,
} from 'react'

import Head from 'next/head'
import { useLazyQuery, gql } from '@apollo/client'

import Input from './Input'
import UserSearchResults from './UserSearchResults'

import Styles from './styles.module.sass'

const QUERY = gql(`
  query UserRepos($login: String!) {
    user(login: $login) {
      id
      name
      avatarUrl
      url
      repositories(last: 100) {
        edges {
          node {
            name
            description
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
        <title>GURST</title>
      </Head>

      <h1 className="pageTitle">
        GitHub User Search
      </h1>

      <label>
        <span className={ Styles.userLabel }>
          Username
        </span>
        <Input
          type="text"
          handleKeyPress={ handleKeyPress }
          ref={ inputRef }
        />
      </label>

      <UserSearchResults
        loading={ loading }
        error={ error }
        data={ data }
      />
    </div>
  )
}
