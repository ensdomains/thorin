import * as React from 'react'

import { useId } from '../../../hooks/useId'
import type { BoxProps } from '../../atoms/Box/Box'
import { Box } from '../../atoms/Box/Box'
import { getValuesForKnob } from './utils/getValuesForKnob'
import * as styles from './styles.css'
import { getValueForCheckbox } from './utils/getValueForCheckBox'
import type { Color } from './utils/getValidatedColor'
import { getValidatedColor } from './utils/getValidatedColor'

export type Size = 'extraSmall' | 'small' | 'medium'

export type CurrencyToggleProps = {
  size?: Size
  fiat?: string
  color?: Color
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'>

const Container = (props: BoxProps) => (
  <Box
    {...props}
    height="fit-content"
    position="relative"
    width="fit"
  />
)

const Label = ({
  $type,
  $size,
  ...props
}: BoxProps & { $size: Size, $type: 'eth' | 'fiat' }) => (
  <Box
    {...props}
    alignItems="center"
    as="label"
    color="textAccent"
    cursor="pointer"
    display="flex"
    fontFamily="sans"
    fontSize="small"
    fontWeight={$size === 'extraSmall' ? '$normal' : 'bold'}
    height={getValuesForKnob($size, 'height')}
    justifyContent="center"
    left="50%"
    position="absolute"
    top="50%"
    transform={$type === 'eth' ? 'translateX(-50%)' : 'translateX(50%)'}
    transition="color 0.1s linear"
    translate="-50% -50%"
    width={getValuesForKnob($size, 'width')}
  />
)

const Checkbox = React.forwardRef<HTMLElement, BoxProps & { $size: Size }>(
  ({ $size, ...props }, ref) => (
    <Box
      {...props}
      alignItems="center"
      as="input"
      backgroundColor="greySurface"
      borderRadius={getValueForCheckbox($size, 'borderRadius')}
      cursor={{ base: 'pointer', disabled: 'not-allowed' }}
      display="flex"
      height={getValueForCheckbox($size, 'height')}
      justifyContent="center"
      position="relative"
      ref={ref}
      type="checkbox"
      width={getValueForCheckbox($size, 'width')}
    />
  ),
)

const Slider = ({
  $size,
  $color,
  ...props
}: BoxProps & { $size: Size, $color: Color }) => (
  <Box
    {...props}
    backgroundColor={getValidatedColor($color)}
    borderRadius={$size === 'extraSmall' ? 'full' : '$medium'}
    display="block"
    height={getValuesForKnob($size, 'height')}
    left="50%"
    position="absolute"
    top="50%"
    transition="transform 0.3s ease-in-out, background-color 0.1s ease-in-out"
    translate="-50% -50%"
    width={getValuesForKnob($size, 'width')}
  />
)

export const CurrencyToggle = React.forwardRef<HTMLInputElement, CurrencyToggleProps>(
  (
    { size = 'medium', color = 'accent', disabled, fiat = 'usd', ...props },
    ref,
  ) => {
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
          $size={size}
          $type="eth"
          className={styles.labelEth}
          htmlFor={id}
          id="eth"
        >
          ETH
        </Label>
        <Label
          $size={size}
          $type="fiat"
          className={styles.labelFiat}
          htmlFor={id}
          id="fiat"
        >
          {fiat.toLocaleUpperCase()}
        </Label>
      </Container>
    )
  },
)

CurrencyToggle.displayName = 'CurrencyToggle'
