import * as Callbacks from './callbacks'

describe('Callbacks', () => {
  const accessToken = 'qowerushagd'

  subject(() => Callbacks)

  describe('jwt()', () => {
    const user = null

    def('token', () => ({
      foo: 'alsdfkaj',
    }))
    def('account', () => void 0)

    subject(() => $subject.jwt($token, user, $account))

    context('when account is undefined', () => {
      def('account', () => void 0)

      it('resolves with the supplied token', () => {
        return expect($subject).resolves.toEqual($token)
      })
    })

    context('when account is defined', () => {
      def('account', () => ({ accessToken }))

      it('resolves with the token augmented with the accessToken', () => {
        const newToken = {
          ...$token,
          accessToken,
        }

        return expect($subject).resolves.toEqual(newToken)
      })
    })
  })

  describe('session()', () => {
    const session = {
      user: {
        foo: 'oqsiuh',
      }
    }
    const token = {
      accessToken,
    }

    subject(() => $subject.session(session, token))

    it('resolves with the session with an added `user.accessToken`', () => {
      const newSession = {
        ...session,
        user: {
          ...session.user,
          accessToken,
        }
      }

      return expect($subject).resolves.toEqual(newSession)
    })
  })
})
