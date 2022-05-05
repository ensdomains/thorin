import * as React from 'react'
import styled from 'styled-components'

import { tokens } from '@/src/tokens'
import { Field } from '../..'
import { FieldBaseProps } from '../../atoms/Field'

type NativeInputProps = React.AllHTMLAttributes<HTMLInputElement>

interface InputProps {
  $size: any
  $variant: 'regular' | 'switch'
  $color: 'grey' | 'white'
}

const Input = styled.input<InputProps>`
  cursor: pointer;
  margin: ${tokens.space['1']} 0;

  ${({ theme, $variant, $size }) => {
    switch ($variant) {
      case 'regular':
        return `
          width: ${tokens.space['7']};
          height: ${tokens.space['7']};
          font: inherit;
          border-radius: ${tokens.space['2']};
          display: grid;
          place-content: center;
          transition: transform 150ms ease-in-out, filter 150ms ease-in-out;
          
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
            background-color: ${tokens.colors[theme.mode].accent};
            mask-image: ${`url('data:image/svg+xml; utf8, <svg width="${tokens.space['4']}" height="${tokens.space['4']}" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M2 12.625L10.125 20.125L22 3.875" stroke="currentColor" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" /></svg>')`};
            width: ${tokens.space['4']};
            height: ${tokens.space['4']};
            transform: scale(0);
            transition: transform 90ms ease-in-out;
          }
          
          &:checked::before {
            transform: scale(1);
          }
        `
      case 'switch':
        return `
          display: grid;
          place-content: center;
          transition: transform 150ms ease-in-out, filter 150ms ease-in-out;
          background-color: ${tokens.colors[theme.mode].accent};
          filter: grayscale(1) brightness(1.5);
          width: ${
            $size === 'small' ? '' : $size === 'large' ? '5.188rem' : '3rem'
          };
          height: ${
            $size === 'small' ? '' : $size === 'large' ? '2.875rem' : '1.688rem'
          };
          border-radius: ${
            $size === 'small' ? '' : $size === 'large' ? '1.437rem' : '1.344rem'
          };
          
          &:hover {
            transform: translateY(-1px);
            filter: contrast(0.7);
          }
          
          &:active {
            transform: translateY(0px);
            filter: grayscale(1) brightness(1.5);
          }
          
          &:checked:hover {
            filter: grayscale(0) brightness(1.05);
          }
          
          &:checked:active {
            filter: grayscale(0) brightness(1);
          }
          
          &::before {
            content: '';
            background-color: ${tokens.colors.base.white};
            border-radius: ${tokens.radii['full']};
            transform: translateX(-50%);
            transition: transform 90ms ease-in-out;
            width: ${
              $size === 'small'
                ? ''
                : $size === 'large'
                ? '2.313rem'
                : '1.313rem'
            };
            height: ${
              $size === 'small'
                ? ''
                : $size === 'large'
                ? '2.313rem'
                : '1.313rem'
            };

          }
          
          &:checked::before {
            transform: translateX(50%);
          }
          
          &:checked {
            filter: grayscale(0) brightness(1);
          }
        `
      default:
        return ``
    }
  }}

  ${({ theme, $color }) => {
    switch ($color) {
      case 'grey':
        return `
          background-color: ${tokens.colors[theme.mode].grey};
        `
      case 'white':
        return `
          background-color: white;
        `
      default:
        return ``
    }
  }}

  ${({ $variant, $size }) => {
    if ($variant === 'switch' && $size) {
      switch ($size) {
        case 'small':
          return `
            width: ${tokens.space['7']};
        `
        case 'medium':
          return `
        `
        case 'large':
          return `
        `
        default:
          return ``
      }
    }
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
  /** Set the background color of the checkbox */
  color?: 'grey' | 'white'
  size?: 'small' | 'medium' | 'large'
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
      color = 'grey',
      size = 'small',
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
            $color: color,
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
