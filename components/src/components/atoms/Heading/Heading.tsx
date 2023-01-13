import * as React from 'react'
import styled, { css } from 'styled-components'

import { mq } from '@/src/utils/responsiveHelpers'
import { WithColor, getColor } from '@/src/types/withColorOrColorStyle'

interface HeadingContainerProps {
  $textAlign?: React.CSSProperties['textAlign']
  $textTransform: React.CSSProperties['textTransform']
  $level: '1' | '2'
  $responsive?: boolean
  $color: NonNullable<WithColor['color']>
}

const HeadingContainer = styled.div<HeadingContainerProps>(
  ({ theme, $textAlign, $textTransform, $level, $responsive, $color }) => css`
    ${$textAlign
      ? css`
          text-align: ${$textAlign};
        `
      : ``}
    ${$textTransform
      ? css`
          text-transform: ${$textTransform};
        `
      : ``}

  ${() => {
      switch ($level) {
        case '1':
          return css`
            font-size: ${theme.fontSizes.headingOne};
            font-weight: ${theme.fontWeights.extraBold};
            line-height: ${theme.lineHeights.headingOne};
          `
        case '2':
          return css`
            font-size: ${theme.fontSizes.headingTwo};
            font-weight: ${theme.fontWeights.bold};
            line-height: ${theme.lineHeights.headingTwo};
          `
        default:
          return ``
      }
    }}
  
  ${() => {
      if ($responsive) {
        switch ($level) {
          case '1':
            return css`
              font-size: ${theme.fontSizes.headingTwo};
              line-height: ${theme.lineHeights.headingTwo};
              ${mq.lg.min(css`
                font-size: ${theme.fontSizes.headingOne};
                line-height: ${theme.lineHeights.headingOne};
              `)}
            `
          case '2':
            return css`
              font-size: ${theme.fontSizes.extraLarge};
              line-height: ${theme.lineHeights.extraLarge};
              ${mq.sm.min(css`
                font-size: ${theme.fontSizes.headingTwo};
                line-height: ${theme.lineHeights.headingTwo};
              `)}
            `
          default:
            return ``
        }
      }
    }}

  ${$color &&
    css`
      color: ${getColor(theme, $color)};
    `}
  
  font-family: ${theme.fonts['sans']};
  `,
)

type NativeDivAttributes = React.HTMLAttributes<HTMLDivElement>

type Props = {
  /** CSS property of textAlign */
  align?: React.CSSProperties['textAlign']
  /** JSX element to render. */
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'legend'
  children?: NativeDivAttributes['children']
  /** The id attribute of element */
  id?: NativeDivAttributes['id']
  /** CSS property of text-transform */
  transform?: React.CSSProperties['textTransform']
  /**  */
  responsive?: boolean
  level?: '1' | '2'
} & WithColor &
  Omit<NativeDivAttributes, 'color'>

export const Heading = React.forwardRef(
  (
    {
      align,
      children,
      as = 'h1',
      id,
      level = '2',
      responsive,
      transform,
      color = 'text',
      ...props
    }: Props,
    ref: React.ForwardedRef<HTMLDivElement>,
  ) => (
    <HeadingContainer
      {...props}
      $color={color}
      $level={level}
      $responsive={responsive}
      $textAlign={align}
      $textTransform={transform}
      as={as}
      id={id}
      ref={ref}
    >
      {children}
    </HeadingContainer>
  ),
)

Heading.displayName = 'Heading'
