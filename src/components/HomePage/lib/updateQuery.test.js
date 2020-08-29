import updateQuery from './updateQuery'


describe('updateQuery()', () => {
  const prev = {
    user: {
      name: 'the old name',
      repositories: {
        oldStuff: 'asdlfkfj',
        edges: ['old edge'],
        pageInfo: {
          // The actual payload of this object is irrelevant to this test
          pageNumber: 1,
        },
      }
    }
  }

  def('fetchMoreResult', () => void 0)

  subject(() => updateQuery(prev, {
    fetchMoreResult: $fetchMoreResult,
  }))

  context('when `fetchMoreResult` is undefined', () => {
    def('fetchMoreResult', () => void 0)

    it('returns the previous data', () => {
      expect($subject).toBe(prev)
    })
  })

  context('when `fetchMoreResult` is defined', () => {
    def('fetchMoreResult', () => ({
      user: {
        name: 'a new name',
        repositories: {
          newStuff: 'alsdkfj',
          edges: ['new edge'],
          pageInfo: {
            pageNumber: 2,
          }
        }
      }
    }))

    it('returns a new object', () => {
      expect($subject).not.toBe(prev)
      expect($subject).not.toBe($fetchMoreResult)
    })

    it('still has the old user info in it', () => {
      expect($subject.user.name).toEqual(prev.user.name)
    })

    describe('.user', () => {
      subject(() => $subject.user)

      it('is a new object', () => {
        expect($subject).not.toBe(prev.user)
        expect($subject).not.toBe($fetchMoreResult.user)
      })

      describe('.repositories', () => {
        subject(() => $subject.repositories)

        it('is a new object', () => {
          expect($subject).not.toBe(prev.user.repositories)
        })

        it('has the old repository info', () => {
          expect($subject.oldStuff).toBe(prev.user.repositories.oldStuff)
        })

        describe('.edges', () => {
          subject(() => $subject.edges)

          it('is a concatenated list', () => {
            expect($subject).toEqual([].concat(
              prev.user.repositories.edges,
              $fetchMoreResult.user.repositories.edges
            ))
          })
        })

        describe('.pageInfo', () => {
          subject(() => $subject.pageInfo)

          it('is the new value', () => {
            expect($subject).toBe($fetchMoreResult.user.repositories.pageInfo)
          })
        })
      })
    })
  })
})
