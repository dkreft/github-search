import {
  useSession,
  signOut
} from 'next-auth/client'

import Head from 'next/head'

import Styles from './styles.module.sass'


export default function HomePage() {
  const [session] = useSession()

  const {
    image,
    name,
  } = session.user

  return (
    <div className={ Styles.container }>
      <Head>
        <title>Search GitHub</title>
      </Head>

      <main className={ Styles.main }>
        <div>
          <img src={ image } alt="" />
          { name }
          <button onClick={ signOut }>
            Sign out
          </button>
        </div>

        Hello, World!
      </main>
    </div>
  )
}
