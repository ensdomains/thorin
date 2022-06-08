import * as React from 'react'
import styled, { css } from 'styled-components'

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

const Container = styled.div<ContainerProps>(
  ({ theme, $ellipsis, $variant, $size, $color, $weight, $font }) => css`
    font-family: ${theme.fonts[$font]};
    letter-spacing: ${theme.letterSpacings['-0.01']};
    letter-spacing: ${theme.letterSpacings['-0.015']};
    line-height: ${theme.lineHeights.normal};

    ${$ellipsis &&
    css`
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
    `}

    ${() => {
      switch ($variant) {
        case 'small':
          return css`
            font-size: ${theme.fontSizes['small']};
            font-weight: ${theme.fontWeights['normal']};
            letter-spacing: ${theme.letterSpacings['-0.01']};
            line-height: ${theme.lineHeights.normal};
          `
        case 'large':
          return css`
            font-size: ${theme.fontSizes['large']};
            font-weight: ${theme.fontWeights['normal']};
            letter-spacing: ${theme.letterSpacings['-0.02']};
            line-height: ${theme.lineHeights['2']};
          `
        case 'extraLarge':
          return css`
            font-size: ${theme.fontSizes['extraLarge']};
            font-weight: ${theme.fontWeights['medium']};
            letter-spacing: ${theme.letterSpacings['-0.02']};
            line-height: ${theme.lineHeights['2']};
          `
        case 'label':
          return css`
            color: ${theme.colors.text};
            font-size: ${theme.fontSizes['label']};
            font-weight: ${theme.fontWeights['bold']};
            letter-spacing: ${theme.letterSpacings['-0.01']};
            text-transform: capitalize;
          `
        case 'labelHeading':
          return css`
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

  ${$color &&
    css`
      color: ${theme.colors[$color]};
    `}

  ${$size &&
    css`
      font-size: ${theme.fontSizes[$size]};
    `}

  ${$weight &&
    css`
      font-weight: ${theme.fontWeights[$weight]};
    `}
  `,
)

type NativeDivProps = React.HTMLAttributes<HTMLDivElement>

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
  /** If true, will truncate text with an elipsis on overflow. If false, text will break on the next word. */
  ellipsis?: boolean
  /** Font size and */
  variant?: Variants
  /** The classname attribute of contianer. */
  className?: NativeDivProps['className']
  /** The tokens.fontWeight value */
  weight?: Weights
  /** The  */
  font?: Fonts
  color?: Colors
  size?: 'small' | 'base'
} & Omit<NativeDivProps, 'color'>

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
      ...props
    },
    ref,
  ) => {
    return (
      <Container
        {...props}
        $color={color}
        $ellipsis={ellipsis ? true : undefined}
        $font={font}
        $size={size}
        $variant={variant}
        $weight={weight}
        as={as}
        className={className}
        ref={ref}
      >
        {children}
      </Container>
    )
  },
)

Typography.displayName = 'Typography'
