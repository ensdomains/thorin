import * as React from 'react'
import styled from 'styled-components'

import { Field } from '../..'
import { FieldBaseProps } from '../../atoms/Field'
import { tokens } from '@/src/tokens'

const Input = styled.input`
  width: ${tokens.space['6']};
  height: ${tokens.space['6']};
  margin: ${tokens.space['2']} 0;
  cursor: pointer;
  font: inherit;
  border-radius: 50%;
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
  }

  &:checked::before {
    transform: scale(1);
  }

  ${({ theme }) => `
    background-color: ${tokens.colors[theme.mode].foregroundSecondary};
    width: ${tokens.space['4.5']};
    height: ${tokens.space['4.5']};
    border-radius: 50%;
    transform: scale(0);
    transition: transform 90ms ease-in-out;
    background-image: ${tokens.colors[theme.mode].gradients.blue};
    background-size: 100% 100%;
    background-position: center;
  `}
`

type NativeInputProps = React.AllHTMLAttributes<HTMLInputElement>

type Props = Exclude<FieldBaseProps, 'inline'> & {
  label: NativeInputProps['label']
  name: NativeInputProps['name']
  value: NativeInputProps['value']
  checked?: NativeInputProps['checked']
  id?: NativeInputProps['id']
  disabled?: boolean
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  tabIndex?: NativeInputProps['tabIndex']
  onFocus?: NativeInputProps['onFocus']
  onBlur?: NativeInputProps['onBlur']
}

export const RadioButton = React.forwardRef(
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
          data-testid="radio"
          ref={inputRef}
          type="radio"
          {...{
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

RadioButton.displayName = 'RadioButton'
