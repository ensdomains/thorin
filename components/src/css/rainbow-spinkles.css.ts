import { createRainbowSprinkles, defineProperties } from 'rainbow-sprinkles'

import type { SprinklesFn } from 'rainbow-sprinkles/createRuntimeFn'

import { commonVars, modeVars } from './theme.css'

// TODO: Review order of properties. More specific properties should come last.
const responsiveProperties = defineProperties({
  conditions: {
    base: {},
    xs: { '@media': 'screen and (min-width: 360px)' },
    sm: { '@media': 'screen and (min-width: 640px)' },
    md: { '@media': 'screen and (min-width: 768px)' },
    lg: { '@media': 'screen and (min-width: 1024px)' },
    xl: { '@media': 'screen and (min-width: 1280px)' },
    hover: { selector: '&:hover' },
    active: { selector: '&:active' },
    readonly: { selector: '&:read-only' },
    checked: { selector: '&:checked' },
    disabled: { selector: '&:disabled' }, // keep this last, last has precedence
  },
  defaultCondition: 'base',
  dynamicProperties: {
    alignSelf: true,
    justifySelf: true,
    display: true,
    flexDirection: true,
    flex: true,
    flexShrink: true,
    flexGrow: true,
    flexBasis: commonVars.space,
    flexWrap: true,
    alignItems: true,
    justifyContent: true,
    gap: commonVars.space,
    gridTemplateColumns: true,
    padding: commonVars.space,
    paddingLeft: commonVars.space,
    paddingRight: commonVars.space,
    paddingTop: commonVars.space,
    paddingBottom: commonVars.space,
    height: commonVars.space,
    fontFamily: commonVars.fonts,
    fontSize: commonVars.fontSizes,
    fontStyle: true,
    fontFeatureSettings: true,
    fontWeight: commonVars.fontWeights,
    lineHeight: commonVars.lineHeights,
    textAlign: true,
    translate: true,
    textOverflow: true,
    zIndex: true,
    position: true,
    transform: true,
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
    overflowX: true,
    overflowY: true,
    overflowWrap: true,
    width: commonVars.space,
    maxWidth: commonVars.space,
    minWidth: commonVars.space,
    maxHeight: commonVars.space,
    minHeight: commonVars.space,
    whiteSpace: true,
    strokeWidth: commonVars.space,
    stroke: modeVars.color,
    outline: true,
    resize: true,
    textTransform: true,
    wordBreak: true,
    order: true,
    touchAction: true,
    color: modeVars.color,
    background: modeVars.color,
    backgroundColor: modeVars.color,
    backgroundImage: true,
    transition: true,
    boxShadow: true,
    visibility: true,
    appearance: true,
    boxSizing: true,
    animation: true,
    animationName: true,
    animationDuration: true,
    animationTimingFunction: true,
    animationDelay: true,
    animationIterationCount: true,
    animationDirection: true,
    filter: true,
    placeContent: true,
    maskImage: true,
    maskRepeat: true,
    maskPosition: true,
    border: true,
    borderWidth: commonVars.borderWidths,
    borderStyle: true,
    borderColor: modeVars.color,
    borderRadius: commonVars.radii,
    borderSpacing: true,
    borderLeft: true,
    borderRight: true,
    borderTop: true,
    borderBottom: true,
    borderBottomColor: modeVars.color,
    borderLeftColor: modeVars.color,
    borderRightColor: modeVars.color,
    borderTopColor: modeVars.color,
    borderTopLeftRadius: commonVars.radii,
    borderTopRightRadius: commonVars.radii,
    borderBottomLeftRadius: commonVars.radii,
    borderBottomRightRadius: commonVars.radii,
    objectFit: true,
    fill: true,
    cursor: true,
    opacity: true,
    pointerEvents: true,
    backdropFilter: true,
    transitionTimingFunction: commonVars.transitionTimingFunction,
    transitionDuration: commonVars.transitionDuration,
    transitionProperty: true,
  },
  shorthands: {
    bg: ['backgroundColor'],
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
    hw: ['height', 'width'],
    wh: ['width', 'height'],
    overflow: ['overflowX', 'overflowY'],
  },
})

export const rainbowSprinkles = createRainbowSprinkles(responsiveProperties) as SprinklesFn<[typeof responsiveProperties]>

export type Sprinkles = Parameters<typeof rainbowSprinkles>[0]
