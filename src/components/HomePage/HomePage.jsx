import Head from 'next/head'

import Styles from './styles.module.sass'


export default function HomePage() {
  return (
    <div className={ Styles.container }>
      <Head>
        <title>Search GitHub</title>
      </Head>

      <main className={ Styles.main }>
        Hello, World!
      </main>
    </div>
  )
}
