import PropTypes from 'prop-types'
import classnames from 'classnames'

import Styles from './styles.module.sass'


export default function Error({ className, error }) {
  if ( !error ) {
    return null
  }

  const _className = classnames(Styles.root, className)

  return (
    <div
      className={ _className }
      style={ Styles }
    >
      { error.message }
    </div>
  )
}

Error.propTypes = {
  className: PropTypes.string,
  error: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.string,
  ]),
}
