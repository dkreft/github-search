import PropTypes from 'prop-types'

import Styles from './styles.module.sass'


export default function RepositoryItem({ node }) {
  const {
    name,
    description,
    url,
  } = node

  return (
    <li className={ Styles.root }>
      <a
        className={ Styles.name }
        href={ url }
      >
        { name }
      </a>
      <div className={ Styles.description }>
        { description }
      </div>
    </li>
  )
}

RepositoryItem.propTypes = {
  node: PropTypes.shape({
    name: PropTypes.string,
    description: PropTypes.string,
    url: PropTypes.string,
  })
}
