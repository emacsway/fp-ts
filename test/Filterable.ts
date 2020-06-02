import * as assert from 'assert'
import * as A from '../src/Array'
import * as _ from '../src/Filterable'
import { some, none } from '../src/Option'
import { right, left } from '../src/Either'
import { pipe } from '../src/function'

describe('Filterable', () => {
  it('filterComposition', () => {
    const filter = _.filterComposition(A.functorArray, A.filterableArray)
    assert.deepStrictEqual(
      pipe(
        [
          [1, 2],
          [3, 4]
        ],
        filter((a) => a > 1)
      ),
      [[2], [3, 4]]
    )
  })

  it('filterMapComposition', () => {
    const filterMap = _.filterMapComposition(A.functorArray, A.filterableArray)
    assert.deepStrictEqual(
      pipe(
        [
          ['a', 'bb'],
          ['ccc', 'dddd']
        ],
        filterMap((a) => (a.length > 1 ? some(a.length) : none))
      ),
      [[2], [3, 4]]
    )
  })

  it('partitionComposition', () => {
    const partition = _.partitionComposition(A.functorArray, A.filterableArray)
    assert.deepStrictEqual(
      pipe(
        [
          ['a', 'bb'],
          ['ccc', 'dddd']
        ],
        partition((a) => a.length % 2 === 0)
      ),
      {
        left: [['a'], ['ccc']],
        right: [['bb'], ['dddd']]
      }
    )
  })

  it('partitionMapComposition', () => {
    const partitionMap = _.partitionMapComposition(A.functorArray, A.filterableArray)
    assert.deepStrictEqual(
      pipe(
        [
          ['a', 'bb'],
          ['ccc', 'dddd']
        ],
        partitionMap((a) => (a.length % 2 === 0 ? right(a.length) : left(a)))
      ),
      {
        left: [['a'], ['ccc']],
        right: [[2], [4]]
      }
    )
  })
})
