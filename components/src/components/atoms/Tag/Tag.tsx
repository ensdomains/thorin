import * as React from 'react'
import styled, { css } from 'styled-components'

import {
  WithColorStyle,
  getColorStyle,
} from '@/src/types/withColorOrColorStyle'

interface ContainerProps {
  $hover?: boolean
  $size: 'small' | 'medium'
  $colorStyle: NonNullable<Props['colorStyle']>
}

const Container = styled.div<ContainerProps>(
  ({ theme, $hover, $size, $colorStyle }) => css`
    align-items: center;
    display: flex;
    border-radius: ${theme.radii['full']};
    font-size: ${theme.fontSizes.small};
    line-height: ${theme.lineHeights.small};
    font-weight: ${theme.fontWeights.bold};
    width: ${theme.space['max']};
    padding: ${theme.space['0.5']} ${theme.space['2']};
    background: ${getColorStyle($colorStyle, 'background')};
    color: ${getColorStyle($colorStyle, 'text')};
    border: 1px solid ${getColorStyle($colorStyle, 'border')};
    cursor: default;

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

      &:hover,
      &:active {
        transform: translateY(-1px);
        background-color: ${getColorStyle($colorStyle, 'hover')};
      }
    `}
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
} & NativeDivProps &
  WithColorStyle

export const Tag = ({
  as = 'div',
  children,
  hover,
  size = 'small',
  colorStyle = 'accentSecondary',
  ...props
}: Props) => {
  return (
    <Container
      {...props}
      $colorStyle={colorStyle}
      $hover={hover}
      $size={size}
      as={as}
    >
      {children}
    </Container>
  )
}

Tag.displayName = 'Tag'
