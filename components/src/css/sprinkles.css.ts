import { createSprinkles, defineProperties } from '@vanilla-extract/sprinkles'

import { commonVars, modeVars } from './theme.css'

const colorPropertiesObject = { ...modeVars.color, inherit: 'inherit', initial: 'initial', unset: 'unset', transparent: 'transparent', currentColor: 'currentColor', none: 'none' }

const colorProperties = defineProperties({
  conditions: {
    base: {},
    sm: { '@media': 'screen and (min-width: 640px)' }, // for tooltip
    hover: { selector: '&:hover' },
    active: { selector: '&:active' },
    readonly: { selector: '&:read-only' },
    checked: { selector: '&:checked' },
    disabled: { selector: '&:disabled' }, // keep this last, last has precedence
  },
  defaultCondition: 'base',
  properties: {
    color: colorPropertiesObject,
    fill: colorPropertiesObject,
    stroke: colorPropertiesObject,
    background: colorPropertiesObject,
    backgroundColor: colorPropertiesObject,
    borderColor: colorPropertiesObject,
    borderBottomColor: colorPropertiesObject,
    borderTopColor: colorPropertiesObject,
    borderLeftColor: colorPropertiesObject,
    borderRightColor: colorPropertiesObject,
    opacity: ['0', '1', '0.5', '0.7', '0.9', '0.95', '1', 'inherit', 'initial'],
  },
  shorthands: {
    bg: ['backgroundColor'],
  },
})

export const responsiveConditions = {
  base: {},
  xs: { '@media': 'screen and (min-width: 360px)' },
  sm: { '@media': 'screen and (min-width: 640px)' },
  md: { '@media': 'screen and (min-width: 768px)' },
  lg: { '@media': 'screen and (min-width: 1024px)' },
  xl: { '@media': 'screen and (min-width: 1280px)' },
} as const

const responsivePropeties = defineProperties({
  conditions: responsiveConditions,
  defaultCondition: 'base',
  properties: {
    alignSelf: ['flex-start', 'flex-end', 'center', 'stretch', 'baseline', 'inherit'],
    alignItems: ['flex-start', 'flex-end', 'center', 'stretch', 'normal', 'baseline', 'inherit'],
    justifySelf: ['flex-start', 'flex-end', 'center', 'stretch', 'baseline', 'inherit'],
    justifyContent: ['flex-start', 'flex-end', 'center', 'stretch', 'baseline', 'inherit', 'space-between'],
    placeContent: ['center', 'flex-start', 'flex-end', 'space-between', 'space-around', 'space-evenly', 'stretch', 'inherit'],
    display: ['none', 'block', 'flex', 'inline-block', 'grid', 'table', 'inherit', 'initial', 'inline'],
    flexDirection: ['row', 'row-reverse', 'column', 'column-reverse', 'inherit'],
    flex: [0, 1, '0 0 1px', 'auto', 'initial', 'none', 'inherit'],
    flexShrink: [0, 1, 2, 'inherit'],
    flexGrow: [0, 2, 'initial', 'unset', 'inherit'],
    flexBasis: commonVars.space,
    flexWrap: ['wrap', 'nowrap', 'wrap-reverse', 'initial', 'inherit'],
    gap: commonVars.space,
    top: commonVars.space,
    left: commonVars.space,
    right: commonVars.space,
    bottom: commonVars.space,
    height: commonVars.space,
    width: commonVars.space,
    maxWidth: commonVars.space,
    minWidth: commonVars.space,
    maxHeight: commonVars.space,
    minHeight: commonVars.space,
    margin: commonVars.space,
    marginBottom: commonVars.space,
    marginLeft: commonVars.space,
    marginRight: commonVars.space,
    marginTop: commonVars.space,
    padding: commonVars.space,
    paddingLeft: commonVars.space,
    paddingRight: commonVars.space,
    paddingTop: commonVars.space,
    paddingBottom: commonVars.space,
    borderRadius: commonVars.radii,
    borderBottomLeftRadius: commonVars.radii,
    borderBottomRightRadius: commonVars.radii,
    borderTopRightRadius: commonVars.radii,
    borderTopLeftRadius: commonVars.radii,
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
  },
})

const staticProperties = defineProperties({
  conditions: { base: {}, disabled: { selector: '&:disabled' }, readonly: { selector: '&:read-only' } },
  defaultCondition: 'base',
  properties: {
    textAlign: ['center', 'left', 'right', 'justify', 'initial', 'inherit'],
    fontFamily: { ...commonVars.fonts, inherit: 'inherit' },
    fontWeight: commonVars.fontWeights,
    fontSize: commonVars.fontSizes,
    lineHeight: commonVars.lineHeights,
    overflow: ['hidden', 'visible', 'scroll', 'auto', 'initial', 'inherit'],
    overflowX: ['hidden', 'visible', 'scroll', 'auto', 'initial', 'inherit'],
    overflowY: ['hidden', 'visible', 'scroll', 'auto', 'initial', 'inherit'],
    textOverflow: ['clip', 'ellipsis', 'initial', 'inherit'],
    whiteSpace: ['normal', 'nowrap', 'pre', 'pre-line', 'pre-wrap', 'initial', 'inherit'],
    textTransform: ['capitalize', 'uppercase', 'lowercase', 'none', 'initial', 'inherit'],
    borderWidth: commonVars.borderWidths,
    position: ['static', 'absolute', 'relative', 'fixed', 'sticky', 'initial', 'inherit'],
    cursor: ['default', 'pointer', 'not-allowed', 'text', 'initial', 'inherit', 'unset'],
    pointerEvents: ['none', 'auto', 'all', 'initial', 'inherit'],
    transitionTimingFunction: commonVars.transitionTimingFunction,
    transitionDuration: commonVars.transitionDuration,
    transitionProperty: ['all', 'none', 'box-shadow', 'background-color', 'transform', 'initial', 'inherit', 'stroke'],
    visibility: ['visible', 'hidden', 'initial', 'inherit'],
    zIndex: [1, 10, 20, 100, 9999, 10000, 999999],
    strokeWidth: commonVars.space,
    fontStyle: ['italic', 'normal', 'inherit'],
    boxSizing: ['border-box', 'content-box', 'inherit'],
    wordBreak: ['break-all', 'normal', 'inherit'],
    borderStyle: ['solid', 'none', 'inherit'],
    touchAction: ['auto', 'none', 'inherit', 'unset'],
    outline: ['none', 'initial', 'inherit'],
    resize: ['none', 'initial', 'inherit'],
  },
  shorthands: {
    typeSize: ['fontSize', 'lineHeight'],
  },
})

// TODO: Review order of properties. More specific properties should come last.
// const staticProperties = defineProperties({
//   conditions: {
//     hover: { selector: '&:hover' },
//   } as const,
//   defaultCondition: 'base',
//   properties: {
//     gap: commonVars.space,
//     gridTemplateColumns: true,
//     ,
//     fontSize: commonVars.fontSizes,
//     fontStyle: true,
//     fontFeatureSettings: true,
//     ,
//     lineHeight: commonVars.lineHeights,
//     textAlign: true,
//     translate: true,
//     textOverflow: true,
//     zIndex: true,
//     position: true,
//     transform: true,
//
//     verticalAlign: true,
//     overflowX: true,
//     overflowY: true,
//     overflowWrap: true,
//     width: commonVars.space,
//     whiteSpace: true,
//     strokeWidth: commonVars.space,
//     stroke: modeVars.color,
//     outline: true,
//     resize: true,
//     textTransform: true,
//     wordBreak: true,
//     order: true,
//     touchAction: true,
//     backgroundImage: true,
//     transition: true,
//     boxShadow: true,
//     visibility: true,
//     appearance: true,
//     boxSizing: true,
//     animation: true,
//     animationName: true,
//     animationDuration: true,
//     animationTimingFunction: true,
//     animationDelay: true,
//     animationIterationCount: true,
//     animationDirection: true,
//     filter: true,
//     placeContent: true,
//     maskImage: true,
//     maskRepeat: true,
//     maskPosition: true,
//     border: true,
//     borderWidth: commonVars.borderWidths,
//     borderStyle: true,
//     borderColor: modeVars.color,
//     borderSpacing: true,
//     borderLeft: true,
//     borderRight: true,
//     borderTop: true,
//     borderBottom: true,
//     borderBottomColor: modeVars.color,
//     borderLeftColor: modeVars.color,
//     borderRightColor: modeVars.color,
//     borderTopColor: modeVars.color,
//     borderTopLeftRadius: commonVars.radii,
//     borderTopRightRadius: commonVars.radii,
//     borderBottomLeftRadius: commonVars.radii,
//     borderBottomRightRadius: commonVars.radii,
//     objectFit: true,
//     fill: true,
//     cursor: true,
//     opacity: true,
//     pointerEvents: true,
//     backdropFilter: true,
//     transitionProperty: true,
//   },
//   shorthands: {

//     overflow: ['overflowX', 'overflowY'],
//   },
// })

export const sprinkles = createSprinkles(responsivePropeties, colorProperties, staticProperties)

export type Sprinkles = Parameters<typeof sprinkles>[0]
