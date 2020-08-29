import {
  useCallback,
  useEffect,
  useState,
} from 'react'

import classnames from 'classnames'
import PropTypes from 'prop-types'

import Styles from './styles.module.sass'


export default function LoadMoreButton({ className, handleClick, hasMore }) {
  const [isLoading, setIsLoading] = useState(false)

  const onClick = useCallback((e) => {
    e.stopPropagation()

    handleClick()

    // This is a little hacky, but it seems to work. I'm not seeing an easy
    // way with Apollo to handle the 'isloading' state *only* when loading
    // more records.
    setIsLoading(true)
  }, [handleClick])

  useEffect(() => {
    setIsLoading(false)
  }, [handleClick])

  if ( !hasMore ) {
    return null
  }

  if ( isLoading ) {
    return (
      <b>Loading more...</b>
    )
  }

  const _className = classnames(Styles.root, className)

  return (
    <button
      className={ _className }
      onClick={ onClick }
    >
      Load more...
    </button>
  )
}

LoadMoreButton.propTypes = {
  handleClick: PropTypes.func.isRequired,

  className: PropTypes.string,
  hasMore: PropTypes.bool,
}
