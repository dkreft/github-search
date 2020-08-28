import {
  signin,
  useSession,
} from 'next-auth/client'


export default function GateKeeper({ children }) {
  const [session, loading] = useSession()

  if ( session ) {
    return children
  }

  if ( !loading ) {
    signin()
  }

  return null
}
