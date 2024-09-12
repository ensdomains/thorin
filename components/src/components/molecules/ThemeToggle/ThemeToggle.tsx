import * as React from 'react'

import { useId } from '../../../hooks/useId'
import type { BoxProps } from '../../atoms/Box/Box'
import { Box } from '../../atoms/Box/Box'
import * as styles from './styles.css'
import type { Color } from './utils/getValidatedColor'
import { icon } from './styles.css'
import { MoonSVG, SunSVG } from '@/src/icons'
import clsx from 'clsx'

export type Size = 'extraSmall' | 'small' | 'medium'

export type Mode = 'light' | 'dark'

export type ThemeToggleProps = {
  size?: Size
  color?: Color
  mode?: Mode
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size' | 'height' | 'width'>

const Container = (props: BoxProps) => (
  <Box
    {...props}
    height="fit"
    position="relative"
    width="fit"
  />
)

const Label = ({
  $size,
  $mode,
  className,
  ...props
}: BoxProps & { $size: Size, $mode: Mode }) => (
  <Box
    {...props}
    className={clsx(styles.variants({ knob: $size }), className)}
    alignItems="center"
    as="label"
    color="textAccent"
    cursor="pointer"
    display="flex"
    fontSize="small"
    fontWeight={$size === 'extraSmall' ? 'normal' : 'bold'}
    justifyContent="center"
    left="1/2"
    pointerEvents="none"
    position="absolute"
    top="1/2"
    transform={$mode === 'dark' ? 'translateX(-50%)' : 'translateX(50%)'}
    transition="color 0.1s linear"
    translate="-50% -50%"
  />
)

const Checkbox = React.forwardRef<HTMLElement, BoxProps & { $size: Size }>(
  ({ $size, className, ...props }, ref) => (
    <Box
      {...props}
      className={clsx(styles.variants({ size: $size }), className)}
      alignItems="center"
      as="input"
      backgroundColor="greySurface"
      borderRadius="full"
      cursor={{ base: 'pointer', disabled: 'not-allowed' }}
      display="flex"
      justifyContent="center"
      position="relative"
      ref={ref}
      type="checkbox"
    />
  ),
)

const Slider = ({
  $size,
  $color,
  className,
  ...props
}: BoxProps & { $size: Size, $color: Color }) => (
  <Box
    {...props}
    className={clsx(styles.variants({ knob: $size }), className)}
    backgroundColor={$color}
    borderRadius="full"
    display="block"
    left="1/2"
    pointerEvents="none"
    position="absolute"
    top="1/2"
    transition="transform 0.3s ease-in-out, background-color 0.1s ease-in-out"
    translate="-50% -50%"
  />
)

export const ThemeToggle = React.forwardRef<HTMLInputElement, ThemeToggleProps>(
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
          <MoonSVG className={icon} />
        </Label>
        <Label
          $mode="light"
          $size={size}
          className={styles.labelFiat}
          htmlFor={id}
          id="light"
        >
          <SunSVG className={icon} />
        </Label>
      </Container>
    )
  },
)

ThemeToggle.displayName = 'ThemeToggle'
