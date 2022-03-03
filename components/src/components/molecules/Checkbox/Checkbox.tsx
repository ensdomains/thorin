import * as React from 'react'
import styled from 'styled-components'

import { tokens } from '@/src/tokens'
import { Field } from '../..'
import { FieldBaseProps } from '../../atoms/Field'
import { vars } from '@/src'

type NativeInputProps = React.AllHTMLAttributes<HTMLInputElement>

interface InputProps {
  size: any
  variant: 'regular' | 'switch'
  color: 'grey' | 'white'
}

const Input = styled.input<InputProps>`
  cursor: pointer;
  margin: ${tokens.space['1']} 0;

  ${(p) => {
    switch (p.variant) {
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
            background-color: ${tokens.colors[p.theme.mode].accent};
            mask-image: ${`url('data:image/svg+xml; utf8, <svg width="${vars.space['4']}" height="${vars.space['4']}" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M2 12.625L10.125 20.125L22 3.875" stroke="currentColor" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" /></svg>')`};
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
          background-color: ${tokens.colors[p.theme.mode].accent};
          filter: grayscale(1) brightness(1.5);
          
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

  ${(p) => {
    switch (p.color) {
      case 'grey':
        return `
          background-color: ${tokens.radii.full};
        `
      case 'white':
        return `
          background-color: white;
        `
      default:
        return ``
    }
  }}

  ${(p) => {
    if (p.variant === 'switch' && p.size) {
      switch (p.size) {
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

type Props = Exclude<FieldBaseProps, 'inline'> & {
  label: NativeInputProps['label']
  name?: NativeInputProps['name']
  value?: NativeInputProps['value']
  checked?: NativeInputProps['checked']
  id?: NativeInputProps['id']
  disabled?: boolean
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  tabIndex?: NativeInputProps['tabIndex']
  onFocus?: NativeInputProps['onFocus']
  onBlur?: NativeInputProps['onBlur']
  variant?: 'regular' | 'switch'
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
            color,
            variant,
            size,
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

/*



 */

Checkbox.displayName = 'Checkbox'
