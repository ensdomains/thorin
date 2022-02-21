import * as React from 'react'

import { Box, Field } from '../..'
import { FieldBaseProps } from '../../atoms/Field'
import * as styles from './styles.css'

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
        <Box
          aria-invalid={error ? true : undefined}
          as="input"
          className={[
            styles.input({
              disabled,
            }),
          ]}
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
