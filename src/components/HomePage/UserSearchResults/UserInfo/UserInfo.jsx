import PropTypes from 'prop-types'

import Avatar from 'components/Avatar'

import Styles from './styles.module.sass'


export default function UserInfo({ user }) {
  const {
    avatarUrl,
    name,
    url,
  } = user

  return (
    <a
      className={ Styles.root }
      href={ url }
    >
      <Avatar
        className={ Styles.avatar }
        url={ avatarUrl }
      />
      { name }
    </a>
  )
}

UserInfo.propTypes = {
  user: PropTypes.shape({
    avatarUrl: PropTypes.string,
    name: PropTypes.string,
    url: PropTypes.string,
  })
}
