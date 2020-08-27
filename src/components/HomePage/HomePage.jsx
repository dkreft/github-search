import Head from 'next/head'

import Styles from './styles.module.sass'


export default function HomePage() {
  return (
    <div className={ Styles.container }>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={ Styles.main }>
        Hello, World!
      </main>
    </div>
  )
}
