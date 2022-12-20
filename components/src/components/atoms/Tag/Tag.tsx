import * as React from 'react'
import styled, { css, useTheme } from 'styled-components'

import { WithColor } from '@/src/types'
import { getColor } from '@/src/utils/getColor'

interface ContainerProps {
  $hover?: boolean
  $size: 'small' | 'medium'
  // $tone: 'accent' | 'blue' | 'green' | 'secondary' | 'red'
  $color: Props['color']
  $chroma: Props['chroma']
}

const Container = styled.div<ContainerProps>(
  ({ theme, $hover, $size, $color, $chroma }) => css`
    align-items: center;
    display: flex;
    border-radius: ${theme.radii['full']};
    font-size: ${theme.fontSizes.small};
    line-height: ${theme.lineHeights.small};
    font-weight: ${theme.fontWeights.bold};
    width: ${theme.space['max']};
    padding: ${theme.space['0.5']} ${theme.space['2']};

    ${$size === 'small' &&
    css`
      font-size: ${theme.fontSizes.extraSmall};
      line-height: ${theme.lineHeights.extraSmall};
    `}

    ${$hover &&
    css`
      transition-duration: ${theme.transitionDuration['150']};
      transition-property: color, border-color, background-color;
      transition-timing-function: ${theme.transitionTimingFunction['inOut']};
    `}

    background: ${getColor(theme, $color!, $chroma!, 'background')};
    color: ${getColor(theme, $color!, $chroma!, 'text')};
    border: 1px solid ${getColor(theme, $color!, $chroma!, 'border')};

    &:hover,
    &:active {
      color: ${theme.colors.text};
      background-color: ${getColor(theme, $color!, $chroma!, 'hover')};
    }
  `,
)

type NativeDivProps = React.HTMLAttributes<HTMLDivElement>

export type Props = {
  /** Element type of container */
  as?: 'div' | 'span'
  /** If true, changes colors on hover */
  hover?: boolean
  /** Size of element */
  size?: 'small' | 'medium'
  /** Color style of tag */
  // tone?: 'accent' | 'blue' | 'green' | 'red' | 'secondary'
} & NativeDivProps &
  WithColor

export const Tag = ({
  as = 'div',
  children,
  hover,
  size = 'small',
  color = 'blue',
  chroma = 'secondary',
  ...props
}: Props) => {
  const theme = useTheme()
  console.log(theme.colors)
  return (
    <Container
      {...props}
      $chroma={chroma}
      $color={color}
      $hover={hover}
      $size={size}
      as={as}
    >
      {children}
    </Container>
  )
}

Tag.displayName = 'Tag'
