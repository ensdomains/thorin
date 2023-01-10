import * as React from 'react'
import styled, { css } from 'styled-components'

import { WithColor } from '@/src/types'
import { getColor } from '@/src/utils/getColor'

interface ContainerProps {
  $hover?: boolean
  $size: 'small' | 'medium'
  // $tone: 'accent' | 'blue' | 'green' | 'secondary' | 'red'
  $color: Props['color']
  $colorScheme: Props['colorScheme']
}

const Container = styled.div<ContainerProps>(
  ({ theme, $hover, $size, $colorScheme, $color }) => css`
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

    background: ${getColor(theme, $colorScheme, $color, 'background')};
    color: ${getColor(theme, $colorScheme, $color, 'text')};
    border: 1px solid ${getColor(theme, $colorScheme, $color, 'border')};

    &:hover,
    &:active {
      color: ${theme.colors.text};
      background-color: ${getColor(theme, $colorScheme, $color, 'hover')};
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
  colorScheme = 'secondary',
  ...props
}: Props) => {
  return (
    <Container
      {...props}
      $color={color}
      $colorScheme={colorScheme}
      $hover={hover}
      $size={size}
      as={as}
    >
      {children}
    </Container>
  )
}

Tag.displayName = 'Tag'
