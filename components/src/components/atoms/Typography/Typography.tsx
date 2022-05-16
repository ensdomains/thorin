import * as React from 'react'
import styled from 'styled-components'

import { Colors } from '@/src/tokens'

type Variants = 'small' | 'large' | 'extraLarge' | 'label' | 'labelHeading'

type Weights = 'bold' | 'semiBold' | 'medium' | 'normal' | 'light'
type Fonts = 'sans' | 'mono'

interface ContainerProps {
  $ellipsis?: boolean
  $variant?: Variants
  $size?: 'small' | 'base'
  $color?: Colors
  $weight?: Weights
  $font: Fonts
}

const Container = styled.div<ContainerProps>`
  ${({ $font, theme }) => `
    font-family: ${theme.fonts[$font]};
    letter-spacing: ${theme.letterSpacings['-0.01']};
    letter-spacing: ${theme.letterSpacings['-0.015']};
    line-height: ${theme.lineHeights.normal};
  `}

  ${({ $ellipsis }) =>
    $ellipsis &&
    `
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
  `}

  ${({ $variant, theme }) => {
    switch ($variant) {
      case 'small':
        return `
          font-size: ${theme.fontSizes['small']};
          font-weight: ${theme.fontWeights['normal']};
          letter-spacing: ${theme.letterSpacings['-0.01']};
          line-height: ${theme.lineHeights.normal};
        `
      case 'large':
        return `
          font-size: ${theme.fontSizes['large']};
          font-weight: ${theme.fontWeights['normal']};
          letter-spacing: ${theme.letterSpacings['-0.02']};
          line-height: ${theme.lineHeights['2']};
        `
      case 'extraLarge':
        return `
          font-size: ${theme.fontSizes['extraLarge']};
          font-weight: ${theme.fontWeights['medium']};
          letter-spacing: ${theme.letterSpacings['-0.02']};
          line-height: ${theme.lineHeights['2']};
        `
      case 'label':
        return `
          color: ${theme.colors.text};
          font-size: ${theme.fontSizes['label']};
          font-weight: ${theme.fontWeights['bold']};
          letter-spacing: ${theme.letterSpacings['-0.01']};
          text-transform: capitalize;
        `
      case 'labelHeading':
        return `
          color: ${theme.colors.text};
          font-size: ${theme.fontSizes['small']};
          font-weight: ${theme.fontWeights['bold']};
          letter-spacing: ${theme.letterSpacings['-0.01']};
          text-transform: capitalize;
        `
      default:
        return ``
    }
  }}

  ${({ $color, theme }) =>
    $color &&
    `
    color: ${theme.colors[$color]};
  `}

  ${({ $size, theme }) =>
    $size &&
    `
      font-size: ${theme.fontSizes[$size]};
  `}

  ${({ $weight, theme }) =>
    $weight &&
    `
      font-weight: ${theme.fontWeights[$weight]};
  `}
`

type Props = {
  /** element type of container */
  as?:
    | 'code'
    | 'div'
    | 'h1'
    | 'h2'
    | 'h3'
    | 'h4'
    | 'h5'
    | 'h6'
    | 'label'
    | 'p'
    | 'span'
    | 'i'
  children?: React.ReactNode
  /** If true, will truncate text with an elipsis on overflow. If false, text will break on the next word. */
  ellipsis?: boolean
  /** Font size and */
  variant?: Variants
  /** The classname attribute of contianer. */
  className?: string
  /** The tokens.fontWeight value */
  weight?: Weights
  /** The  */
  font?: Fonts
  color?: Colors
  size?: 'small' | 'base'
}

export const Typography = React.forwardRef<HTMLElement, Props>(
  (
    {
      as = 'div',
      children,
      ellipsis,
      variant,
      className,
      weight,
      font = 'sans',
      color,
      size,
    },
    ref,
  ) => {
    return (
      <Container
        as={as}
        {...{
          className,
          $variant: variant,
          $ellipsis: ellipsis ? true : undefined,
          $weight: weight,
          $font: font,
          $color: color,
          $size: size,
        }}
        ref={ref}
      >
        {children}
      </Container>
    )
  },
)

Typography.displayName = 'Typography'
