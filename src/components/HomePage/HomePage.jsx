import {
  useCallback,
  useEffect,
  useRef,
} from 'react'

import Head from 'next/head'

import Input from './Input'
import UserSearchResults from './UserSearchResults'

import useLazyUserReposQuery from './lib/useLazyUserReposQuery'
import useLoadMore from './lib/useLoadMore'

import Styles from './styles.module.sass'


export default function HomePage() {
  const inputRef = useRef()

  const [
    getUserRepos,
    {
      data,
      error,
      fetchMore,
      loading,
    }
  ] = useLazyUserReposQuery()

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

  const handleLoadMore = useLoadMore({
    data,
    fetchMore,
  })

  useEffect(() => {
    inputRef.current.focus()
  }, [])

  return (
    <div className={ Styles.root }>
      <Head>
        <title>GURST</title>
      </Head>

      <h1 className="pageTitle">
        GitHub User Search
      </h1>

      <label className="t-inputSection">
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
        data={ data }
        error={ error }
        handleLoadMore={ handleLoadMore }
        loading={ loading }
      />
    </div>
  )
}
