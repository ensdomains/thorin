import * as React from 'react'

import * as styles from './styles.css'

import { Field } from '../../atoms/Field/Field'
import type { FieldBaseProps } from '../../atoms/Field/Field'
import { getTestId } from '../../../utils/utils'
import type { BoxProps } from '../../atoms/Box/Box'
import { Box } from '../../atoms/Box/Box'
import { getColorStyleParts } from '@/src/utils/getColorStyleParts'
import type { Colors, ColorStyles, Hue } from '@/src/tokens'
import { match } from 'ts-pattern'

type NativeInputProps = React.InputHTMLAttributes<HTMLInputElement>

export type CheckboxProps = {
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
  colorStyle?: ColorStyles
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
  | 'height'
  | 'width'
>

const SVG = (props: React.SVGProps<SVGSVGElement>) => <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}><path d="M2 12.625L10.125 20.125L22 3.875" fill="none" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" /></svg>

const InputBox = React.forwardRef<HTMLElement, BoxProps & { baseColor: Hue, baseTheme: 'Primary' | 'Secondary' }>(
  ({ baseColor, baseTheme, disabled, checked, ...props }, ref) => (
    <Box
      className={styles.inputBox}
      position="relative"
      wh="5"
    >
      <Box
        as="input"
        backgroundColor={{
          base: 'border',
          disabled: 'border',
          checked: match(baseTheme)
            .with('Secondary', () => `${baseColor}Surface` as Colors)
            .otherwise(() => `${baseColor}Primary` as Colors),
        }}
        borderRadius="small"
        checked={checked}
        className={styles.checkbox}
        cursor={{ base: 'pointer', disabled: 'not-allowed' }}
        disabled={disabled}
        display="grid"
        fontFamily="inherit"
        placeContent="center"
        position="relative"
        ref={ref}
        transitionProperty="background-color"
        transitionDuration={150}
        transitionTimingFunction="ease-in-out"
        type="checkbox"
        wh="full"
        {...props}
      />
      <Box
        as={SVG}
        stroke={match(baseTheme)
          .with('Secondary', () => `${baseColor}Primary` as Colors)
          .otherwise(() => `textAccent` as Colors)}
        className={styles.icon}
        left="1"
        width="3"
        height="3"
        pointerEvents="none"
        position="absolute"
        top="1"
        transitionProperty="stroke"
        transitionDuration={150}
        transitionTimingFunction="ease-in-out"
        wh="full"
      />
    </Box>
  ),
)

export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
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
    },
    ref,
  ) => {
    const defaultRef = React.useRef<HTMLInputElement>(null)
    const inputRef = (ref as React.RefObject<HTMLInputElement>) || defaultRef
    const [baseColor, baseTheme] = getColorStyleParts(colorStyle)

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
          baseColor={baseColor}
          baseTheme={baseTheme}
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
