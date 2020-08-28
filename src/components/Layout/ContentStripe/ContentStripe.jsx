import PropTypes from 'prop-types'

import Styles from './styles.module.sass'


/**
 * Sets a maximum width on content so that it does not
 * grow with the browser window indefinitely
 *
 * @param {Object} props
 * @param {Node} props.children
 * @param {String} [props.className]
 *
 * @returns {Node}
 */
export default function ContentStripe({ children, className }) {
  const classes = [Styles.root, className].join(' ')

  return (
    <div className={ classes }>
      <div className={ Styles.content }>
        { children }
      </div>
    </div>
  )
}

ContentStripe.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
}
