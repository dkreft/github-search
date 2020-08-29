import classnames from 'classnames'
import PropTypes from 'prop-types'

import Styles from './styles.module.sass'


export default function Avatar({ className, url }) {
  const _className = classnames(Styles.root, className)

  return (
    <img
      className={ _className }
      src={ url }
      alt=""
    />
  )
}

Avatar.propTypes = {
  url: PropTypes.string.isRequired,

  className: PropTypes.string,
}
