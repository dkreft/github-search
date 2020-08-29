/* istanbul ignore file */

import {
  gql,
  useLazyQuery,
} from '@apollo/client'

const QUERY = gql(`
  query UserRepos($login: String!, $nextCursor: String) {
    user(login: $login) {
      id
      name
      avatarUrl
      url
      repositories(first: 20,
                   after: $nextCursor,
                   orderBy: {
                     field: NAME,
                     direction: ASC,
                   })
      {
        totalCount
        edges {
          node {
            name
            description
            url
          }
        }
        pageInfo {
          endCursor
          hasNextPage
          startCursor
        }
      }
    }
  }
`)

export default function useLazyUserReposQuery() {
  return useLazyQuery(QUERY)
}
