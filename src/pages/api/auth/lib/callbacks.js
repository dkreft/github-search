/**
 * @param {Object} token
 * @param {Object} user
 * @param {Object} account
 *
 * @returns {Promise}
 *
 * @see https://next-auth.js.org/configuration/callbacks#jwt-callback
 */
export function jwt(token, user, account) {
  if ( account ) {
    token.accessToken = account.accessToken
  }

  return Promise.resolve(token)
}


/**
 * @param {Object} sessionObj
 * @param {Object} token
 *
 * @returns {Promise}
 *
 * @see https://next-auth.js.org/configuration/callbacks#session-callback
 */
export function session(sessionObj, token) {
  sessionObj.user.accessToken = token.accessToken

  return Promise.resolve(sessionObj)
}
