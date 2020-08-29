import PropTypes from 'prop-types'

import Repositories from './Repositories'
import UserInfo from './UserInfo'

import Styles from './styles.module.sass'


export default function UserSearchResults({ data, loading, error }) {
  if ( loading ) {
    // TODO: put a spinner in here
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

  return (
    <div className={ Styles.root }>
      <UserInfo
        user={ user }
      />
      <Repositories
        repositories={ user.repositories }
      />
    </div>
  )
}

UserSearchResults.propTypes = {
  loading: PropTypes.bool,
  error: PropTypes.object,
  data: PropTypes.shape({
    user: PropTypes.shape({
      repositories: Repositories.propTypes.repositories,
    })
  })
}
