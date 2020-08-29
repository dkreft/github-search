import PropTypes from 'prop-types'

import LoadMoreButton from './LoadMoreButton'
import Repositories from './Repositories'
import UserInfo from './UserInfo'

import Styles from './styles.module.sass'


export default function UserSearchResults({ data, loading, error, handleLoadMore }) {
  if ( loading ) {
    // TODO: put a spinner in here
    return (
      <b>Loading...</b>
    )
  }

  if ( loading ) {
    return (
      <b>Loading...</b>
    )
  }

  if ( error ) {
    // TODO: make this pretty
    return (
      <pre>
        Error: { JSON.stringify(error, '', 2) }
      </pre>
    )
  }

  if ( !data) {
    return null
  }

  const { user } = data
  const { pageInfo } = user.repositories

  // TODO: It'd be a whole lot cooler to do an infinite scroll
  // instead of a "load more" button, but I'm going to KISS for
  // now so I can get this thing done.

  return (
    <div className={ Styles.root }>
      <UserInfo
        user={ user }
      />
      <Repositories
        repositories={ user.repositories }
      />
      <LoadMoreButton
        className={ Styles.loadMoreButton }
        hasMore={ pageInfo.hasNextPage }
        handleClick={ handleLoadMore }
      />
    </div>
  )
}

UserSearchResults.propTypes = {
  loading: PropTypes.bool,
  error: PropTypes.object,
  handleLoadMore: PropTypes.func,
  data: PropTypes.shape({
    user: PropTypes.shape({
      repositories: Repositories.propTypes.repositories,
    })
  })
}

