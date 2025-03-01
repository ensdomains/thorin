import { responsiveConditions, sprinkles } from '@/src/css/sprinkles.css'
import { scale } from '@/src/css/utils/common'
import { space } from '@/src/tokens/space'
import { createVar, style } from '@vanilla-extract/css'
import { recipe } from '@vanilla-extract/recipes'

export const closeButton = style({
  'transform': 'translateY(0)',
  ':hover': {
    transform: 'translateY(-1)',
  },
})

export const variants = recipe({
  variants: {
    alert: {
      info: style([sprinkles({
        backgroundColor: 'backgroundPrimary',
        color: 'text',
      }),
      ]),
      warning: sprinkles({
        backgroundColor: 'yellowPrimary',
        color: 'backgroundPrimary',
      }),
      error: sprinkles({
        backgroundColor: 'redPrimary',
        color: 'backgroundPrimary',
      }),
    },
    svgAlert: {
      info: style({
        transform: scale(1),
      }),
      warning: style({
        transform: scale(0.5),
      }),
      error: style({
        transform: scale(0.5),
      }),
    },
    stepType: {
      notStarted: sprinkles({
        borderWidth: '2x',
        borderColor: 'border',
        backgroundColor: 'none',
      }),
      inProgress: sprinkles({
        borderWidth: '2x',
        borderColor: 'accent',
        backgroundColor: 'none',
      }),
      completed: sprinkles({
        borderWidth: '2x',
        borderColor: 'accent',
        backgroundColor: 'accent',
      }),
    },
  },
})

export const styledCard = style({
  '@media': {
    [responsiveConditions.xs['@media']]: {
      maxHeight: '80vh',
    },
    [responsiveConditions.sm['@media']]: {
      maxHeight: `min(90vh, ${space[144]})`,
    },
  },
})

export const dialogContentMargin = createVar()
export const dialogContentWidth = createVar()
export const dialogContentWidthSm = createVar()
export const dialogContentMarginSm = createVar()
export const dialogContentMaxWidthSm = createVar()

export const dialogContent = style({
  'margin': dialogContentMargin,
  'width': dialogContentWidth,
  '@media': {
    [responsiveConditions.sm['@media']]: {
      width: dialogContentWidthSm,
      margin: dialogContentMarginSm,
      maxWidth: dialogContentMaxWidthSm,
    },
  },
})
