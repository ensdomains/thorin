import { sprinkles } from '@/src/css/sprinkles.css'
import { recipe } from '@vanilla-extract/recipes'

const variants = {
  label: sprinkles({
    fontSize: 'extraSmall',
    lineHeight: 'extraSmall',
    fontWeight: 'normal',
  }),
  labelHeading: sprinkles({
    fontSize: 'small',
    lineHeight: 'small',
    fontWeight: 'normal',
  }),
  headingOne: sprinkles({
    fontSize: 'headingOne',
    lineHeight: 'headingOne',
    fontWeight: 'extraBold',
  }),
  headingTwo: sprinkles({
    fontSize: 'headingTwo',
    lineHeight: 'headingTwo',
    fontWeight: 'bold',
  }),
  headingThree: sprinkles({
    fontSize: 'headingThree',
    lineHeight: 'headingThree',
    fontWeight: 'bold',
  }),
  headingFour: sprinkles({
    fontSize: 'headingFour',
    lineHeight: 'headingFour',
    fontWeight: 'bold',
  }),
  extraLargeBold: sprinkles({
    fontSize: 'extraLarge',
    lineHeight: 'extraLarge',
    fontWeight: 'bold',
  }),
  extraLarge: sprinkles({
    fontSize: 'extraLarge',
    lineHeight: 'extraLarge',
    fontWeight: 'normal',
  }),
  largeBold: sprinkles({
    fontSize: 'large',
    lineHeight: 'large',
    fontWeight: 'bold',
  }),
  large: sprinkles({
    fontSize: 'large',
    lineHeight: 'large',
    fontWeight: 'normal',
  }),
  bodyBold: sprinkles({
    fontSize: 'body',
    lineHeight: 'body',
    fontWeight: 'bold',
  }),
  body: sprinkles({
    fontSize: 'body',
    lineHeight: 'body',
    fontWeight: 'normal',
  }),
  smallBold: sprinkles({
    fontSize: 'small',
    lineHeight: 'small',
    fontWeight: 'bold',
  }),
  small: sprinkles({
    fontSize: 'small',
    lineHeight: 'small',
    fontWeight: 'normal',
  }),
  extraSmallBold: sprinkles({
    fontSize: 'extraSmall',
    lineHeight: 'extraSmall',
    fontWeight: 'bold',
  }),
  extraSmall: sprinkles({
    fontSize: 'extraSmall',
    lineHeight: 'extraSmall',
    fontWeight: 'normal',
  }),
}

export const fontVariant = recipe({
  variants: {
    fontVariant: variants,
  },
})

export type FontVariant = keyof typeof variants
