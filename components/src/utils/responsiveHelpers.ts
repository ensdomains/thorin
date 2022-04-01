import { FlattenSimpleInterpolation, css } from 'styled-components'

import { breakpoints } from '@/src/tokens'

type Breakpoints = {
  sm: (...args: any[]) => FlattenSimpleInterpolation
  md: (...args: any[]) => FlattenSimpleInterpolation
  lg: (...args: any[]) => FlattenSimpleInterpolation
  xl: (...args: any[]) => FlattenSimpleInterpolation
}

type Accumulator = {
  sm?: (args: any) => FlattenSimpleInterpolation
  md?: (args: any) => FlattenSimpleInterpolation
  lg?: (args: any) => FlattenSimpleInterpolation
  xl?: (args: any) => FlattenSimpleInterpolation
}

const largerThanAccumulator = Object.keys(breakpoints).reduce(
  (accumulator: Accumulator, label): Accumulator => {
    const pxSize = breakpoints[label as keyof Accumulator]
    const newAcc = accumulator
    newAcc[label as keyof Accumulator] = (...args) => css`
      @media screen and (min-width: ${pxSize}px) {
        ${css(...args)}
      }
    `
    return newAcc
  },
  {},
)

export const largerThan = largerThanAccumulator as Breakpoints
