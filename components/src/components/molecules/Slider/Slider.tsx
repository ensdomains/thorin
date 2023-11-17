import * as React from 'react'

import * as styles from './styles.css'
import { Field, FieldBaseProps } from '../../atoms/Field'
import { Box, BoxProps } from '../../atoms/Box/Box'

type NativeInputProps = React.InputHTMLAttributes<HTMLInputElement>

export type Props = FieldBaseProps & {
  /** The initial value. Useful for detecting changes in value. */
  defaultValue?: string | number
  /** If true, prevents user interaction. */
  disabled?: NativeInputProps['disabled']
  /** The id attribute of input. */
  id?: NativeInputProps['id']
  /** The name attribute of input. */
  name?: NativeInputProps['name']
  /** The readOnly attribute of input.  */
  readOnly?: NativeInputProps['readOnly']
  /** The tabindex attribute of input. */
  tabIndex?: NativeInputProps['tabIndex']
  /** The value attribute of slider. */
  value?: number
  /** The min value of slider. */
  min?: number
  /** The max value of slider. */
  max?: number
  /** The handler for change events. */
  onChange?: NativeInputProps['onChange']
  /** The handler for blur events. */
  onBlur?: NativeInputProps['onBlur']
  /** The handler for focus events. */
  onFocus?: NativeInputProps['onFocus']
} & Omit<
    NativeInputProps,
    'children' | 'value' | 'defaultValue' | 'aria-invalid' | 'type'
  >

const SliderComponent = React.forwardRef<HTMLElement, BoxProps>(
  (props, ref) => (
    <Box
      {...props}
      appearance="none"
      as="input"
      backgroundColor={{ base: '$blueSurface', hover: '$blueLight' }}
      borderRadius="$full"
      className={styles.slider}
      cursor={{ base: 'pointer', disabled: 'not-allowed' }}
      filter={{ base: 'grayscale(0)', disabled: 'grayscale(100%)' }}
      height="$1.5"
      opacity={{ base: '1', disabled: '1.0' }}
      ref={ref}
      type="range"
      width="$full"
    />
  ),
)

export const Slider = React.forwardRef(
  (
    {
      label,
      description,
      error,
      hideLabel,
      inline,
      labelSecondary,
      required,
      width,
      defaultValue,
      disabled,
      id,
      name,
      readOnly,
      tabIndex,
      value,
      min = 1,
      max = 100,
      onChange,
      onBlur,
      onFocus,
      step = 'any',
      ...nativeProps
    }: Props,
    ref: React.Ref<HTMLInputElement>,
  ) => {
    const defaultRef = React.useRef<HTMLInputElement>(null)
    const inputRef = (ref as React.RefObject<HTMLInputElement>) || defaultRef

    return (
      <Field
        {...{
          label,
          description,
          error,
          hideLabel,
          inline,
          labelSecondary,
          required,
          width,
          id,
        }}
      >
        {(ids) => (
          <SliderComponent
            ref={inputRef}
            type="range"
            {...{
              ...nativeProps,
              ...ids?.content,
              defaultValue,
              disabled,
              name,
              readOnly,
              tabIndex,
              value,
              min,
              max,
              onChange,
              onBlur,
              onFocus,
              step,
            }}
          />
        )}
      </Field>
    )
  },
)

Slider.displayName = 'Slider'
