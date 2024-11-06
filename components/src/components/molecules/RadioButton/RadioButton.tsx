import * as React from 'react'

import * as styles from './styles.css'

import type { FieldBaseProps } from '../../atoms/Field/Field'
import { Field } from '../../atoms/Field/Field'
import { getTestId } from '../../../utils/utils'
import type { BoxProps } from '../../atoms/Box/Box'
import { Box } from '../../atoms/Box/Box'
import type { Color } from '@/src/tokens/color'
import clsx from 'clsx'
type NativeInputProps = React.InputHTMLAttributes<HTMLInputElement>

export type RadioButtonProps = {
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
  | 'children'
  | 'value'
  | 'defaultValue'
  | 'aria-invalid'
  | 'type'
  | 'role'
  | 'color'
  | 'height'
  | 'width'
> & { color?: Color }

const Mark = ({ $color, disabled, className, ...props }: BoxProps & { $color: Color }) => (
  <Box
    {...props}
    backgroundColor={disabled ? 'greyPrimary' : $color}
    borderRadius="full"
    left="1/2"
    pointerEvents="none"
    position="absolute"
    top="1/2"
    transitionProperty="all"
    transitionDuration={150}
    transitionTimingFunction="ease-in-out"
    wh="3"
    className={clsx(styles.mark, className)}
  />
)

const Input = React.forwardRef<HTMLElement, BoxProps & { $color: Color }>(
  ({ $color, className, ...props }, ref) => (
    <Box position="relative" wh="5">
      <Box
        {...props}
        as="input"
        backgroundColor="border"
        borderRadius="full"
        cursor={{ base: 'pointer', disabled: 'not-allowed' }}
        display="grid"
        flexBasis="5"
        flexGrow={0}
        flexShrink={0}
        placeContent="center"
        ref={ref}
        role="radio"
        className={clsx(styles.input, className)}
        transitionProperty="all"
        transitionDuration={150}
        transitionTimingFunction="ease-in-out"
        type="radio"
        wh="5"
      />
      <Mark $color={$color} />
    </Box>
  ),
)

export const RadioButton = React.forwardRef<HTMLInputElement, RadioButtonProps>(
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
      color = 'accent',
      onBlur,
      onChange,
      onFocus,
      ...props
    },
    ref,
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
          {...props}
          $color={color}
          aria-invalid={error ? true : undefined}
          aria-selected={checked ? true : undefined}
          checked={checked}
          className={styles.radio}
          data-testid={getTestId(props, 'radio')}
          disabled={disabled}
          id={id}
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
