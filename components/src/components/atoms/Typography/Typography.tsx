import * as React from 'react'
import styled from 'styled-components'

import { tokens } from '@/src/tokens'

type Variants = 'small' | 'large' | 'extraLarge' | 'label' | 'labelHeading'
type Colors =
  | 'foreground'
  | 'text'
  | 'textSecondary'
  | 'textTertiary '
  | 'accent'
  | 'red'
  | 'green'
type Weights = 'bold' | 'semiBold' | 'medium' | 'normal' | 'light'
type Fonts = 'sans' | 'mono'
type Aligns = 'left' | 'right' | 'center'

interface ContainerProps {
  ellipsis?: boolean
  variant?: Variants
  ref: any
  color: Colors
  weight: Weights
  font: Fonts
}

const Container = styled.div<ContainerProps>`
  ${({ theme, color, weight, font }) => `
      color: ${tokens.colors[theme.mode][color]};
      font-family: ${tokens.fonts[font]};
      letter-spacing: ${tokens.letterSpacings['-0.01']};
      font-size: ${tokens.fontSizes['base']};
      font-weight: ${tokens.fontWeights[weight]};
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
          font-weight: ${tokens.fontWeights['semiBold']};
          letter-spacing: ${tokens.letterSpacings['-0.01']};
          text-transform: capitalize;
        `
      case 'labelHeading':
        return `
          color: ${tokens.colors[theme.mode].text};
          font-size: ${tokens.fontSizes['small']};
          font-weight: ${tokens.fontWeights['semiBold']};
          letter-spacing: ${tokens.letterSpacings['-0.01']};
          text-transform: capitalize;
        `
      default:
        return ``
    }
  }}

  ${({ weight }) => `
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
  className: string
  weight: Weights
  font: Fonts
  align: Aligns
  color: Colors
}

export const Typography = React.forwardRef(
  (
    {
      as = 'div',
      children,
      ellipsis,
      variant,
      className,
      weight = 'normal',
      font = 'sans',
      color = 'text',
    }: Props,
    ref: React.Ref<HTMLElement>,
  ) => {
    console.log('variant: ', variant)
    console.log('as: ', as)
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
        }}
        ref={ref}
      >
        {children}
      </Container>
    )
  },
)

Typography.displayName = 'Typography'
