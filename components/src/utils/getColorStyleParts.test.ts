import { describe, it, expect } from 'vitest'
import { getBaseColorAndTheme } from './getBaseColorAndTheme'

describe('getBaseColorAndTheme', () => {
  it('should return accent and primary if valid colorStyle is provided', () => {
    const result = getBaseColorAndTheme('redPrimary')
    expect(result).toEqual(['red', 'Primary'])
  })

  it('should return accent and primary if invalid colorStyle is provided', () => {
    const result = getBaseColorAndTheme('invalidColorStyle')
    expect(result).toEqual(['accent', 'Primary'])
  })

  it.todo('add more cases such as empty string and test all current primary colors so that we know if things change')
})
