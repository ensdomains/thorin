import * as React from 'react'

import { translateY } from '@/src/css/utils/common'

import {
  WithColorStyle,
  getValueForColorStyle,
} from './utils/getValueForColorStyle'

import * as styles from './styles.css'

import { Field } from '../..'
import { FieldBaseProps } from '../../atoms/Field'
import { getTestId } from '../../../utils/utils'
import { Box, BoxProps } from '../../atoms/Box/Box'

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

const InputBox = React.forwardRef<HTMLElement, BoxProps & { $colorStyle: any }>(
  ({ $colorStyle, disabled, checked, ...props }, ref) => (
    <Box
      position="relative"
      transform={{ base: translateY(0), hover: translateY(-1) }}
      transition="transform 150ms ease-in-out"
      wh="$5"
    >
      <Box
        as="input"
        backgroundColor={{
          base: '$border',
          disabled: '$border',
          checked: getValueForColorStyle($colorStyle, 'background'),
        }}
        borderRadius="$small"
        checked={checked}
        className={styles.checkbox}
        cursor={{ base: 'pointer', disabled: 'not-allowed' }}
        disabled={disabled}
        display="grid"
        fontFamily="inherit"
        placeContent="center"
        position="relative"
        ref={ref}
        transition="background-color 150ms ease-in-out"
        type="checkbox"
        wh="$full"
        {...props}
      />
      <Box
        backgroundColor={getValueForColorStyle($colorStyle, 'content')}
        className={styles.icon}
        left="$0"
        maskImage={`url('data:image/svg+xml; utf8, <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M2 12.625L10.125 20.125L22 3.875" stroke="currentColor" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" /></svg>')`}
        maskPosition="center"
        maskRepeat="no-repeat"
        pointerEvents="none"
        position="absolute"
        top="$0"
        transition="background-color 150ms ease-in-out"
        wh="$full"
      />
    </Box>
  ),
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
        <InputBox
          $colorStyle={colorStyle}
          aria-invalid={error ? true : undefined}
          checked={checked}
          data-testid={getTestId(props, 'checkbox')}
          disabled={disabled}
          id={id}
          name={name}
          ref={inputRef}
          tabIndex={tabIndex}
          value={value}
          onBlur={onBlur}
          onChange={onChange}
          onFocus={onFocus}
          {...props}
        />
      </Field>
    )
  },
)

Checkbox.displayName = 'Checkbox'
