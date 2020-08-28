
export default function UserSearchResults({ data, loading, error }) {
  if ( loading ) {
    return (
      <b>Loading...</b>
    )
  }

  if ( error ) {
    return (
      <pre>
        Error: ${ JSON.stringify(error, '', 2) }
      </pre>
    )
  }

  if ( !data ) {
    return null
  }

  return (
    <pre>
      { JSON.stringify(data, '', 2) }
    </pre>
  )
}
