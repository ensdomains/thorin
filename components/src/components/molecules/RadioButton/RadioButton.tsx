import * as React from 'react'
import styled, { css } from 'styled-components'

import { Field } from '../..'
import { FieldBaseProps } from '../../atoms/Field'
import { getTestId } from '../../../utils/utils'

const Input = styled.input(
  ({ theme }) => css`
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

    width: ${theme.space['6']};
    height: ${theme.space['6']};
    margin: ${theme.space['2']} 0;
    background-color: ${theme.colors.greySurface};

    &::before {
      content: '';
      width: ${theme.space['4.5']};
      height: ${theme.space['4.5']};
      border-radius: 50%;
      transform: scale(0);
      transition: transform 90ms ease-in-out;
      background-image: ${theme.colors.gradients.blue};
      background-size: 100% 100%;
      background-position: center;
    }

    &:checked::before {
      transform: scale(1);
    }
  `,
)

type NativeInputProps = React.InputHTMLAttributes<HTMLInputElement>

type Props = {
  /** A string or component that represents the input item. */
  label: React.ReactNode
  /** The name attribute for input elements. */
  name: NativeInputProps['name']
  /** The value attribute of input elements. */
  value: string
  /** The inital value of input element */
  defaultValue?: string
  /** If true, the radio button is selected. */
  checked?: NativeInputProps['checked']
  /** The id attribute of input element. */
  id?: NativeInputProps['id']
  /** If true, the input is unable to receive user input. */
  disabled?: NativeInputProps['disabled']
  /** The handler for change events. */
  onChange?: NativeInputProps['onChange']
  /** The tabindex attribute for input elements. */
  tabIndex?: NativeInputProps['tabIndex']
  /** The handler for focus events. */
  onFocus?: NativeInputProps['onFocus']
  /** The handler for blur events. */
  onBlur?: NativeInputProps['onBlur']
} & Omit<FieldBaseProps, 'labelRight'> &
  Omit<
    NativeInputProps,
    'children' | 'value' | 'defaultValue' | 'aria-invalid' | 'type' | 'role'
  >

export const RadioButton = React.forwardRef(
  (
    {
      description,
      disabled,
      error,
      inline = true,
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
        {...{
          description,
          error,
          hideLabel,
          id,
          inline,
          label,
          labelSecondary,
          required,
          width,
          labelRight: true,
        }}
      >
        <Input
          {...{
            ...props,
            'aria-invalid': error ? true : undefined,
            'aria-selected': checked ? true : undefined,
            'data-testid': getTestId(props, 'radio'),
            type: 'radio',
            role: 'radio',
          }}
          checked={checked}
          disabled={disabled}
          name={name}
          ref={inputRef}
          tabIndex={tabIndex}
          value={value}
          onBlur={onBlur}
          onChange={onChange}
          onFocus={onFocus}
        />
      </Field>
    )
  },
)

RadioButton.displayName = 'RadioButton'
