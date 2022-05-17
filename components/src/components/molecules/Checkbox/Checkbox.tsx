import * as React from 'react'
import styled from 'styled-components'

import { Colors } from '@/src/tokens'
import { DefaultTheme } from '@/src/types'
import { Field } from '../..'
import { FieldBaseProps } from '../../atoms/Field'

type NativeInputProps = React.AllHTMLAttributes<HTMLInputElement>

interface InputProps {
  $size: any
  $variant: 'regular' | 'switch'
  $color: Colors
  $gradient: boolean
  $background: 'grey' | 'white'
  $border: boolean
}

const valueForSizeAndTokens =
  (size: InputProps['$size']) => (tokens: [string, string, string]) => {
    const index = size === 'small' ? 0 : size === 'large' ? 2 : 1
    return tokens[index]
  }

const gradientWithFallback = (
  theme: DefaultTheme,
  color: InputProps['$color'],
) => {
  if (Object.keys(theme.colors.gradients).includes(color)) {
    const gradient = color as keyof DefaultTheme['colors']['gradients']
    return theme.colors.gradients[gradient]
  }
  return theme.colors[color]
}

const stylesForSwitch = (
  theme: DefaultTheme,
  { $size, $border, $color, $gradient }: InputProps,
): string => {
  const valueForTokens = valueForSizeAndTokens($size)

  const containerWidth = valueForTokens([
    theme.space['12'],
    theme.space['12'],
    theme.space['20'],
  ])

  const containerHalfWidth = valueForTokens([
    theme.space['6'],
    theme.space['6'],
    theme.space['10'],
  ])

  const containerHeight = valueForTokens([
    theme.space['7'],
    theme.space['8'],
    theme.space['12'],
  ])

  const containerHalfHeight = valueForTokens([
    theme.space['3.5'],
    theme.space['4'],
    theme.space['6'],
  ])

  const containerBackground = $gradient
    ? gradientWithFallback(theme, $color)
    : theme.colors[$color]

  const switchSize = $border
    ? `calc(${containerHeight} - 2px)`
    : valueForTokens([theme.space['5'], theme.space['6'], theme.space['9']])

  const switchBorderWidth = $border
    ? valueForTokens(['1.25px', '1.25px', '1.75px'])
    : '1px'

  const switchBorderColor = $border
    ? theme.colors.border
    : theme.colors.borderSecondary

  const switchBoxSizing = $border ? 'border-box' : 'content-box'

  const switchBackgroundClip = $border ? 'border-box' : 'content-box'

  return `
    box-sizing: border-box;
    background: ${theme.colors.foregroundSecondary};
    background-clip: content-box;
    width: ${containerWidth};
    height: ${containerHeight};
    border-radius: ${containerHalfHeight};
    border-width: 1px;
    border-style: solid;
    border-color: ${theme.colors.borderSecondary};

    &:hover {
      transform: translateY(-1px);
      filter: brightness(1.05);
    }
    
    &:active {
      transform: translateY(0px);
      filter: brightness(1.1);
    }

    &:checked {
      background: ${containerBackground};
      background-clip: content-box;
      border-color: transparent;
    }
  
    &::before {
      content: '';
      border-width: ${switchBorderWidth};
      border-style: solid;
      border-color: ${switchBorderColor};
      background-color: ${theme.colors.background};
      background-clip: ${switchBackgroundClip};
      border-radius: ${theme.radii['full']};
      transform: translateX(-${containerHalfWidth}) translateX(${containerHalfHeight});
      transition: all 90ms ease-in-out;
      box-sizing: ${switchBoxSizing};
      width: ${switchSize};
      height: ${switchSize};
    }
    
    &:checked::before {
      transform: translateX(${containerHalfWidth}) translateX(-${containerHalfHeight});
      border-color: ${$border ? switchBorderColor : 'transparent'};
    }

    ${
      $border &&
      `
      &::after {
        content: "";
        display: block;
        position: absolute;
        background-color: ${switchBorderColor};
        width: ${valueForTokens(['1.5px', '1.5px', '2px'])};
        border-radius: 2px;
        height: ${valueForTokens(['9px', '10px', '16px'])};
        left: 50%;
        top: 50%;
        transform: translateX(-${containerHalfWidth}) translateX(${containerHalfHeight}) translate(-50%, -50%);
        transition: all 90ms ease-in-out;
        z-index: 1;
      }

      &:checked::after {
        transform: translateX(${containerHalfWidth}) translateX(-${containerHalfHeight}) translate(-50%, -50%);
      }
    `
    }
    
  `
}

const stylesForCheckbox = (
  theme: DefaultTheme,
  { $background, $size, $color, $border }: InputProps,
): string => {
  const valueForTokens = valueForSizeAndTokens($size)

  const checkboxSize = valueForTokens([
    theme.space['7'],
    theme.space['8'],
    theme.space['12'],
  ])

  const checkboxBorderColor = $border
    ? theme.colors.borderSecondary
    : 'transparent'

  const checkboxMarkSize = valueForTokens([
    theme.space['3.5'],
    theme.space['4'],
    theme.space['6'],
  ])

  return `
  width: ${checkboxSize};
  height: ${checkboxSize};
  border-width: 1px;
  border-color: ${checkboxBorderColor};
  border-radius: ${theme.space['2']};
  background-color: ${theme.colors[$background]};
  background-clip: content-box;


  &:hover {
    transform: translateY(-1px);
    filter: contrast(0.7);
  }
  
  &:active {
    transform: translateY(0px);
    filter: contrast(1);
  }
  
  &::before {
    content: '';
    background-color: ${theme.colors[$color]};
    mask-image: ${`url('data:image/svg+xml; utf8, <svg width="${checkboxMarkSize}" height="${checkboxMarkSize}" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M2 12.625L10.125 20.125L22 3.875" stroke="currentColor" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" /></svg>')`};
    width: ${checkboxMarkSize};
    height: ${checkboxMarkSize};
    transform: scale(0);
    transition: all 90ms ease-in-out;
  }
  
  &:checked::before {
    transform: scale(1);
  }
`
}

const Input = styled.input<InputProps>`
  font: inherit;
  display: grid;
  position: relative;
  place-content: center;
  transition: transform 150ms ease-in-out, filter 150ms ease-in-out;

  ${({ theme }) => `
    cursor: pointer;
    margin: ${theme.space['1']} 0;
  `}

  ${({ theme, ...props }) => {
    if (props.$variant === 'switch') return stylesForSwitch(theme, props)
    return stylesForCheckbox(theme, props)
  }}
`

type Props = Omit<FieldBaseProps, 'inline'> & {
  /** Label content */
  label: React.ReactNode
  /** The name attribute of input element. */
  name?: NativeInputProps['name']
  /** The value attribute of input element. */
  value?: NativeInputProps['value']
  /** The checked attribute of input element */
  checked?: NativeInputProps['checked']
  /** The id attribute of input element. */
  id?: NativeInputProps['id']
  /** The disabled attribute of input element */
  disabled?: boolean
  /** The handler for change events. */
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  /** The tabindex attribute for input element. */
  tabIndex?: NativeInputProps['tabIndex']
  /** The handler for focus events. */
  onFocus?: NativeInputProps['onFocus']
  /** The handler for blur events. */
  onBlur?: NativeInputProps['onBlur']
  /** The ui styling of component. */
  variant?: 'regular' | 'switch'
  /** Set the highlight color. */
  color?: Colors
  /** Use gradient color for background color of switch variant. */
  gradient?: boolean
  /** Set the background color for regular variant. */
  background?: 'white' | 'grey'
  /** The size of the checkbox. */
  size?: 'small' | 'medium' | 'large'
  /** Adds a border to regular variant or uses alternative styling for switch variant. */
  border?: boolean
}

export const Checkbox = React.forwardRef(
  (
    {
      description,
      disabled,
      error,
      hideLabel,
      id,
      label,
      labelSecondary,
      name,
      required,
      tabIndex,
      value,
      checked,
      width,
      onBlur,
      onChange,
      onFocus,
      variant = 'regular',
      color = 'blue',
      gradient = false,
      background = 'grey',
      size = 'small',
      border = false,
      ...props
    }: Props,
    ref: React.Ref<HTMLInputElement>,
  ) => {
    const defaultRef = React.useRef<HTMLInputElement>(null)
    const inputRef = (ref as React.RefObject<HTMLInputElement>) || defaultRef

    return (
      <Field
        description={description}
        error={error}
        hideLabel={hideLabel}
        id={id}
        inline
        label={label}
        labelSecondary={labelSecondary}
        required={required}
        width={width}
      >
        <Input
          aria-invalid={error ? true : undefined}
          data-testid="checkbox"
          ref={inputRef}
          type="checkbox"
          {...{
            $background: background,
            $color: color,
            $gradient: gradient,
            $border: border,
            $variant: variant,
            $size: size,
            disabled,
            name,
            tabIndex,
            value,
            onBlur,
            onChange,
            onFocus,
            checked,
            ...props,
          }}
        />
      </Field>
    )
  },
)

Checkbox.displayName = 'Checkbox'
