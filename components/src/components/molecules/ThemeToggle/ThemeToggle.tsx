import * as React from 'react'

import { useId } from '../../../hooks/useId'
import { Box, BoxProps } from '../../atoms/Box/Box'
import * as styles from './styles.css'
import { Color, getValidatedColor } from './utils/getValidatedColor'
import { MoonSVG, SunSVG } from '../..'
import { getValueForSize } from './utils/getValueForSize'

export type Size = 'extraSmall' | 'small' | 'medium'

export type Mode = 'light' | 'dark'

export type Props = {
  size?: Size
  color?: Color
  mode?: Mode
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'>

const Container = (props: BoxProps) => (
  <Box
    {...props}
    height="fit-content"
    position="relative"
    width="fit-content"
  />
)

const Label = ({
  $size,
  $mode,
  ...props
}: BoxProps & { $size: Size; $mode: Mode }) => (
  <Box
    {...props}
    alignItems="center"
    as="label"
    color="$textAccent"
    cursor="pointer"
    display="flex"
    fontSize="$small"
    fontWeight={$size === 'extraSmall' ? '$normal' : '$bold'}
    justifyContent="center"
    left="50%"
    pointerEvents="none"
    position="absolute"
    top="50%"
    transform={$mode === 'dark' ? 'translateX(-50%)' : 'translateX(50%)'}
    transition="color 0.1s linear"
    translate="-50% -50%"
    wh={getValueForSize($size, 'knobSize')}
  />
)

const Checkbox = React.forwardRef<HTMLElement, BoxProps & { $size: Size }>(
  ({ $size, ...props }, ref) => (
    <Box
      {...props}
      alignItems="center"
      as="input"
      backgroundColor="$greySurface"
      borderRadius="$full"
      cursor={{ base: 'pointer', disabled: 'not-allowed' }}
      display="flex"
      height={getValueForSize($size, 'height')}
      justifyContent="center"
      position="relative"
      ref={ref}
      type="checkbox"
      width={getValueForSize($size, 'width')}
    />
  ),
)

const Slider = ({
  $size,
  $color,
  ...props
}: BoxProps & { $size: Size; $color: Color }) => (
  <Box
    {...props}
    backgroundColor={getValidatedColor($color)}
    borderRadius="$full"
    display="block"
    left="50%"
    pointerEvents="none"
    position="absolute"
    top="50%"
    transition="transform 0.3s ease-in-out, background-color 0.1s ease-in-out"
    translate="-50% -50%"
    wh={getValueForSize($size, 'knobSize')}
  />
)

export const ThemeToggle = React.forwardRef<HTMLInputElement, Props>(
  ({ size = 'medium', color = 'accent', disabled, ...props }, ref) => {
    const id = useId()
    return (
      <Container>
        <Checkbox
          className={styles.checkbox}
          disabled={disabled}
          id={id}
          ref={ref}
          type="checkbox"
          {...props}
          $size={size}
        />
        <Slider $color={color} $size={size} className={styles.slider} />
        <Label
          $mode="dark"
          $size={size}
          className={styles.labelEth}
          htmlFor={id}
          id="dark"
        >
          <MoonSVG />
        </Label>
        <Label
          $mode="light"
          $size={size}
          className={styles.labelFiat}
          htmlFor={id}
          id="light"
        >
          <SunSVG />
        </Label>
      </Container>
    )
  },
)

ThemeToggle.displayName = 'ThemeToggle'
