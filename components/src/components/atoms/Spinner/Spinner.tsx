import * as React from 'react'
import styled from 'styled-components'

import { VisuallyHidden } from '../VisuallyHidden'
import * as styles from './styles.css'
import { Colors, tokens } from '@/src/tokens'

const Container = styled.div<{ size: 'small' | 'large' }>`
  color: ${tokens.colors.base.current};
  stroke: ${tokens.colors.base.current};

  ${(p) => {
    switch (p.size) {
      case 'small':
        return `
          height: ${tokens.space['6']};
          stroke-width: ${tokens.space['1.25']};
          width: ${tokens.space['6']};
        `
      case 'large':
        return `
          height: ${tokens.space['16']};
          stroke-width: ${tokens.space['1.25']};
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
} & styles.Variants

export const Spinner = React.forwardRef(
  (
    { accessibilityLabel, size = 'small' }: Props,
    ref: React.Ref<HTMLElement>,
  ) => {
    return (
      <Container ref={ref as any} size={size}>
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
