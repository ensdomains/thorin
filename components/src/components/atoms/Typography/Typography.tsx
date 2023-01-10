import * as React from 'react'
import styled, { css } from 'styled-components'

import { Font, FontSize, FontWeight } from '@/src/tokens/typography'

import { getTypography } from '@/src/utils/getTypography'
import { getColor } from '@/src/utils/getColor'

import { WithColor, WithTypography } from '@/src/types/index'

type ContainerProps = {
  $ellipsis?: boolean
  $typography: WithTypography['fontVariant']
  $size?: FontSize
  $color: WithColor['color']
  $colorScheme: WithColor['colorScheme']
  $weight?: FontWeight
  $font: Font
}

const Container = styled.div<ContainerProps>(
  ({
    theme,
    $ellipsis,
    $typography = 'regular',
    $color,
    $colorScheme,
    $font,
    $weight,
  }) => css`
    font-family: ${theme.fonts.sans};
    line-height: ${theme.lineHeights.body};
    color: inherit;

    ${$ellipsis &&
    css`
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
    `}

    ${$typography &&
    css`
      font-size: ${getTypography(theme, $typography, 'fontSize')};
      font-weight: ${getTypography(theme, $typography, 'fontWeight')};
      line-height: ${getTypography(theme, $typography, 'lineHeight')};
    `}

    ${$font === 'mono' &&
    css`
      font-family: ${theme.fonts.mono};
    `}

    ${($color || $colorScheme) &&
    css`
      color: ${getColor(theme, $colorScheme || 'text', $color, 'text')};
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
      fontVariant = 'regular',
      font = 'sans',
      color,
      colorScheme,
      weight,
      ...props
    },
    ref,
  ) => {
    return (
      <Container
        {...props}
        $color={color}
        $colorScheme={colorScheme}
        $ellipsis={ellipsis ? true : undefined}
        $font={font}
        $typography={fontVariant}
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
