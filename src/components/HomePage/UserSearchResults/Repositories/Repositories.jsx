import PropTypes from 'prop-types'

import RepositoryItem from './RepositoryItem'


export default function Repositories({ repositories }) {
  const {
    edges,
    totalCount,
  } = repositories || {}

  const things = ( totalCount === 1 ) ? 'repository' : 'repositories'

  return (
    <>
      <p className="t-summary">
        Found { totalCount } { things }
      </p>
      { renderEdges(edges) }
    </>
  )
}

// TODO: I'm not really happy about how deep this object is.
// I looked for a way to implement a transform in the Apollo
// docs, but didn't see anything immediately relevant.
Repositories.propTypes = {
  repositories: PropTypes.shape({
    totalCount: PropTypes.number,
    edges: PropTypes.arrayOf(
      PropTypes.shape({
        node: PropTypes.shape({
          name: PropTypes.string,
          description: PropTypes.string,
          url: PropTypes.string,
        })
      }),
    ),
  }),
}

function renderEdges(edges) {
  if ( !edges || !edges.length ) {
    return null
  }

  const items = edges.map(({ node }, i) => (
    <RepositoryItem
      key={ i }
      node={ node }
    />
  ))

  return (
    <ol className="t-repos">
      { items }
    </ol>
  )
}
