import * as React from 'react'

import { VisuallyHidden } from '../VisuallyHidden/VisuallyHidden'
import * as styles from './styles.css'
import type { BoxProps } from '../Box/Box'
import { Box } from '../Box/Box'
import { getValueForSize } from './utils/getValueForSize'
import type { Color } from '@/src/interfaces/withColor'
import { validateColor } from '@/src/interfaces/withColor'

type NativeDivProps = React.HTMLAttributes<HTMLDivElement>
type Size = 'small' | 'medium' | 'large'

export type SpinnerProps = {
  /** Hidden text used for accessibilty. */
  accessibilityLabel?: string
  /** A tokens 'mode' color value */
  color?: Color
  size?: Size
} & Omit<NativeDivProps, 'children' | 'color'>

const ContainerBox = React.forwardRef<
  HTMLElement,
  BoxProps & { $size: Size, $color?: Color }
>(({ $size, $color, ...props }, ref) => (
  <Box
    {...props}
    color={validateColor($color)}
    ref={ref}
    strokeWidth={getValueForSize($size, 'strokeWidth')}
    wh={getValueForSize($size, 'size')}
  />
))

const svg = (
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
)

export const Spinner = React.forwardRef<HTMLElement, SpinnerProps>(
  (
    { accessibilityLabel, size = 'small', color, ...props },
    ref,
  ) => {
    return (
      <ContainerBox
        {...props}
        $color={color}
        $size={size}
        className={styles.animation}
        ref={ref}
      >
        {accessibilityLabel && (
          <VisuallyHidden>{accessibilityLabel}</VisuallyHidden>
        )}
        <Box
          as={svg}
          display="block"
          fill="currentColor"
          stroke="currentColor"
          wh="$full"
        />
      </ContainerBox>
    )
  },
)

Spinner.displayName = 'Spinner'
