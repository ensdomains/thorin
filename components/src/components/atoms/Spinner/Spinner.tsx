import * as React from 'react'
import styled, { keyframes } from 'styled-components'

import { VisuallyHidden } from '../VisuallyHidden'
import { Colors, tokens } from '@/src/tokens'

const rotate = keyframes`
  100% {
    transform: rotate(1turn);
  }
`

const Container = styled.div<{ size: 'small' | 'large'; $color: Colors }>`
  animation: ${rotate} 1.1s linear infinite;

  ${({ theme, $color }) => `
    color: ${tokens.colors[theme.mode][$color]};
    stroke: ${tokens.colors[theme.mode][$color]};
  `}

  ${({ size }) => {
    switch (size) {
      case 'small':
        return `
          height: ${tokens.space['6']};
          stroke-width: ${tokens.space['1.25']};
          width: ${tokens.space['6']};
        `
      case 'large':
        return `
          height: ${tokens.space['16']};
          stroke-width: ${tokens.space['1']};
          width: ${tokens.space['16']};
        `
      default:
        return ``
    }
  }}
`

type Props = {
  accessibilityLabel?: string
  color?: Colors
  size?: 'small' | 'large'
}

export const Spinner = React.forwardRef(
  (
    { accessibilityLabel, size = 'small', color = 'text' }: Props,
    ref: React.Ref<HTMLElement>,
  ) => {
    return (
      <Container $color={color} ref={ref as any} size={size}>
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
