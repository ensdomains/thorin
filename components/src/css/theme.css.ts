import {
  createGlobalTheme,
  createGlobalThemeContract,
} from '@vanilla-extract/css'

import { darkColors, lightColors } from '../tokens/color'
import { borderStyles, borderWidths, radii } from '../tokens/border'
import { space } from '../tokens/space'
import {
  fontSizes,
  fontWeights,
  fonts,
  letterSpacings,
  lineHeights,
} from '../tokens/typography'
import { opacity } from '../tokens/opacity'
import { shadows } from '../tokens/shadows'
import {
  transitionDuration,
  transitionTimingFunction,
} from '../tokens/transition'

import './global.css'

const getVarName = (_value: string | null, path: string[]) =>
  `thorin-${path.join('-').replace('.', '_').replace('/', '__')}`

const commonTokens = {
  fonts,
  fontSizes,
  fontWeights,
  lineHeights,
  letterSpacings,
  opacity,
  shadows,
  space,
  radii,
  borderWidths,
  borderStyles,
  transitionDuration,
  transitionTimingFunction,
}
export const commonVars = createGlobalThemeContract(commonTokens, getVarName)
createGlobalTheme(':root', commonVars, commonTokens)

const modeTokens = { color: lightColors }
export const modeVars = createGlobalThemeContract(modeTokens, getVarName)
createGlobalTheme('[data-theme="light"]', modeVars, modeTokens)
createGlobalTheme('[data-theme="dark"]', modeVars, { color: darkColors })

export const cssVars = { ...commonVars, ...modeVars }
