import { css } from 'styled-components'

import { mq } from './responsiveHelpers'
import { breakpoints } from '../tokens'

describe('mq', () => {
  const sizeEntries = Object.entries(breakpoints) as [
    keyof typeof breakpoints,
    number,
  ][]

  it('should output the correct min value', () => {
    sizeEntries.forEach(([sizeLabel, sizeValue]) => {
      const minValue = mq[sizeLabel]
        .min(css``)
        .filter((value) => typeof value === 'string')
        .join('')
      expect(minValue.indexOf(`@media (min-width: ${sizeValue}px)`)).not.toBe(
        -1,
      )
    })
  })

  it('should output the correct max value', () => {
    sizeEntries.forEach(([sizeLabel, sizeValue]) => {
      const maxValue = mq[sizeLabel]
        .max(css``)
        .filter((value) => typeof value === 'string')
        .join('')
      expect(
        maxValue.indexOf(`@media (max-width: ${sizeValue - 1}px)`),
      ).not.toBe(-1)
    })
  })
})
