import * as React from 'react'
import styled, { css } from 'styled-components'

import {
  WithColorStyle,
  getColorStyle,
} from '@/src/types/withColorOrColorStyle'

import { Field } from '../..'
import { FieldBaseProps } from '../../atoms/Field'
import { getTestId } from '../../../utils/utils'

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
  > &
  WithColorStyle

const Input = styled.input<{
  $colorStyle: NonNullable<Props['colorStyle']>
}>(
  ({ theme, $colorStyle }) => css`
    cursor: pointer;
    font: inherit;
    border-radius: 50%;
    display: grid;
    place-content: center;
    transition: transform 150ms ease-in-out;
    width: ${theme.space['5']};
    flex: 0 0 ${theme.space['5']};
    height: ${theme.space['5']};
    background-color: ${theme.colors.border};

    &::before {
      content: '';
      width: ${theme.space['3']};
      height: ${theme.space['3']};
      border-radius: 50%;
      transition: all 150ms ease-in-out;
      background: ${theme.colors.border};
      background-size: 100% 100%;
      background-position: center;
    }

    &:checked::before {
      background: ${getColorStyle($colorStyle, 'background')};
    }

    &:disabled {
      cursor: not-allowed;
    }

    &:hover::before {
      background: ${theme.colors.greyBright};
    }

    &:disabled::before {
      background: ${theme.colors.border};
    }

    &:checked:hover::before {
      background: ${getColorStyle($colorStyle, 'hover')};
    }

    &:disabled:checked::before,
    &:disabled:checked:hover::before {
      background: ${theme.colors.greyPrimary};
    }

    &:hover {
      transform: translateY(-1px);
    }

    &:disabled:hover {
      transform: initial;
    }
  `,
)

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
      colorStyle = 'accentPrimary',
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
          disabled,
        }}
      >
        <Input
          $colorStyle={colorStyle}
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
