import * as React from 'react'

import { Box, BoxProps } from '../../atoms/Box/Box'
import { getValueForSize } from './utils/getValueForSize'
import * as styles from './styles.css'
import { Color, getValidatedColor } from './utils/getValidatedColor'

export type Size = 'small' | 'medium' | 'large'

export type Props = {
  size?: Size
  color?: Color
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type' | 'size'>

const CheckBox = React.forwardRef<
  HTMLElement,
  BoxProps & { $size: Size, $color: Color }
>(({ $size, $color, ...props }, ref) => (
  <Box
    {...props}
    alignItems="center"
    as="input"
    backgroundColor={{
      base: '$border',
      checked: getValidatedColor($color),
      disabled: '$border',
    }}
    borderRadius="$full"
    cursor={{ base: 'pointer', disabled: 'not-allowed' }}
    display="flex"
    height={getValueForSize($size, 'height')}
    justifyContent="center"
    position="relative"
    ref={ref}
    transition="background-color 0.1s ease-in-out"
    type="checkbox"
    width={getValueForSize($size, 'width')}
  />
))

export const Toggle = React.forwardRef<HTMLInputElement, Props>(
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
