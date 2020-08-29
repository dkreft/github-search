/**
 * Augments the `prev` data with what is found in `fetchMoreResult`,
 * returning a new object.
 *
 * @param {Object} prev
 * @param {Object} args
 * @param {Object} args.fetchMoreResult
 *
 * @returns {Repositories}
 */
export default function updateQuery(prev, { fetchMoreResult }) {
  if ( !fetchMoreResult ) {
    return prev
  }

  const oldRepos = prev.user.repositories
  const newRepos = fetchMoreResult.user.repositories

  return {
    ...prev,
    user: {
      ...prev.user,
      repositories: {
        ...prev.user.repositories,
        edges: oldRepos.edges.concat(newRepos.edges),
        pageInfo: newRepos.pageInfo,
      }
    }
  }
}
