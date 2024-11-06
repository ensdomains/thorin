import { describe, it, expect } from 'vitest'

import { getColorStyleParts } from './getColorStyleParts'

describe('getColorStyleParts', () => {
  it('should return the correct parts', () => {
    expect(getColorStyleParts('accentPrimary')).toEqual(['accent', 'Primary'])
    expect(getColorStyleParts('blueSecondary')).toEqual(['blue', 'Secondary'])
  })
})
