import * as React from 'react'
import styled, { css } from 'styled-components'

import { Colors } from '@/src/tokens'
import { Font, FontSize, FontWeight } from '@/src/tokens/typography'

type LegacyVariant = 'small' | 'large' | 'extraLarge' | 'label' | 'labelHeading'

type Variant =
  | 'Heading/H1'
  | 'Heading/H2'
  | 'Heading/H3'
  | 'Heading/H4'
  | 'Large/XL Normal'
  | 'Large/XL Bold'
  | 'Large/Normal'
  | 'Large/Bold'
  | 'Body/Normal'
  | 'Body/Bold'
  | 'Small/Normal'
  | 'Small/Bold'
  | 'Small/XS Normal'
  | 'Small/XS Bold'
  | LegacyVariant

interface ContainerProps {
  $ellipsis?: boolean
  $variant?: Variant
  $size?: FontSize
  $color?: Colors
  $weight?: FontWeight
  $font: Font
}

const Container = styled.div<ContainerProps>(
  ({ theme, $ellipsis, $variant, $size, $color, $weight, $font }) => css`
    font-family: ${theme.fonts[$font]};
    line-height: ${theme.lineHeights.body};

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
            font-size: ${theme.fontSizes.small};
            font-weight: ${theme.fontWeights.normal};
            line-height: ${theme.lineHeights.small};
          `
        case 'large':
          return css`
            font-size: ${theme.fontSizes.large};
            font-weight: ${theme.fontWeights.normal};
            letter-spacing: ${theme.letterSpacings['-0.02']};
            line-height: ${theme.lineHeights.large};
          `
        case 'extraLarge':
          return css`
            font-size: ${theme.fontSizes.extraLarge};
            font-weight: ${theme.fontWeights.normal};
            line-height: ${theme.lineHeights.extraLarge};
          `
        case 'label':
          return css`
            color: ${theme.colors.text};
            font-size: ${theme.fontSizes.extraSmall};
            font-weight: ${theme.fontWeights.bold};
            text-transform: capitalize;
          `
        case 'labelHeading':
          return css`
            color: ${theme.colors.text};
            font-size: ${theme.fontSizes.small};
            font-weight: ${theme.fontWeights.bold};
            text-transform: capitalize;
          `
        case 'Heading/H1':
          return css`
            font-size: ${theme.fontSizes.headingOne};
            line-height: ${theme.lineHeights.headingOne};
            font-weight: ${theme.fontWeights.extraBold};
          `
        case 'Heading/H2':
          return css`
            font-size: ${theme.fontSizes.headingTwo};
            line-height: ${theme.lineHeights.headingTwo};
            font-weight: ${theme.fontWeights.bold};
          `
        case 'Heading/H3':
          return css`
            font-size: ${theme.fontSizes.headingThree};
            line-height: ${theme.lineHeights.headingThree};
            font-weight: ${theme.fontWeights.bold};
          `
        case 'Heading/H4':
          return css`
            font-size: ${theme.fontSizes.headingFour};
            line-height: ${theme.lineHeights.headingFour};
            font-weight: ${theme.fontWeights.bold};
          `
        case 'Large/XL Normal':
          return css`
            font-size: ${theme.fontSizes.extraLarge};
            line-height: ${theme.lineHeights.extraLarge};
            font-weight: ${theme.fontWeights.normal};
          `
        case 'Large/XL Bold':
          return css`
            font-size: ${theme.fontSizes.extraLarge};
            line-height: ${theme.lineHeights.extraLarge};
            font-weight: ${theme.fontWeights.bold};
          `
        case 'Large/Normal':
          return css`
            font-size: ${theme.fontSizes.large};
            line-height: ${theme.lineHeights.large};
            font-weight: ${theme.fontWeights.normal};
          `
        case 'Large/Bold':
          return css`
            font-size: ${theme.fontSizes.large};
            line-height: ${theme.lineHeights.large};
            font-weight: ${theme.fontWeights.bold};
          `
        case 'Body/Normal':
          return css`
            font-size: ${theme.fontSizes.body};
            line-height: ${theme.lineHeights.body};
            font-weight: ${theme.fontWeights.normal};
          `
        case 'Body/Bold':
          return css`
            font-size: ${theme.fontSizes.body};
            line-height: ${theme.lineHeights.body};
            font-weight: ${theme.fontWeights.bold};
          `
        case 'Small/Normal':
          return css`
            font-size: ${theme.fontSizes.small};
            line-height: ${theme.lineHeights.small};
            font-weight: ${theme.fontWeights.normal};
          `
        case 'Small/Bold':
          return css`
            font-size: ${theme.fontSizes.small};
            line-height: ${theme.lineHeights.small};
            font-weight: ${theme.fontWeights.bold};
          `
        case 'Small/XS Normal':
          return css`
            font-size: ${theme.fontSizes.extraSmall};
            line-height: ${theme.lineHeights.extraSmall};
            font-weight: ${theme.fontWeights.normal};
          `
        case 'Small/XS Bold':
          return css`
            font-size: ${theme.fontSizes.extraSmall};
            line-height: ${theme.lineHeights.extraSmall};
            font-weight: ${theme.fontWeights.bold};
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
  variant?: Variant
  /** The classname attribute of contianer. */
  className?: NativeDivProps['className']
  /** The tokens.fontWeight value */
  weight?: FontWeight
  /** The  */
  font?: Font
  color?: Colors
  size?: FontSize
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
