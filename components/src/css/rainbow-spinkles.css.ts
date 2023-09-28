import { createRainbowSprinkles, defineProperties } from 'rainbow-sprinkles'

import { commonVars, modeVars } from './theme.css'

const responsiveProperties = defineProperties({
  conditions: {
    base: {},
    xs: { '@media': 'screen and (min-width: 360px)' },
    sm: { '@media': 'screen and (min-width: 640px)' },
    md: { '@media': 'screen and (min-width: 768px)' },
    lg: { '@media': 'screen and (min-width: 1024px)' },
    xl: { '@media': 'screen and (min-width: 1280px)' },
  },
  defaultCondition: 'base',
  dynamicProperties: {
    display: true,
    flexDirection: true,
    flex: true,
    alignItems: true,
    justifyContent: true,
    gap: commonVars.space,
    padding: commonVars.space,
    paddingLeft: commonVars.space,
    paddingRight: commonVars.space,
    paddingTop: commonVars.space,
    paddingBottom: commonVars.space,
    height: true,
    borderRadius: commonVars.radii,
    borderColor: modeVars.color,
    borderStyle: true,
    fontFamily: commonVars.fonts,
    fontSize: commonVars.fontSizes,
    fontWeight: commonVars.fontWeights,
    lineHeight: commonVars.lineHeights,
    textAlign: true,
    zIndex: true,
    position: true,
    top: commonVars.space,
    left: commonVars.space,
    right: commonVars.space,
    bottom: commonVars.space,
    verticalAlign: true,
    margin: commonVars.space,
    marginBottom: commonVars.space,
    marginLeft: commonVars.space,
    marginRight: commonVars.space,
    marginTop: commonVars.space,
    width: commonVars.space,
  },
  staticProperties: {
    display: ['block', 'flex', 'inline-block', 'inline-flex'],
    borderWidth: {
      '1x': '1px',
      '2x': '2px',
      '3x': '3px',
    },
  },
  shorthands: {
    p: ['padding'],
    pl: ['paddingLeft'],
    pr: ['paddingRight'],
    pt: ['paddingTop'],
    pb: ['paddingBottom'],
    paddingX: ['paddingLeft', 'paddingRight'],
    paddingY: ['paddingTop', 'paddingBottom'],
    px: ['paddingLeft', 'paddingRight'],
    py: ['paddingTop', 'paddingBottom'],
    placeItems: ['alignItems', 'justifyContent'],
    typeSize: ['fontSize', 'lineHeight'],
    m: ['margin'],
    mr: ['marginRight'],
    ml: ['marginLeft'],
    mt: ['marginTop'],
    mb: ['marginBottom'],
    marginX: ['marginLeft', 'marginRight'],
    marginY: ['marginTop', 'marginBottom'],
    mx: ['marginLeft', 'marginRight'],
    my: ['marginTop', 'marginBottom'],
    size: ['height', 'width'],
  },
})

const interactiveProperties = defineProperties({
  conditions: {
    base: {},
    hover: { selector: '&:hover' },
    active: { selector: '&:active' },
  },
  defaultCondition: 'base',
  dynamicProperties: {
    color: modeVars.color,
    backgroundColor: modeVars.color,
    transform: true,
    transition: true,
    animation: true,
    filter: true,
    objectFit: true,
    transitionTimingFunction: commonVars.transitionTimingFunction,
    transitionDuration: commonVars.transitionDuration,
    transitionProperty: true,
  },
  shorthands: {
    bg: ['backgroundColor'],
  },
})

export const rainbowSprinkles = createRainbowSprinkles(
  responsiveProperties,
  interactiveProperties,
)

export type Sprinkles = Parameters<typeof rainbowSprinkles>[0]
