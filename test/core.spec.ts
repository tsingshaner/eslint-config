import { add } from '@/core'

import { describe } from 'vitest'

describe('test core', (test) => {
  test('add function', ({ expect }) => {
    const res = add(1, 2)

    expect(res).toBe(3)
  })
})
