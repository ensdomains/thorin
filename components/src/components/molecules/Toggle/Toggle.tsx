import * as React from 'react'

import type { BoxProps } from '../../atoms/Box/Box'
import { Box } from '../../atoms/Box/Box'
import * as styles from './styles.css'
import type { Color } from '@/src/tokens/color'
import { clsx } from 'clsx'

export type Size = 'small' | 'medium' | 'large'

export type ToggleProps = {
  size?: Size
  color?: Color
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type' | 'size' | 'color' | 'width' | 'height'>

const CheckBox = React.forwardRef<
  HTMLElement,
  BoxProps & { $size: Size, $color: Color }
>(({ $size, $color, className, ...props }, ref) => (
  <Box
    {...props}
    className={clsx(styles.checkbox({ size: $size }), className)}
    alignItems="center"
    as="input"
    backgroundColor={{
      base: 'border',
      checked: $color,
      disabled: 'border',
    }}
    borderRadius="full"
    cursor={{ base: 'pointer', disabled: 'not-allowed' }}
    display="flex"
    justifyContent="center"
    position="relative"
    ref={ref}
    transitionProperty="background-color"
    transitionDuration={100}
    transitionTimingFunction="ease-in-out"
    type="checkbox"
  />
))

export const Toggle = React.forwardRef<HTMLInputElement, ToggleProps>(
  ({ size = 'medium', color = 'accent', ...props }, ref) => {
    return (
      <CheckBox
        ref={ref}
        {...props}
        $color={color}
        $size={size}
        className={styles.toggle({ size: size })}
      />
    )
  },
)

Toggle.displayName = 'Toggle'
