import { colors } from '@/src/tokens/color'

import {
  Color,
  colorMap,
  getColor,
  getColorStyle,
} from './withColorOrColorStyle'

const theme = {
  colors: colors.light,
} as any

const colorMapKeys = Object.keys(colorMap).filter(
  (color) => color != 'raw' && color != 'gradients',
) as Color[]

const gradientKeys = Object.keys(colors.light.gradients)

describe('WithColor', () => {
  colorMapKeys.forEach((color) => {
    it('should resolve ' + color + ' to a string', () => {
      const attribute = getColor(theme, color as any)
      expect(typeof attribute).toBe('string')
    })
  })

  gradientKeys.forEach((color) => {
    it('should resolve ' + color + ' to a string', () => {
      const attribute = getColor(theme, color as any)
      expect(typeof attribute).toBe('string')
    })
  })
})

const colorStyleColors = [
  'accent',
  'blue',
  'indigo',
  'purple',
  'pink',
  'red',
  'orange',
  'yellow',
  'green',
  'teal',
  'grey',
]

const specialColorStyles = ['transparent', 'disabled']

const attributes = ['background', 'border', 'text', 'hover', 'hoverFilter']

describe('WithColorStyle', () => {
  colorStyleColors.forEach((color) => {
    attributes.forEach((attribute) => {
      it(
        'should resolve ' + color + 'Primary ' + attribute + ' to a string',
        () => {
          const value = getColorStyle(
            theme,
            `${color}Primary` as any,
            attribute as any,
          )
          expect(typeof value).toBe('string')
          if (attribute !== 'hoverFilter')
            expect(value).toMatch(/^(hsl\(|transparent|initial|inherit)/)
        },
      )
    })
  })

  colorStyleColors.forEach((color) => {
    attributes.forEach((attribute) => {
      it(
        'should resolve ' + color + 'Secondary ' + attribute + ' to a string',
        () => {
          const value = getColorStyle(
            theme,
            `${color}Secondary` as any,
            attribute as any,
          )
          expect(typeof value).toBe('string')
          if (attribute !== 'hoverFilter')
            expect(value).toMatch(/^(hsl\(|transparent|initial|inherit)/)
        },
      )
    })
  })

  specialColorStyles.forEach((style) => {
    attributes.forEach((attribute) => {
      it('should resolve ' + style + ' ' + attribute + ' to a string', () => {
        const value = getColorStyle(theme, `${style}` as any, attribute as any)
        expect(typeof value).toBe('string')
        if (attribute !== 'hoverFilter')
          expect(value).toMatch(/^(hsl\(|transparent|initial|inherit)/)
      })
    })
  })
})
