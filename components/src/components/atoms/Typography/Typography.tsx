import * as React from 'react'
import styled from 'styled-components'

import { Colors, tokens } from '@/src/tokens'

type Variants = 'small' | 'large' | 'extraLarge' | 'label' | 'labelHeading'

type Weights = 'bold' | 'semiBold' | 'medium' | 'normal' | 'light'
type Fonts = 'sans' | 'mono'

interface ContainerProps {
  ellipsis?: boolean
  variant?: Variants
  size?: 'small' | 'base'
  ref: any
  color?: Colors
  weight?: Weights
  font: Fonts
}

const Container = styled.div<ContainerProps>`
  ${({ font }) => `
      font-family: ${tokens.fonts[font]};
      letter-spacing: ${tokens.letterSpacings['-0.01']};
      letter-spacing: ${tokens.letterSpacings['-0.015']};
      line-height: ${tokens.lineHeights['1.5']};
  `}

  ${({ ellipsis }) =>
    ellipsis &&
    `
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
  `}

  ${({ variant, theme }) => {
    switch (variant) {
      case 'small':
        return `
          font-size: ${tokens.fontSizes['small']};
          font-weight: ${tokens.fontWeights['normal']};
          letter-spacing: ${tokens.letterSpacings['-0.01']};
          line-height: ${tokens.lineHeights['1.5']};
        `
      case 'large':
        return `
          font-size: ${tokens.fontSizes['large']};
          font-weight: ${tokens.fontWeights['normal']};
          letter-spacing: ${tokens.letterSpacings['-0.02']};
          line-height: ${tokens.lineHeights['2']};
        `
      case 'extraLarge':
        return `
          font-size: ${tokens.fontSizes['extraLarge']};
          font-weight: ${tokens.fontWeights['medium']};
          letter-spacing: ${tokens.letterSpacings['-0.02']};
          line-height: ${tokens.lineHeights['2']};
        `
      case 'label':
        return `
          color: ${tokens.colors[theme.mode].text};
          font-size: ${tokens.fontSizes['label']};
          font-weight: ${tokens.fontWeights['bold']};
          letter-spacing: ${tokens.letterSpacings['-0.01']};
          text-transform: capitalize;
        `
      case 'labelHeading':
        return `
          color: ${tokens.colors[theme.mode].text};
          font-size: ${tokens.fontSizes['small']};
          font-weight: ${tokens.fontWeights['bold']};
          letter-spacing: ${tokens.letterSpacings['-0.01']};
          text-transform: capitalize;
        `
      default:
        return ``
    }
  }}

  ${({ theme, color }) =>
    color &&
    `
    color: ${tokens.colors[theme.mode][color]};
  `}

  ${({ size }) =>
    size &&
    `
      font-size: ${tokens.fontSizes[size]};
  `}

  ${({ weight }) =>
    weight &&
    `
      font-weight: ${tokens.fontWeights[weight]};
  `}
`

type Props = {
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
  ellipsis?: boolean
  variant?: Variants
  className?: string
  weight?: Weights
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
          variant,
          ellipsis: ellipsis ? true : undefined,
          className,
          weight,
          font,
          color,
          size,
        }}
        ref={ref}
      >
        {children}
      </Container>
    )
  },
)

Typography.displayName = 'Typography'
