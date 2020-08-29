import { shallow } from 'enzyme'

import useLoadMore from './useLoadMore'
import updateQuery from './updateQuery'


describe('useLoadMore()', () => {
  const fetchMore = jest.fn()
  const endCursor = 'aosdjhagkjhg'
  const data = {
    user: {
      repositories: {
        pageInfo: {
          endCursor,
        },
      },
    },
  }

  def('component', () => shallow(<TestComponent
    data={ data }
    fetchMore={ fetchMore }
  />))

  subject(() => $component.prop('onClick'))

  beforeEach(() => $subject())

  it('invokes `fetchMore` with the correct arguments', () => {
    expect(fetchMore).toHaveBeenCalledWith({
      variables: {
        nextCursor: endCursor,
      },
      updateQuery,
    })
  })
})

function TestComponent({ fetchMore, data }) {
  const handleLoadMore = useLoadMore({
    fetchMore,
    data,
  })

  return (
    <button onClick={ handleLoadMore }>
      test
    </button>
  )
}
