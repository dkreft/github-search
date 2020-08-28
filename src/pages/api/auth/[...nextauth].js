/* eslint-disable no-process-env, new-cap */

import nextAuth from 'next-auth'
import Providers from 'next-auth/providers'

import * as callbacks from './lib/callbacks'


export default function handleRequest(req, res) {
  return nextAuth(req, res, {
    providers: [
      Providers.GitHub({
        clientId: process.env.NEXT_PUBLIC_GITHUB_ID,
        clientSecret: process.env.NEXT_PUBLIC_GITHUB_SECRET,
      }),
    ],
    callbacks,
  })
}
