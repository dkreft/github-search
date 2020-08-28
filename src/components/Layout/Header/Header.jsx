import {
  signout,
  useSession,
} from 'next-auth/client'

import Styles from './styles.module.sass'


export default function Header() {
  const [session] = useSession()

  const {
    image,
    name,
  } = session.user

  return (
    <div className={ Styles.root }>
      <div className={ Styles.titleCell }>
        <span className={ Styles.titleText }>
          GURST (GitHub User Repository Search Thing)
        </span>
      </div>
      <div className={ Styles.centerCell }>
      </div>
      <div className={ Styles.rightCell }>
        <img
          alt=""
          className={ Styles.avatar }
          src={ image }
        />
        Hello, { name }.
        <button
          className={ Styles.logout }
          onClick={ onLogoutButtonClick }
        >
          Logout
        </button>
      </div>
    </div>
  )
}

function onLogoutButtonClick(e) {
  e.stopPropagation()

  signout()
}

