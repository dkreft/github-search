/* eslint-disable no-process-env, new-cap */

import nextAuth from 'next-auth'
import Providers from 'next-auth/providers'


export default function handleRequest(req, res) {
  return nextAuth(req, res, {
    providers: [
      Providers.GitHub({
        clientId: process.env.GITHUB_ID,
        clientSecret: process.env.GITHUB_SECRET
      }),
    ],
  })
}
