import * as React from 'react'

import { VisuallyHidden } from '../VisuallyHidden/VisuallyHidden'
import * as styles from './styles.css'
import type { BoxProps } from '../Box/Box'
import { Box } from '../Box/Box'
import type { Color } from '@/src/interfaces/withColor'
import clsx from 'clsx'

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
>(({ $size, $color, className, ...props }, ref) => (
  <Box
    {...props}
    className={clsx(className, styles.variants({ size: $size }))}
    color={$color}
    ref={ref}
  />
))

const SVG = () => (
  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" stroke="currentColor">
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
          as={SVG}
          display="block"
          fill="currentColor"
          stroke="currentColor"
          wh="full"
        />
      </ContainerBox>
    )
  },
)

Spinner.displayName = 'Spinner'
