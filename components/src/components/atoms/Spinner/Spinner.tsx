import * as React from 'react'
import styled, { css, keyframes } from 'styled-components'

import { Colors } from '@/src/tokens'

import { VisuallyHidden } from '../VisuallyHidden'

type NativeDivProps = React.HTMLAttributes<HTMLDivElement>
type Size = 'small' | 'medium' | 'large'
type Props = {
  /** Hidden text used for accessibilty. */
  accessibilityLabel?: string
  /** A tokens 'mode' color value */
  color?: Colors
  size?: Size
} & Omit<NativeDivProps, 'children' | 'color'>

const rotate = keyframes`
  100% {
    transform: rotate(1turn);
  }
`

const Container = styled.div<{ $size: Size; $color?: Colors }>(
  ({ theme, $color, $size }) => css`
    animation: ${rotate} 1.1s linear infinite;

    ${$color &&
    css`
      color: ${theme.colors[$color]};
    `}

    ${() => {
      switch ($size) {
        case 'small':
          return css`
            height: ${theme.space['4']};
            width: ${theme.space['4']};
            stroke-width: ${theme.space['1']};
          `
        case 'medium':
          return css`
            height: ${theme.space['6']};
            stroke-width: ${theme.space['1.25']};
            width: ${theme.space['6']};
          `
        case 'large':
          return css`
            height: ${theme.space['16']};
            stroke-width: ${theme.space['1']};
            width: ${theme.space['16']};
          `
        default:
          return ``
      }
    }}

    svg {
      display: block;
      stroke: currentColor;
      height: 100%;
      width: 100%;
    }
  `,
)

export const Spinner = React.forwardRef(
  (
    { accessibilityLabel, size = 'small', color = 'text', ...props }: Props,
    ref: React.Ref<HTMLElement>,
  ) => {
    return (
      <Container $color={color} $size={size} ref={ref as any} {...props}>
        {accessibilityLabel && (
          <VisuallyHidden>{accessibilityLabel}</VisuallyHidden>
        )}
        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <circle
            cx="12"
            cy="12"
            fill="none"
            r="9"
            strokeDasharray="42"
            strokeLinecap="round"
          />
          <circle
            cx="12"
            cy="12"
            fill="none"
            opacity="0.25"
            r="9"
            strokeLinecap="round"
          />
        </svg>
      </Container>
    )
  },
)

Spinner.displayName = 'Spinner'
