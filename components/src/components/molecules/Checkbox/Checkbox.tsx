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
  /** Label content */
  label: React.ReactNode
  /** The name attribute of input element. */
  name?: NativeInputProps['name']
  /** The value attribute of input element. */
  value?: string | number
  /** The initial value of the input element */
  defaultValue?: string | number
  /** The checked attribute of input element */
  checked?: NativeInputProps['checked']
  /** The initial value for checked of input element */
  defaultChecked?: NativeInputProps['defaultChecked']
  /** The id attribute of input element. */
  id?: NativeInputProps['id']
  /** The disabled attribute of input element */
  disabled?: NativeInputProps['disabled']
  /** The handler for change events. */
  onChange?: NativeInputProps['onChange']
  /** The tabindex attribute for input element. */
  tabIndex?: NativeInputProps['tabIndex']
  /** The handler for focus events. */
  onFocus?: NativeInputProps['onFocus']
  /** The handler for blur events. */
  onBlur?: NativeInputProps['onBlur']
  /** Set the background color for regular variant. */
  background?: 'white' | 'grey'
  /** Set the input to readonly mode */
  readOnly?: NativeInputProps['readOnly']
} & Omit<FieldBaseProps, 'labelRight'> &
  Omit<
    NativeInputProps,
    | 'size'
    | 'color'
    | 'type'
    | 'children'
    | 'value'
    | 'defaultValue'
    | 'type'
    | 'aria-invalid'
  > &
  WithColorStyle
interface InputProps {
  $colorStyle: Props['colorStyle']
}

const Input = styled.input<InputProps>(
  ({ theme, $colorStyle = 'accentPrimary' }) => css`
    font: inherit;
    display: grid;
    position: relative;
    place-content: center;
    transition: transform 150ms ease-in-out, filter 150ms ease-in-out;
    cursor: pointer;

    width: ${theme.space['5']};
    height: ${theme.space['5']};
    border-radius: ${theme.radii.small};
    background-color: ${theme.colors.border};

    &:checked {
      background: ${getColorStyle($colorStyle, 'background')};
    }

    &::before {
      content: '';
      background: ${theme.colors.border};
      mask-image: ${`url('data:image/svg+xml; utf8, <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M2 12.625L10.125 20.125L22 3.875" stroke="currentColor" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" /></svg>')`};
      mask-repeat: no-repeat;
      width: ${theme.space['3']};
      height: ${theme.space['3']};
      transition: all 90ms ease-in-out;
    }

    &:hover {
      transform: translateY(-1px);
    }

    &:hover::before,
    &:checked::before {
      background: ${getColorStyle($colorStyle, 'text')};
    }

    &:disabled {
      cursor: not-allowed;
    }

    &:disabled::before,
    &:disabled:hover::before {
      background: ${theme.colors.border};
    }

    &:disabled:checked,
    &:disabled:checked:hover {
      background: ${theme.colors.border};
    }

    &:disabled:checked::before,
    &:disabled:checked:hover::before {
      background: ${theme.colors.greyPrimary};
    }
  `,
)

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
      inline = true,
      name,
      required,
      tabIndex,
      value,
      checked,
      width,
      onBlur,
      onChange,
      onFocus,
      colorStyle = 'accentPrimary',
      ...props
    }: Props,
    ref: React.Ref<HTMLInputElement>,
  ) => {
    const defaultRef = React.useRef<HTMLInputElement>(null)
    const inputRef = (ref as React.RefObject<HTMLInputElement>) || defaultRef

    return (
      <Field
        description={description}
        disabled={disabled}
        error={error}
        hideLabel={hideLabel}
        id={id}
        inline={inline}
        label={label}
        labelSecondary={labelSecondary}
        required={required}
        width={width}
      >
        <Input
          {...{
            ...props,
            'data-testid': getTestId(props, 'checkbox'),
            'aria-invalid': error ? true : undefined,
            type: 'checkbox',
          }}
          $colorStyle={colorStyle}
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

Checkbox.displayName = 'Checkbox'
