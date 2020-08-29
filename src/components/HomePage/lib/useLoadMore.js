import { useCallback } from 'react'

import updateQuery from './updateQuery'

/**
 * @typedef {Object} Repositories
 * @property {Object} user
 * @property {Object} user.repositories
 * @property {Object} user.repositories.pageInfo
 * @property {String} user.repositories.pageInfo.nextCursor
 */

/**
 * A hook for creating a "load more" callback to get the next page of
 * user repositories.
 *
 * @param {Object} args
 * @param {Function} args.fetchMore
 * @param {Repositories} args.data
 *
 * @returns {Function}
 */
export default function useLoadMore({ fetchMore, data }) {
  return useCallback(() => {
    const {
      user: {
        repositories: {
          pageInfo,
        },
      },
    } = data

    fetchMore({
      variables: {
        nextCursor: pageInfo.endCursor,
      },
      updateQuery,
    })
  }, [fetchMore, data])
}

