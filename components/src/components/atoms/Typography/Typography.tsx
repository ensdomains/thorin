import * as React from 'react'
import styled, { css } from 'styled-components'

import { Font, FontSize, FontWeight } from '@/src/tokens/typography'

import {
  WithTypography,
  getFontSize,
  getFontWeight,
  getLineHeight,
} from '@/src/types/withTypography'
import { WithColor, getColor } from '@/src/types/withColorOrColorStyle'

type ContainerProps = {
  $ellipsis?: boolean
  $fontVariant: WithTypography['fontVariant']
  $size?: FontSize
  $color: NonNullable<WithColor['color']>
  $weight?: FontWeight
  $font: Font
}

const Container = styled.div<ContainerProps>(
  ({ theme, $ellipsis, $fontVariant = 'body', $color, $font, $weight }) => css`
    font-family: ${theme.fonts.sans};
    line-height: ${theme.lineHeights.body};
    color: ${getColor($color)};

    ${$ellipsis &&
    css`
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
    `}

    ${$fontVariant &&
    css`
      font-size: ${getFontSize($fontVariant)};
      font-weight: ${getFontWeight($fontVariant)};
      line-height: ${getLineHeight($fontVariant)};
    `}

    ${$font === 'mono' &&
    css`
      font-family: ${theme.fonts.mono};
    `}

    ${$weight &&
    css`
      font-weight: ${theme.fontWeights[$weight]};
    `};
  `,
)

type NativeDivProps = React.HTMLAttributes<HTMLDivElement>

type Props = {
  /** element type of container */
  asProp?:
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
  /** The classname attribute of contianer. */
  className?: NativeDivProps['className']
  /** The tokens.fontWeight value */
  /** A font value that overrides the existing font property  */
  font?: Font
  /** A weight value that overrides existing weight property */
  weight?: FontWeight
} & Omit<NativeDivProps, 'color' | 'as'> &
  WithTypography &
  WithColor

export const Typography = React.forwardRef<HTMLElement, Props>(
  (
    {
      asProp,
      children,
      ellipsis,
      className,
      fontVariant = 'body',
      font = 'sans',
      color = 'text',
      weight,
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
        $fontVariant={fontVariant}
        $weight={weight}
        as={asProp}
        className={className}
        ref={ref}
      >
        {children}
      </Container>
    )
  },
)

Typography.displayName = 'Typography'
