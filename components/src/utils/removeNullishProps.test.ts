import { describe, it, expect } from 'vitest'

import { removeNullishProps } from './removeNullishProps'
import type { Color } from '../tokens/color'

describe('removeNullishProps', () => {
  it('should remove nullish props', () => {
    expect(removeNullishProps({ bg: 'red', color: null as unknown as Color })).toEqual({ bg: 'red' })
  })
})
