import { css } from 'styled-components'

import { breakpoints } from '../tokens'

type Breakpoint = 'xs' | 'sm' | 'md' | 'lg' | 'xl'
type BreakpointType = 'min' | 'max'

const breakpointTypes: Record<BreakpointType, string> = {
  min: 'min-width',
  max: 'max-width',
}

type MediaQuery = (args: ReturnType<typeof css>) => ReturnType<typeof css>

const keys = Object.keys(breakpoints) as Array<Breakpoint>
const typeKeys = Object.keys(breakpointTypes) as Array<BreakpointType>

export const mq = keys.reduce((acc, sizeLabel) => {
  acc[sizeLabel] = typeKeys.reduce((accumulator, typeLabel) => {
    accumulator[typeLabel] = ((args: ReturnType<typeof css>) => {
      const sizeValue =
        typeLabel === 'max'
          ? breakpoints[sizeLabel] - 1
          : breakpoints[sizeLabel]
      return css`
        @media (${breakpointTypes[typeLabel]}: ${sizeValue}px) {
          ${args};
        }
      `
    }) as MediaQuery
    return accumulator
  }, {} as Record<BreakpointType, MediaQuery>)
  return acc
}, {} as Record<Breakpoint, Record<BreakpointType, MediaQuery>>)
