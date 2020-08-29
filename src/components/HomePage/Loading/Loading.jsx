import React from 'react'
import PropTypes from 'prop-types'
import Loader from 'react-loader-spinner'

import ErrorMessage from './ErrorMessage'

// N.B. NextJS requires that global stylesheets be loaded in pages/_app, so
// react-spinner-loader.css is included there.

import Styles from './styles.module.sass'

const LOADER_PROPS = {
  color: '#4921d0',
  height: 32,
  type: 'TailSpin',
  visible: true,
}


/**
 * Renders either a loading spinner, an error message,
 * or the supplied children if neither of the previous two
 * are truthy.
 *
 * May be used with or without children:
 *
 * @example
 *  <Loading isLoading error="no way!">
 *    <div>Hello, World</div>
 *  </Loading>
 *
 * @example
 *  <Loading isLoading error="foop!"/>
 *
 * @param {Object} props
 *
 * @returns {Node|null}
 */
export default function Loading(props) {
  const {
    className,
    isLoading,
    error,
    children,
    showChildrenOnError,
  } = props

  if ( isLoading ) {
    return (
      <Loader
        { ...LOADER_PROPS }
        className={ className }
      />
    )
  }

  if ( !error ) {
    if ( !children ) {
      return null
    }

    return (
      <div className={ className }>
        { children }
      </div>
    )
  }

  const renderedError = (
    <ErrorMessage
      error={ error }
    />
  )

  if ( showChildrenOnError ) {
    return (
      <div className={ className }>
        { children }
        <div className={ Styles.errorWithChildren }>
          { renderedError }
        </div>
      </div>
    )
  }

  return (
    <div className={ className }>
      { renderedError }
    </div>
  )
}

Loading.propTypes = {
  className: PropTypes.string,
  isLoading: PropTypes.bool,
  children: PropTypes.node,
  error: ErrorMessage.propTypes.error,
  /**
   * Normally, any error message will be displayed in lieu
   * of the children. Set this to true to show the error message
   * beneath the content.
   */
  showChildrenOnError: PropTypes.bool,
}

Loading.defaultProps = {
  children: null,
  showChildrenOnError: false,
}
