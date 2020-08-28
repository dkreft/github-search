import {
  forwardRef,
  useCallback,
} from 'react'

import PropTypes from 'prop-types'
import classnames from 'classnames'

import Styles from './styles.module.sass'


function Input({ className, handleKeyPress, ...props }, ref) {
  const onKeyPress = useCallback((e) => {
    e.stopPropagation()

    const {
      key,
      target: {
        value,
      },
    } = e

    handleKeyPress({
      key,
      value,
    })
  }, [handleKeyPress])

  const _className = classnames(Styles.root, className)

  return (
    <input
      { ...props }
      className={ _className }
      onKeyPress={ onKeyPress }
      ref={ ref }
    />
  )
}

export default forwardRef(Input)

Input.propTypes = {
  className: PropTypes.string,
  handleKeyPress: PropTypes.func,
}
