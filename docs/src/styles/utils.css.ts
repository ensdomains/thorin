// import { style } from '@vanilla-extract/css'

// import { atoms, vars } from '@ensdomains/thorin/css'
// import { tokens } from '@ensdomains/thorin'

// export const hoverParent = style({})
//
// export const hoverChild = style({
//   visibility: 'hidden',
//   selectors: {
//     [`${hoverParent}:hover &`]: {
//       visibility: 'visible',
//     },
//   },
// })
//
// export const iconGrid = style({
//   gridTemplateColumns: `repeat(auto-fit, minmax(${vars.space[18]}, 1fr))`,
//   '@media': {
//     [`screen and (min-width: ${tokens.breakpoints.md}px)`]: {
//       gridTemplateColumns: `repeat(auto-fit, minmax(${vars.space[20]}, 1fr))`,
//     },
//   },
// })
//
// export const link = style([
//   atoms({
//     color: 'accent',
//     cursor: 'pointer',
//   }),
//   style({
//     textDecoration: 'underline',
//     textDecorationColor: vars.colors.accent,
//     textUnderlineOffset: '0.2em',
//   }),
// ])
